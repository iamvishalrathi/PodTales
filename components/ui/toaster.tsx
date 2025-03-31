"use client"

import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="sm:max-w-md max-w-[90vw] sm:p-4 p-3">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-sm sm:text-base">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-xs sm:text-sm">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="h-4 w-4 sm:h-5 sm:w-5" />
          </Toast>
        )
      })}
      <ToastViewport className="p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3" />
    </ToastProvider>
  )
}
