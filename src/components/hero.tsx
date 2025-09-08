'use client'

import { useEffect, useRef, useState } from 'react'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { captureEvent } from '@/lib/posthog'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
	AtSign,
	ChevronUp,
} from 'lucide-react'
import { TextStream } from './ui/text-stream'
import { ChatMode, ModelItem } from '@/lib/types'
// import { detectOS } from '@/lib/utils'
import { CHAT_MODES, MODEL_GROUPS, COPY, COPY_STORAGE_KEY, COPY_TTL_MS } from '@/lib/constants'
import { SocialLinks } from './social-links'

export function HeroSection () {
	// const [os, setOS] = useState('macOS')
	const [selectedMode, setSelectedMode] = useState<ChatMode>(CHAT_MODES[0])
	const [selectedModel, setSelectedModel] = useState<ModelItem>(MODEL_GROUPS[0].submenu[2])
	const [open, setOpen] = useState(false)
	const [copyIndex, setCopyIndex] = useState<number | null>(null)

	const router = useRouter()
	const inputRef = useRef<HTMLInputElement | null>(null)

	// useEffect(() => {
	// 	setOS(detectOS())
	// }, [])

	// Copy selection logic - persist choice for 24h
	useEffect(() => {
		// Check for existing choice
		const stored = localStorage.getItem(COPY_STORAGE_KEY)
		if (stored) {
			try {
				const { index, ts } = JSON.parse(stored)
				const isValid = COPY[index] && Date.now() - ts < COPY_TTL_MS
				if (isValid) {
					setCopyIndex(index)
					// Track existing variant view
					captureEvent('copy_variant_viewed', {
						variant: index === 0 ? 'A' : 'B',
						copy_heading: COPY[index].heading,
						is_returning_user: true
					})
					return
				}
			} catch {}
		}

		// Pick new random choice
		const idx = Math.floor(Math.random() * COPY.length)
		setCopyIndex(idx)
		localStorage.setItem(COPY_STORAGE_KEY, JSON.stringify({ index: idx, ts: Date.now() }))

		// Track new variant assignment
		captureEvent('copy_variant_assigned', {
			variant: idx === 0 ? 'A' : 'B',
			copy_heading: COPY[idx].heading,
			is_new_user: true
		})
	}, [])

	const selectedCopy = COPY[copyIndex ?? 0]

	// const version = 'v0.1.9'
	// const installInfo = os === 'macOS'
	// 	? 'macOS 11+'
	// 	: os === 'Windows'
	// 		? 'Windows 10+'
	// 		: os === 'Linux'
	// 			? 'Linux'
	// 			: ''

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validateOnMount: false,
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Invalid email address')
				.required('Please fill out this field'),
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				const fetchResponse = await fetch('/api/waitlist', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				})

				if (!fetchResponse.ok) {
					const errorData = await fetchResponse.json().catch(() => ({}))
					throw new Error(errorData.message || `API request failed with status ${fetchResponse.status}`)
				}

				const submittedEmail = values.email
				resetForm()
				const timeElapsed = Date.now() - performance.timeOrigin
				captureEvent('waitlist_form_submitted', {
					form_completion_time: timeElapsed,
					copy_variant: copyIndex === 0 ? 'A' : 'B',
					copy_heading: selectedCopy.heading,
					conversion_funnel: 'hero_copy_to_signup'
				})
				router.push(`/confirm?action=waitlist_joined&email=${encodeURIComponent(submittedEmail)}`)
			} catch (error) {
				console.error('Error submitting form:', error)
				captureEvent('waitlist_form_submission_error', {
					error_message: error instanceof Error ? error.message : 'Unknown error'
				})
			} finally {
				setSubmitting(false)
			}
		},
		validateOnBlur: true,
		validateOnChange: false,
	})

	const handleSend = async () => {
		await formik.validateForm()
		formik.setTouched({ email: true })
		if (!formik.errors.email) {
			// Enhanced tracking with copy variant
			captureEvent('join_waitlist_clicked', {
				mode: selectedMode.title,
				copy_variant: copyIndex === 0 ? 'A' : 'B',
				copy_heading: selectedCopy.heading,
				copy_body_preview: selectedCopy.body.slice(0, 50) + '...'
			})
			await formik.submitForm()
		}
	}

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			await handleSend()
		}
	}

	const handleModeClick = () => {
		const currentIndex = CHAT_MODES.findIndex(mode => mode.title === selectedMode.title)
		const nextIndex = (currentIndex + 1) % CHAT_MODES.length
		setSelectedMode(CHAT_MODES[nextIndex])
		captureEvent('chat_mode_cycled', { from: selectedMode.title, to: CHAT_MODES[nextIndex].title })
	}

	// Show error if submitted or touched with value and has an error
	const showError = (formik.submitCount > 0 && formik.errors.email) ||
		(formik.touched.email && formik.values.email.length > 0 && formik.errors.email)

	const placeholder = `Enter your email to ${selectedMode.placeholder} ${selectedModel.title}...`

	return (
		<section className='relative flex flex-col items-center justify-center w-full min-h-0 pb-[env(safe-area-inset-bottom)]'>
			<div className='relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				{/* Chat conversation */}
				<div className="w-full max-w-4xl">
					{/* User message bubble */}
					<div className="flex justify-end mr-4">
						<BlurFade delay={0.1} blur="6px" duration={0.6}>
						<div>
							<div className="bg-chat text-white px-4 py-2.5 rounded-2xl border border-border rounded-br-md max-w-xs">
								<p className="text-sm font-medium">what is grit?</p>
							</div>
						</div>
						</BlurFade>
					</div>

					{/* AI response container */}
					<div className="py-6 text-left pl-6">
						<div className="max-w-[95%]">
							<h1 className={cn(
								'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight',
								'[&>span]:text-foreground'
							)}>
								{copyIndex !== null ? (
									<TextStream text={selectedCopy.heading} delay={500} speed={90} />
								) : (
									<span className="opacity-0">Your Knowledge + AI</span>
								)}
							</h1>
							<p className="text-sm sm:text-base lg:text-lg text-foreground/90 leading-relaxed mb-8">
								{copyIndex !== null ? (
									<TextStream text={selectedCopy.body} delay={1250} speed={30} />
								) : (
									<span className="opacity-0">Grit is an AI Note Editor that integrates the latest frontier models so you can write, edit and explore ideas with AI all in one place. A simple, yet powerful tool built to help you work faster.</span>
								)}
							</p>
						</div>
					</div>
				</div>

				{/* Chat-style input */}
				{/* <BlurFade delay={0.25}> */}
				<div>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSend()
						}}
						className='w-[90vw] max-w-2xl mt-2'
					>
						<div
							className={cn(
								'flex flex-col items-start bg-chat border border-border rounded-lg shadow-xs w-full'
							)}
						>
							{/* Textarea with @ button inline */}
							<div className='w-full px-3 py-3 flex items-start gap-2'>
								<Button
									type='button'
									variant='outline'
									size='sm'
									className='rounded-full px-2.5 h-8 mt-1 shrink-0'
									onClick={() => captureEvent('chat_at_clicked')}
								>
									<AtSign className='h-4 w-4 text-muted-foreground' />
								</Button>

								<input
									ref={inputRef}
									id='email'
									name='email'
									type='email'
									spellCheck={false}
									placeholder={placeholder}
									value={formik.values.email}
									onChange={(e) => {
										formik.setFieldValue('email', e.target.value)
									}}
									onBlur={formik.handleBlur}
									onFocus={() => {
										captureEvent('join_waitlist_focused', { mode: selectedMode.title })
									}}
									onKeyDown={handleKeyDown}
									className={cn(
										'block w-full bg-transparent text-foreground placeholder:text-muted-foreground/70',
										'px-0 py-2 text-sm leading-6 focus:outline-none',
										'flex-1'
									)}
								/>
							</div>

							{/* Controls row - Selector + Request Access button */}
							<div className="flex items-center w-full gap-3 justify-between px-3 pb-3">
								{/* Left side - mode/model selector */}
								<div className='flex items-center bg-chat-foreground rounded-md h-8 pl-0.5 pr-0.5'>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='h-7 w-auto rounded-l-sm bg-chat border-0 hover:bg-background cursor-pointer'
										onClick={handleModeClick}
										title='Click to cycle modes'
									>
										<selectedMode.icon className='h-4 w-4' />
										<span className='text-sm font-medium'>{selectedMode?.title}</span>
									</Button>
									<DropdownMenu open={open} onOpenChange={setOpen}>
										<DropdownMenuTrigger asChild>
											<Button
												type='button'
												variant='ghost'
												size='sm'
												className='h-7 w-auto rounded-r-sm rounded-l-none bg-transparent border-0 hover:bg-transparent active:bg-transparent cursor-pointer'
												title='Select model • ⌘.'
											>
												<selectedModel.icon className='h-4 w-4' />
												<ChevronUp className='h-3 w-3' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											side='top'
											align='start'
											alignOffset={-50}
											className='w-[150px] bg-chat'
										>
											{MODEL_GROUPS.map((modelGroup) => (
												<div key={modelGroup.title}>
													{modelGroup.submenu.map((modelItem) => (
														<DropdownMenuItem
															key={modelItem.title}
															onClick={() => {
																setSelectedModel(modelItem)
																setOpen(false)
																captureEvent('model_selected', { model: modelItem.model })
															}}
															className='cursor-pointer'
														>
															<modelItem.icon className='h-4 w-4 text-muted-foreground' />
															<span>{modelItem.model}</span>
															<span className='ml-auto text-xs text-muted-foreground'>{modelItem.shortcut}</span>
														</DropdownMenuItem>
													))}
													{modelGroup.separate && <DropdownMenuSeparator />}
												</div>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{/* Right side - Send button */}
								<Button
									type='submit'
									disabled={formik.isSubmitting}
									variant='secondary'
									className={cn(
										'relative overflow-hidden rounded-md h-9 px-4 whitespace-nowrap',
										'bg-chat/70 hover:bg-chat/80',
										'border border-border',
										formik.isSubmitting && 'opacity-50 cursor-not-allowed'
									)}
								>
									{formik.isSubmitting ? 'Requesting...' : 'Get Early Access'}
									{/* <Send className='h-4 w-4' /> */}
									<BorderBeam
										size={55}
										initialOffset={20}
										className='from-primary/10 via-primary/30 to-transparent'
										transition={{ type: 'spring', duration: 10 }}
									/>
								</Button>
							</div>
						</div>

						{/* Error */}
						{showError && (
							<div className='mt-2 text-xs text-destructive'>
								{formik.errors.email}
							</div>
						)}
					</form>
				</div>
				{/* </BlurFade> */}

				{/* Privacy / terms */}
				{/* <BlurFade delay={0.3}> */}
				<div>
					<div className='w-full max-w-2xl mt-2'>
						<p className={cn(
							'text-xs text-center px-4',
							'text-muted-foreground',
							'transition-colors duration-300',
							'tracking-tight'
						)}>
							By joining the early access list, you agree to our{' '}
							<Link
								href='/privacy'
								className={cn(
									'underline underline-offset-2',
									'hover:text-foreground',
									'transition-colors duration-300'
								)}
							>
								Privacy Policy
							</Link>
							{' '}and{' '}
							<Link
								href='/terms'
								className={cn(
									'underline underline-offset-2',
									'hover:text-foreground',
									'transition-colors duration-300'
								)}
							>
								Terms of Use
							</Link>
						</p>
					</div>
				</div>
				{/* </BlurFade> */}

				{/* Divider between hero and footer */}
				{/* <BlurFade className='w-full max-w-5xl' delay={0.35}> */}
				<div className='w-full max-w-5xl'>
					<div className="w-full max-w-5xl mt-24 mb-16">
						<hr className="w-full border-t border-border dark:border-sidebar-border" />
					</div>
				</div>
				{/* </BlurFade> */}

				{/* Footer section with social links */}
				{/* <BlurFade delay={0.4}> */}
				<div>
					<div className="w-full max-w-2xl">
						{/* Copyright */}
						<p className={cn(
							'text-center text-xs mb-6',
							'text-[#9CA3AF] dark:text-[#9CA3AF]/60',
							'transition-colors duration-300'
						)}>
							&copy; {new Date().getFullYear()} Stratum Labs Inc. All rights reserved.
						</p>

						{/* Social Links */}
						<SocialLinks />
					</div>
				</div>
				{/* </BlurFade> */}

				{/* <BlurFade delay={0.35}>
					<p className={cn(
						'text-xs text-muted-foreground transition-colors duration-300 mt-6'
					)}>
						{version} &nbsp;|&nbsp; {os} {installInfo ? ` | ${installInfo}` : ''}
					</p>
				</BlurFade> */}
			</div>

			{/* SVG Apple icon (for macOS button) */}
			<svg style={{ display: 'none' }}>
				<symbol id='apple-icon' viewBox='0 0 20 20'>
					<path d='M16.7 13.6c-.2.5-.4 1-.7 1.5-.4.6-.7 1-1.2 1.5-.5.5-1 .8-1.6.8-.4 0-.9-.1-1.5-.3-.6-.2-1.1-.3-1.7-.3-.6 0-1.2.1-1.7.3-.6.2-1.1.3-1.5.3-.6 0-1.1-.3-1.6-.8-.5-.5-.9-1-1.2-1.5-.3-.5-.6-1-.7-1.5-.2-.6-.3-1.2-.3-1.8 0-1 .2-1.8.7-2.4.5-.6 1.1-.9 1.8-.9.4 0 .9.1 1.5.3.6.2 1.1.3 1.7.3.6 0 1.2-.1 1.7-.3.6-.2 1.1-.3 1.5-.3.7 0 1.3.3 1.8.9.5.6.7 1.4.7 2.4 0 .6-.1 1.2-.3 1.8zM13.2 3.2c0 .5-.2 1-.5 1.5-.3.5-.7.9-1.2 1.2-.5.3-1 .5-1.5.5-.1 0-.2 0-.3-.1-.1-.1-.1-.2-.1-.3 0-.5.2-1 .5-1.5.3-.5.7-.9 1.2-1.2.5-.3 1-.5 1.5-.5.1 0 .2 0 .3.1.1.1.1.2.1.3z' />
				</symbol>
			</svg>
		</section>
	)
}
