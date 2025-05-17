'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BlurFade } from '@/components/magicui/blur-fade';

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'confirming' | 'success' | 'error'>('pending')
  const [message, setMessage] = useState('')

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
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to confirm email')
    }
  }

  const isButtonDisabled = status === 'confirming' || status === 'success'
  const buttonText = status === 'confirming'
    ? 'Confirming...'
    : status === 'success'
      ? 'Confirmed!'
      : 'Confirm account'

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col  row-start-2 items-center sm:items-start">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-12">
        <Link href="/" className="flex items-center gap-2 group">
						<div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-black dark:bg-white">
							<Image
								src='/images/str-logo.jpg'
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
                        'text-4xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight',
                        'bg-clip-text text-transparent',
                        'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                        'dark:from-white dark:via-white/100 dark:to-white/100',
                        'transition-colors duration-300'
                    )}>
						Account confirmation
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
						To confirm your account, please click the button below.
					</p>
				</BlurFade>


        {/* Confirmation Button */}
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
        <p className="text-[#9CA3AF] text-base mt-8 max-w-lg">
          If you have any issue confirming your account please contact,{' '}
          <a
            href="mailto:hq@stratumlabs.ai"
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
    </div>
  )
}

export const metadata = {
  title: 'Confirm Your Account - Grit',
  robots: {
    index: false,
    follow: false,
  }
}
