import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Streaming text component that simulates chat response with word fade-in
const TextStream = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) => {
	const [displayedWords, setDisplayedWords] = useState<string[]>([])
	const [currentWordIndex, setCurrentWordIndex] = useState(-1)
	const [isComplete, setIsComplete] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)

	useEffect(() => {
		if (hasStarted) return // Prevent re-running

		const words = text.split(' ')
		const timer = setTimeout(() => {
			setHasStarted(true)
			let wordIndex = 0
			const interval = setInterval(() => {
				if (wordIndex < words.length) {
					setDisplayedWords(words.slice(0, wordIndex + 1))
					setCurrentWordIndex(wordIndex)
					wordIndex++
				} else {
					clearInterval(interval)
					setIsComplete(true)
					setCurrentWordIndex(-1)
				}
			}, speed)

			return () => clearInterval(interval)
		}, delay)

		return () => clearTimeout(timer)
	}, [text, delay, speed, hasStarted])

		return (
		<span className="relative inline-block w-full">
			{/* Invisible text to maintain layout space - inherits all parent styling */}
			<span className="invisible whitespace-pre-wrap" aria-hidden="true" style={{ lineHeight: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
				{text}
			</span>

			{/* Visible streaming text */}
			<span className="absolute inset-0 whitespace-pre-wrap" style={{ lineHeight: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
				{displayedWords.map((word, index) => (
					<span key={index}>
						<span
							className={cn(
								"transition-opacity duration-300",
								index === currentWordIndex && !isComplete
									? "opacity-50 animate-in fade-in-0"
									: "opacity-100"
							)}
						>
							{word}
						</span>
						{index < displayedWords.length - 1 && ' '}
					</span>
				))}
			</span>
		</span>
	)
}

export {
    TextStream
}
