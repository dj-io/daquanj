'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
	const [submitted, setSubmitted] = useState(false)

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
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await fetch('/api/waitlist', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				})
				setSubmitted(true)
			} catch (error) {
				console.error('Error submitting form:', error)
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
			{/* Background image with enhanced fade */}
			<div className='absolute inset-0 flex items-center justify-center z-0'>
                <div className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "relative w-full h-full"
                )}>
                    <Image
                        src='/images/str-logo.jpg'
                        alt='Background'
                        fill
                        className={cn(
                            'object-cover object-center',
                            'opacity-90 dark:opacity-90',
                            'transition-all duration-700',
                            'invert dark:invert-0',
                            'pb-200'
                        )}
                        priority
                    />
                </div>
			</div>

			{/* Content overlay */}
			<div className='relative z-10 flex flex-col items-center text-center mt-24 sm:mt-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
				<BlurFade delay={0.1}>
					<h1 className={cn(
                        'text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight',
                        'bg-clip-text text-transparent',
                        'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                        'dark:from-white dark:via-white/80 dark:to-white/60',
                        'transition-colors duration-300'
                    )}>
						The AI Note <span className='text-muted-foreground'>Editor.</span>
					</h1>
				</BlurFade>
				<BlurFade delay={0.4}>
					<p className={cn(
                        'text-lg sm:text-xl mb-12 font-medium',
                        'bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60',
                        'dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]',
                        'bg-clip-text text-transparent',
                        'transition-colors duration-300'
                    )}>
						Designed to make you extraordinarily productive, Grit will be the best way to write and take notes with AI
					</p>
				</BlurFade>
				<BlurFade delay={0.3}>
					<form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md'>
						<div className='relative flex-1'>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Enter your email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								className={cn(
									'w-full h-9 px-4 rounded-md',
									'bg-background dark:bg-zinc-900',
									'text-foreground dark:text-zinc-100',
									'border border-border dark:border-zinc-700',
									'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-zinc-700',
									'placeholder:text-muted-foreground',
									'cursor-text',
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
								'flex items-center justify-center h-9 px-4 min-w-32',
								'rounded-md',
								'bg-background dark:bg-zinc-900',
								'text-foreground dark:text-zinc-100',
								'border border-border dark:border-zinc-700',
								'font-medium shadow-sm',
								'hover:bg-accent dark:hover:bg-zinc-800',
								'transition-colors text-sm',
								'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-zinc-700',
								'cursor-pointer',
								formik.isSubmitting && 'opacity-50 cursor-not-allowed'
							)}
						>
							{submitted ? 'Thanks!' : formik.isSubmitting ? 'Joining...' : 'Join Waitlist'}
							<BorderBeam
								size={50}
								initialOffset={20}
								className="from-zinc-900/40 via-zinc-500/50 to-transparent dark:via-[#bfc3c9] dark:to-[#6b7280]"
								transition={{
									type: "spring",
									duration: 10
								}}
							/>
						</button>
                    {/* <ModeToggle /> */}
					</form>
				</BlurFade>
                <BlurFade delay={0.1}>
                    <p className={cn(
                        'text-xs',
                        'text-muted-foreground dark:text-muted-foreground',
                        'transition-colors duration-300'
                    )}>
                        {version} &nbsp;|&nbsp; {os} &nbsp;|&nbsp; {installInfo}
                    </p>
                    <div className={cn(
                        'text-xs',
                        'text-muted-foreground dark:text-muted-foreground',
                        'transition-colors duration-300',
                        'pt-4'
                    )}>
                    </div>
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
