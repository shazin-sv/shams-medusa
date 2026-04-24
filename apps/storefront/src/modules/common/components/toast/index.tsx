"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastComponentProps extends ToastProps {
  onClose: (id: string) => void
}

const ToastComponent = ({ id, type, message, onClose }: ToastComponentProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true)
    
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Wait for exit animation
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-green-500" />
      case "error":
        return <XCircle size={20} className="text-red-500" />
      case "warning":
        return <AlertCircle size={20} className="text-orange-500" />
      case "info":
        return <Info size={20} className="text-blue-500" />
      default:
        return <Info size={20} className="text-blue-500" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-orange-500"
      case "info":
        return "border-l-blue-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-lg border-l-4 p-4 min-w-[300px] max-w-md
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getBorderColor()}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onClose(id), 300)
          }}
          className="flex-shrink-0 p-1 hover:bg-neutral-100 rounded transition-colors duration-200"
        >
          <X size={16} className="text-neutral-500" />
        </button>
      </div>
    </div>
  )
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Date.now().toString()
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Make addToast available globally
  useEffect(() => {
    ;(window as any).toast = addToast
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}

// Hook for using toast
export const useToast = () => {
  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    if (typeof window !== 'undefined' && (window as any).toast) {
      return (window as any).toast(toast)
    }
  }

  return {
    success: (message: string, duration?: number) => addToast({ type: 'success', message, duration }),
    error: (message: string, duration?: number) => addToast({ type: 'error', message, duration }),
    warning: (message: string, duration?: number) => addToast({ type: 'warning', message, duration }),
    info: (message: string, duration?: number) => addToast({ type: 'info', message, duration }),
  }
}
