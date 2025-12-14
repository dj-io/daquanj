'use client'

import { COPY } from '@/lib/constants'
import Image from 'next/image'

export function HeroTitle () {

	return (
		<div className='z-10 flex flex-col gap-18 items-center text-center justify-center max-w-2xl'>
			<Image
				src="/images/gleam_crypto_punk.jpg"
				alt="DaquanJ"
				width={100}
				height={100}
				className="w-24 h-24 object-cover rounded-full"
			/>
			<h1 className="text-2xl md:text-3xl text-grit leading-snug italic font-crimson">{COPY?.[0]?.heading} <span className="text-muted-foreground">{COPY?.[0]?.body}</span></h1>
		</div>
	)
}


