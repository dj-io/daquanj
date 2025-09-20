'use client'

import { useRef, useState } from 'react'
import { BorderBeam } from '@/components/magicui/border-beam'
// import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import Link from 'next/link'
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
// import { TextStream } from './ui/text-stream'
import { ChatMode, ModelItem } from '@/lib/types'
// import { detectOS } from '@/lib/utils'
import { CHAT_MODES, MODEL_GROUPS } from '@/lib/constants'
import { SocialLinks } from './social-links'
import DesktopAppFrame from '@/app/svg/BrowserFrame' // TODO: Rename file to DesktopAppFrame.tsx
import { HeroCentered } from './hero-centered'

export function HeroSection () {
	// const [os, setOS] = useState('macOS')
	const [selectedMode, setSelectedMode] = useState<ChatMode>(CHAT_MODES[0])
	const [selectedModel, setSelectedModel] = useState<ModelItem>(MODEL_GROUPS[0].submenu[0])
	const [open, setOpen] = useState(false)

	const router = useRouter()
	const inputRef = useRef<HTMLInputElement | null>(null)

	// useEffect(() => {
	// 	setOS(detectOS())
	// }, [])


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

	const handleSend = async () => {
		await formik.validateForm()
		formik.setTouched({ email: true })
		if (!formik.errors.email) {
			captureEvent('join_waitlist_clicked', {
				mode: selectedMode.title
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
		<>
			{/* Desktop app backdrop - fixed to viewport */}
			<div
				aria-hidden
				className='pointer-events-none fixed inset-0 z-0'
			>
				{/* Color glows (subtle, behind the frame) */}
				{/* <div className='absolute inset-0 -z-10'> */}

					{/* Bright Orange (#F64E00) - top left */}
					{/* <div className='absolute left-[15%] top-[25%] h-[25vh] w-[45vw] rounded-xs blur-3xl bg-[radial-gradient(ellipse_70%_80%_at_40%_50%,oklch(0.6538 0.214474 37.9064/0.22)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_40%_50%,oklch(0.68_0.18_35/0.15)_0%,transparent_70%)]' /> */}
					{/* Brown accent - bottom right */}
					{/* <div className='absolute right-[15%] bottom-[15%] h-[25vh] w-[40vw] rounded-xs blur-3xl bg-[radial-gradient(ellipse_65%_50%_at_70%_50%,oklch(0.68_0.18_35/0.14)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_65%_50%_at_70%_50%,oklch(0.2132 0.0135 93.98)_0%,transparent_55%)]' /> */}

				{/* </div> */}

				{/* Desktop frame above glows */}
				<div className='flex h-full items-center justify-center relative z-[1] -translate-y-[calc(25vh-50px)] md:translate-y-0'>
					<div className='w-[min(900px,95vw)] opacity-55 text-foreground/30 dark:text-white/30 [mask-image:linear-gradient(to_bottom,black_0%,black_20%,transparent_100%)]'>
						<DesktopAppFrame className='w-full h-auto' />
					</div>
				</div>
			</div>

			<section className="w-full relative z-10 overflow-hidden md:overflow-auto">
				<div className="mx-auto max-w-5xl px-4 py-10 md:py-20 sm:px-6 lg:px-8 space-y-12">

					{/* Hero content */}
					<div className="space-y-8">
						<HeroCentered />
					</div>


				{/* Chat-style input */}
				<div>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSend()
						}}
						className='w-full max-w-2xl md:max-w-3xl mx-auto'
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
									'[appearance:textfield] autofill:bg-transparent focus:bg-transparent',
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
											className='w-[165px] bg-chat'
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

			</div>


			{/* Footer section with social links */}
			<footer className="md:mt-8 relative z-20">
				<div className="mx-auto max-w-4xl px-4 py-8 text-center space-y-4">
					{/* Copyright */}
					<p className="text-xs text-muted-foreground/60 transition-colors duration-300">
						&copy; {new Date().getFullYear()} Stratum Labs Inc. All rights reserved.
					</p>

					{/* Social Links */}
					<SocialLinks />
				</div>
			</footer>
		</section>

		{/* Bottom Gaussian blur overlay (fades page bottom) */}
		<div
			aria-hidden
			className="pointer-events-none fixed left-0 right-0 h-30 z-20 backdrop-blur-2xl bg-background/40"
			style={{
				bottom: '-2px',
				WebkitMaskImage:
					'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 24%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
				maskImage:
					'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 24%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
			}}
		/>
		</>
	)
}
