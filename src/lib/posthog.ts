'use client'

import posthog from 'posthog-js'

export function captureEvent(eventName: string, properties?: Record<string, unknown>) {
  posthog.capture(eventName, {
    $session_id: posthog.get_session_id(),
    $start_timestamp: new Date().getTime(),
    $end_timestamp: new Date().getTime(),
    $entry_current_url: window.location.href,
    ...properties,
  })
}

export function identify(id: string, properties?: Record<string, unknown>) {
  posthog.identify(id, {
    $session_id: posthog.get_session_id(),
    $entry_current_url: window.location.href,
    ...properties,
  })
}

export { posthog }
