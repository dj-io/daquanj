'use client'

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

interface IntroContextValue {
	isIntroComplete: boolean
	completeIntro: () => void
}

const IntroContext = createContext<IntroContextValue | null>(null)

export function IntroProvider({ children }: { children: React.ReactNode }) {
	const [isIntroComplete, setIsIntroComplete] = useState(false)
	const completeIntro = useCallback(() => setIsIntroComplete(true), [])
	const value = useMemo(
		() => ({
			isIntroComplete,
			completeIntro,
		}),
		[completeIntro, isIntroComplete],
	)

	return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
	const context = useContext(IntroContext)

	if (!context) {
		throw new Error('useIntro must be used within IntroProvider')
	}

	return context
}
