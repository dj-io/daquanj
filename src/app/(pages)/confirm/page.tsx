'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BlurFade } from '@/components/magicui/blur-fade';
import { captureEvent } from '@/lib/posthog'

export default function ConfirmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'confirming' | 'success' | 'error' | 'waitlist_joined'>('pending')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const action = searchParams.get('action')
    const email = searchParams.get('email')

    if (action === 'waitlist_joined' && !token) {
      setStatus('waitlist_joined')
      setMessage(email ? `We've sent a confirmation link to ${email}. Please check your inbox (and spam folder) to finish.` : 'We\'ve sent a confirmation link to your email. Please check your inbox (and spam folder) to finish.')
      captureEvent('waitlist_confirmation_pending_page_viewed', { email: email || 'not_provided' })
    } else if (token) {
      // Existing token confirmation logic can remain, or be triggered by a button
      // For simplicity, if a token is present, we assume the user wants to confirm.
      // You might want a button press for this if the page loads before user interaction.
      // handleConfirm(token) // Auto-trigger or wait for button
    } else if (!action && !token) {
      // No token and no specific action - could be an invalid access
      setStatus('error')
      setMessage('Invalid page access. If you are trying to confirm your email, please use the link from your email.')
      captureEvent('confirm_page_invalid_access')
    }
  }, [searchParams, router])

  const handleConfirm = async () => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Invalid confirmation link')
      return
    }

    setStatus('confirming')
    try {
      const response = await fetch(`/api/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to confirm email')
      }

      setStatus('success')
      setMessage('Your email has been confirmed successfully!')
      // Redirect to homepage after successful confirmation
      setTimeout(() => {
        router.push('/')
      }, 2000)

      captureEvent('confirmation_succeeded', {
        time_to_confirm: Date.now() - performance.timeOrigin, // ms since page load
        token_present: Boolean(token)
      })
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to confirm email')
      captureEvent('confirmation_failed', {
        error_message: message,
        token_present: Boolean(token)
      })
    }

    captureEvent('confirmation_requested', {
      token_present: Boolean(token)
    })
  }

  const isButtonDisabled = status === 'confirming' || status === 'success' || status === 'waitlist_joined'
  const buttonText = status === 'confirming'
    ? 'Confirming...'
    : status === 'success'
      ? 'Confirmed!'
      : 'Confirm Account'

  if (status === 'waitlist_joined') {
    return (
      <div className="flex flex-col items-center text-center w-full max-w-lg p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-12 self-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-black dark:bg-white">
              <Image
                src='/images/grit-icon-macOS-Dark-1x.png'
                alt='Grit logo'
                width={100}
                height={100}
                className='w-15 h-12 object-cover transition-colors'
                priority
              />
            </div>
          </Link>
        </div>

        <BlurFade delay={0.1}>
          <h1 className={cn(
            'text-4xl md:text-4xl font-bold mb-4 leading-none whitespace-nowrap',
            'bg-clip-text text-transparent',
            'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
            'dark:from-white dark:via-white/100 dark:to-white/100',
            'transition-colors duration-300'
          )}>
            Almost there!
          </h1>
        </BlurFade>
        <BlurFade delay={0.4}>
          <p className={cn(
            'text-lg md:text-xl mb-12 font-medium px-4 max-w-md mx-auto',
            'bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60',
            'dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]',
            'bg-clip-text text-transparent',
            'transition-colors duration-300'
          )}>
            {message}
          </p>
        </BlurFade>
         <BlurFade delay={0.5}>
           <Link
              href="/"
              className={cn(
                'relative overflow-hidden mt-4',
                'flex items-center justify-center h-10 px-6 w-full sm:w-auto',
                'rounded-md',
                'bg-background dark:bg-[#0C0A09]',
                'text-foreground dark:text-zinc-100',
                'border border-border dark:border-[#383838]/60',
                'font-medium shadow-sm',
                'hover:bg-accent/80 dark:hover:bg-[#0F0F0F]/50',
                'transition-colors text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#383838]/60',
                'cursor-pointer'
              )}
            >
              Back to Homepage
            </Link>
          </BlurFade>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center w-full max-w-lg p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Logo */}
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-12 self-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-black dark:bg-white">
            <Image
              src='/images/grit-icon-macOS-Dark-1x.png'
              alt='Grit logo'
              width={100}
              height={100}
              className='w-15 h-12 object-cover transition-colors'
              priority
            />
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <BlurFade delay={0.1}>
        <h1 className={cn(
          'text-3xl md:text-4xl font-bold mb-4 leading-none whitespace-nowrap',
          'bg-clip-text text-transparent',
          'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
          'dark:from-white dark:via-white/100 dark:to-white/100',
          'transition-colors duration-300'
        )}>
          {searchParams.get('token') ? 'Account Confirmation' : 'Confirm Your Email'}
        </h1>
      </BlurFade>
      <BlurFade delay={0.2}>
        <p className={cn(
          'text-lg md:text-xl mb-12 font-medium px-4 max-w-lg mx-auto',
          'bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60',
          'dark:from-white dark:via-[#bfc3c9] dark:to-[#6b7280]',
          'bg-clip-text text-transparent',
          'transition-colors duration-300'
        )}>
          {searchParams.get('token') ? 'To confirm your account, please click the button below.' : message || 'Please check your email for a confirmation link.'}
        </p>
      </BlurFade>

      {/* Confirmation Button */}
      {searchParams.get('token') && status !== 'success' && (
        <button
          onClick={handleConfirm}
          disabled={isButtonDisabled}
          className={cn(
            'relative overflow-hidden',
            'flex items-center justify-center h-10 px-4 w-full',
            'rounded-md',
            'bg-background dark:bg-[#0C0A09]',
            'text-foreground dark:text-zinc-100',
            'border border-border dark:border-[#383838]/60',
            'font-medium shadow-sm',
            'hover:bg-accent/80 dark:hover:bg-[#0F0F0F]/50',
            'transition-colors text-sm',
            'focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-[#383838]/60',
            'cursor-pointer',
            isButtonDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {buttonText}
        </button>
      )}

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-4 text-[#059669] text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {message}
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 text-[#EF4444] text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {message}
        </div>
      )}

      {/* Support Text */}
      <p className="text-[#9CA3AF] text-base mt-8 max-w-lg px-4">
        If you have any issue confirming your account please contact,{' '}
        <a
          href="mailto:hq@stratumlabs.ai"
          onClick={() => captureEvent('support_email_clicked')}
          className={cn(
            'text-[#bfc3c9] hover:text-[#383838]',
            'transition-colors duration-200'
          )}
        >
          hq@stratumlabs.ai
        </a>
        .
      </p>
    </div>
  )
}
