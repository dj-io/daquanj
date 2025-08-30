import Image from 'next/image'
import { cn } from '@/lib/utils'

export const GritIcon = ({ className }: { className?: string }) => (
	<Image
		src="/images/grit-icon-macOS-Dark-1x.png"
		alt="Grit"
		width={16}
		height={16}
		className={cn("rounded-sm", className)}
	/>
)
