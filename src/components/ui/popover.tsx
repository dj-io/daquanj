import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

// Global state to track currently open popover and close previous ones
let currentOpenPopover: ((open: boolean) => void) | null = null

type HoverCtx = {
  enabled: boolean
  openDelay: number
  closeDelay: number
  onOpenChange: (open: boolean) => void
  openTimerRef: React.RefObject<number | null>
  closeTimerRef: React.RefObject<number | null>
}

const HoverContext = React.createContext<HoverCtx | null>(null)

type PopoverProps =
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    openOnHover?: boolean
    hoverOpenDelay?: number
    hoverCloseDelay?: number
    enabled?: boolean
  }

function Popover({
  open,
  onOpenChange,
  openOnHover = false,
  hoverOpenDelay = 150,
  hoverCloseDelay = 150,
  enabled = true,
  children,
  ...props
}: PopoverProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(false)

  const openTimerRef = React.useRef<number | null>(null)
  const closeTimerRef = React.useRef<number | null>(null)

  const clearTimers = React.useCallback(() => {
    if (openTimerRef.current != null) {
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const setOpenState = React.useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  // Context-controlled open change (used by hover handlers)
  const contextOnOpenChange = React.useCallback((next: boolean) => {
    if (!enabled) return

    if (openOnHover) {
      if (next) {
        if (currentOpenPopover && currentOpenPopover !== contextOnOpenChange) {
          currentOpenPopover(false)
        }
        currentOpenPopover = contextOnOpenChange
      } else if (currentOpenPopover === contextOnOpenChange) {
        currentOpenPopover = null
        clearTimers()
      }
    }

    setOpenState(next)
  }, [enabled, openOnHover, clearTimers, setOpenState])

  const value = React.useMemo(
    () => ({
      enabled: !!openOnHover && enabled,
      openDelay: hoverOpenDelay,
      closeDelay: hoverCloseDelay,
      onOpenChange: contextOnOpenChange,
      openTimerRef,
      closeTimerRef,
    }),
    [
      openOnHover,
      hoverOpenDelay,
      hoverCloseDelay,
      enabled,
      contextOnOpenChange,
    ]
  )

  const currentOpen = enabled
    ? (isControlled ? (open as boolean) : internalOpen)
    : false

  // Cleanup: avoid stray timers and stale global refs on unmount
  React.useEffect(() => {
    return () => {
      if (openTimerRef.current != null) {
        window.clearTimeout(openTimerRef.current)
        openTimerRef.current = null
      }
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
      if (currentOpenPopover === contextOnOpenChange) {
        currentOpenPopover = null
      }
    }
  }, [contextOnOpenChange])

  return (
    <HoverContext.Provider value={value}>
      <PopoverPrimitive.Root
        open={currentOpen}
        // In hover mode we do NOT wire Root's onOpenChange. We control open via
        // our own state + context (timers). This prevents click-to-open.
        onOpenChange={enabled ? (openOnHover ? undefined : setOpenState) : undefined}
        {...props}
      >
        {children}
      </PopoverPrimitive.Root>
    </HoverContext.Provider>
  )
}

type TriggerProps =
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  TriggerProps
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const ctx = React.useContext(HoverContext)

  const handleEnter = React.useCallback(
    (e: Parameters<NonNullable<typeof onMouseEnter>>[0]) => {
      onMouseEnter?.(e)
      if (!ctx?.enabled || props.disabled) return
      if (ctx.closeTimerRef.current != null) {
        window.clearTimeout(ctx.closeTimerRef.current)
        ctx.closeTimerRef.current = null
      }
      const anotherOpen = currentOpenPopover !== null
      const delay = anotherOpen ? 0 : ctx.openDelay
      ctx.openTimerRef.current = window.setTimeout(() => ctx.onOpenChange(true), delay)
    },
    [onMouseEnter, ctx, props.disabled]
  )

  const handleLeave = React.useCallback(
    (e: Parameters<NonNullable<typeof onMouseLeave>>[0]) => {
      onMouseLeave?.(e)
      if (!ctx?.enabled || props.disabled) return
      if (ctx.openTimerRef.current != null) {
        window.clearTimeout(ctx.openTimerRef.current)
        ctx.openTimerRef.current = null
      }
      ctx.closeTimerRef.current = window.setTimeout(
        () => ctx.onOpenChange(false),
        ctx.closeDelay
      )
    },
    [onMouseLeave, ctx, props.disabled]
  )

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    />
  )
})
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, onMouseEnter, onMouseLeave, onCloseAutoFocus, ...props }, ref) => {
  const ctx = React.useContext(HoverContext)

  const handleEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e)
      if (!ctx?.enabled) return
      if (ctx.closeTimerRef.current != null) {
        window.clearTimeout(ctx.closeTimerRef.current)
        ctx.closeTimerRef.current = null
      }
    },
    [onMouseEnter, ctx]
  )

  const handleLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e)
      if (!ctx?.enabled) return
      ctx.closeTimerRef.current = window.setTimeout(
        () => ctx.onOpenChange(false),
        ctx.closeDelay
      )
    },
    [onMouseLeave, ctx]
  )

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        onCloseAutoFocus={(e) => {
          onCloseAutoFocus?.(e)
          if (ctx?.enabled && !e.defaultPrevented) e.preventDefault()
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          // Disable animations for hover mode to prevent jarring transitions
          !ctx?.enabled && "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
