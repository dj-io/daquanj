'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { captureEvent } from '@/lib/posthog'

type ContactDialogProps = {
	children: React.ReactElement<{
		onClick?: React.MouseEventHandler
	}>
}

export function ContactDialog({ children }: ContactDialogProps) {
	const initialForm = { name: '', email: '', message: '' }
	const [open, setOpen] = useState(false)
	const [form, setForm] = useState(initialForm)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const handleOpen = () => {
		setOpen(true)
		captureEvent('contact_dialog_opened')
	}

	const handleClose = () => {
		setOpen(false)
		setError(null)
		setSuccess(null)
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		captureEvent('contact_form_submitted', {
			form: form
		})
		setSubmitting(true)
		setError(null)
		setSuccess(null)

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			})

			const data = await res.json().catch(() => ({}))

			if (!res.ok) {
				setError(data?.error || 'Something went wrong sending your message.')
				captureEvent('contact_form_error', { status: res.status })
				return
			}

			setSuccess('Message sent – I’ll get back to you soon.')
			captureEvent('contact_form_success', {
				form: form
			})
			setForm(initialForm)
		} catch (err) {
			console.error(err)
			setError('Network error – please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	const trigger = React.cloneElement(children, {
		onClick: (event: React.MouseEvent) => {
			if (children.props.onClick) {
				children.props.onClick(event)
			}
			if (!event.defaultPrevented) {
				handleOpen()
			}
		},
	})

	return (
		<>
			{trigger}

			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
					<div className="w-full max-w-md rounded-lg border border-border bg-background px-6 py-5 shadow-xl">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-sm font-semibold tracking-tight">Contact</h2>
							<button
								type="button"
								className="text-xs text-muted-foreground hover:text-foreground"
								onClick={handleClose}
							>
								Close
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-3">
							<div>
								<label className="block text-xs font-medium mb-1">Name</label>
								<input
									name="name"
									type="text"
									value={form.name}
									onChange={handleChange}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-apollo"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium mb-1">Email</label>
								<input
									name="email"
									type="email"
									required
									value={form.email}
									onChange={handleChange}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-apollo"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="block text-xs font-medium mb-1">Message</label>
								<textarea
									name="message"
									required
									value={form.message}
									onChange={handleChange}
									className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-apollo min-h-[80px]"
									placeholder="How can we work together?"
								/>
							</div>

							{error && (
								<p className="text-xs text-red-500">{error}</p>
							)}
							{success && (
								<p className="text-xs text-emerald-500">{success}</p>
							)}

							<div className="flex justify-end gap-2 pt-1">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									size="sm"
									disabled={submitting}
								>
									{submitting ? 'Sending…' : 'Send'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}


