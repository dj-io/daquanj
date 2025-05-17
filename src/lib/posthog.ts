'use client'

import posthog from 'posthog-js'

export function captureEvent(eventName: string, properties?: Record<string, unknown>) {
  posthog.capture(eventName, {
    ...properties,
    $current_url: window.location.href,
  })
}

export function identify(id: string, properties?: Record<string, unknown>) {
  posthog.identify(id, {
    ...properties,
    $current_url: window.location.href,
  })
}

export { posthog }
