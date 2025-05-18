'use client'

import { useEffect, useState } from 'react'
// import Image from 'next/image'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { captureEvent } from '@/lib/posthog'
import { useRouter } from 'next/navigation'
// import { ModeToggle } from './theme-toggle'

// OS detection logic
function detectOS () {
	if (typeof window === 'undefined') return 'macOS'
	const { userAgent, platform } = window.navigator
	if (/Mac/i.test(platform)) return 'macOS'
	if (/Win/i.test(platform)) return 'Windows'
	if (/Linux/i.test(platform)) return 'Linux'
	if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS'
	if (/Android/i.test(userAgent)) return 'Android'
	return 'macOS'
}

export function HeroSection () {
	const [os, setOS] = useState('macOS')
	const router = useRouter()

	useEffect(() => {
		setOS(detectOS())
	}, [])

	const version = 'v0.1.0'
	const installInfo = os === 'macOS'
		? 'macOS 13+'
		: os === 'Windows'
			? 'Windows 10+'
			: os === 'Linux'
				? 'Linux'
				: ''

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
					form_completion_time: timeElapsed
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await formik.validateForm()
		formik.setTouched({ email: true })
		formik.handleSubmit(e)
	}

	// Show error if:
	// 1. User submitted form and there's an error (regardless of value)
	// 2. Field was blurred (touched) AND has a non-empty value AND has an error
	const showError = (formik.submitCount > 0 && formik.errors.email) ||
		(formik.touched.email && formik.values.email.length > 0 && formik.errors.email)

	return (
		<section className='relative flex flex-col items-center justify-start w-full pb-96 sm:pb-[32rem] '>
			{/* Content overlay */}
			<div className='relative z-10 flex flex-col items-center text-center mt-24 sm:mt-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
				<BlurFade delay={0.1}>
					<h1 className={cn(
                        'text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight',
						'text-[#9CA3AF] dark:text-[#9CA3AF]',
                        'bg-clip-text text-transparent',
                        'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                    )}>
						The AI Note <span className='text-[#9CA3AF]'>Editor.</span>
					</h1>
				</BlurFade>
				<BlurFade delay={0.2}>
					<p className="text-lg sm:text-xl mb-12 font-medium text-foreground dark:text-foreground">
					  A <span className={cn(
						'line-through',
						'bg-clip-text',
						'transition-colors duration-300'
						)}>Rich Text Editor</span>
					<span className={cn(
                        'text-lg sm:text-xl mb-12 font-medium',
                        'bg-clip-text',
                        'transition-colors duration-300'
                    )}>
						{/* WAITLIST ONE LINERs */}
						{/* <span>A first of its kind Generative, Rich, Intelligent Text Editor for agentic note taking.</span> */}
						{/* <span>A context aware note editor that learns from you, Grit bridges the gap between everyday note taking and power use.</span> */}
						{/* <span>Grit bridges the gap between everyday note taking and power use.</span> */}
						{/* <span>Take notes and write professionally with AI at your fingertips, all in one place. </span> */}
					     {/* <span className={cn(
						'text-lg sm:text-xl mb-12 font-medium',
						'bg-clip-text',
						'transition-colors duration-300'
						)}>	Generative, Rich, Intelligent Text Editor for agentic note taking.</span> */}
						 <span style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }}> G</span>enerative, <span style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }}>R</span>ich, <span style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }}>I</span>ntelligent <span style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff' }}>T</span>ext Editor for agentic note taking.
					</span>
					</p>
				 </BlurFade>
				<BlurFade delay={0.3}>
					<form onSubmit={handleSubmit} className='flex flex-row gap-2 w-full max-w-md'>
						<div className='relative flex-1 min-w-0'>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Enter your email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								onFocus={() => captureEvent('join_waitlist_focused')}
								className={cn(
									'w-full h-9 px-4 rounded-md',
									'bg-background dark:bg-[#0C0A09]',
									'text-foreground dark:text-foreground',
									'border border-border dark:border-[#383838]/60',
									'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#383838]/60',
									'placeholder:text-[#9CA3AF]/80',
									'cursor-text',
									'text-sm',
									showError ? 'border-destructive' : ''
								)}
							/>
							{showError && (
								<div className="absolute -bottom-6 left-0 text-xs text-destructive">
									{formik.errors.email}
								</div>
							)}
						</div>
						<button
							type="submit"
							disabled={formik.isSubmitting}
							className={cn(
								'relative overflow-hidden',
								'flex items-center justify-center h-9 px-4',
								'w-28',
								'rounded-md',
								'bg-background dark:bg-[#0C0A09]',
								'text-foreground dark:text-zinc-100',
								'border border-border dark:border-[#383838]/60',
								'font-medium shadow-sm',
								'hover:bg-accent/80 dark:hover:bg-[#0F0F0F]/50',
								'transition-colors text-sm',
								'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#383838]/60',
								'cursor-pointer',
								'whitespace-nowrap',
								formik.isSubmitting && 'opacity-50 cursor-not-allowed'
							)}
						>
							{formik.isSubmitting ? 'Joining...' : 'Join Waitlist'}
							<BorderBeam
								size={55}
								initialOffset={20}
								className="from-zinc-900/40 via-zinc-500/50 to-transparent dark:via-[#0F0F0F] dark:to-[#6b7280]"
								transition={{
									type: "spring",
									duration: 10
								}}
							/>
						</button>
					</form>
				</BlurFade>

				{/* Separate BlurFade for the privacy text with different delay */}
				<BlurFade delay={0.2}>
					<div className="w-full max-w-md mt-2">
						<p className={cn(
							'text-xs',
							'text-center',
							'text-[#9CA3AF]/70 dark:text-[#9CA3AF]/50',
							'transition-colors duration-300',
							'tracking-tight',
							'whitespace-nowrap'
						)}>
							By joining the waitlist, you agree to our{' '}
							<Link
								href="/privacy"
								className={cn(
									'underline underline-offset-2',
									'hover:text-[#9CA3AF] dark:hover:text-[#9CA3AF]/80',
									'transition-colors duration-300'
								)}
							>
								Privacy Policy
							</Link>
							{' '}and{' '}
							<Link
								href="/terms"
								className={cn(
									'underline underline-offset-2',
									'hover:text-[#9CA3AF] dark:hover:text-[#9CA3AF]/80',
									'transition-colors duration-300'
								)}
							>
								Terms of Use
							</Link>
						</p>
					</div>
				</BlurFade>

				<BlurFade delay={0.3}>
					{installInfo ? (
						<p className={cn(
							'text-xs',
							'text-[#383838] dark:text-[#9CA3AF]/80',
							'transition-colors duration-300',
							'mt-6'
						)}>
							{version} &nbsp;|&nbsp; {os} &nbsp;|&nbsp; {installInfo}
						</p>
					) : (
						<p className={cn(
								'text-xs',
								'text-[#383838] dark:text-[#9CA3AF]/80',
								'transition-colors duration-300',
								'mt-6'
						)}>
							{version} &nbsp;|&nbsp; {os}
						</p>
					)}
				</BlurFade>
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
