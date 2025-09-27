"use client"

import { useEffect, useRef } from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationInstance: any = null

    const loadLottie = async () => {
      try {
        const lottie = await import("lottie-web")

        if (containerRef.current) {
          const response = await fetch("/animations/train-loader.json")
          const animationData = await response.json()

          animationInstance = lottie.default.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
          })
        }
      } catch (error) {
        console.error("Failed to load Lottie animation:", error)
        // Fallback to CSS spinner if Lottie fails
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${
              size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-12 w-12"
            }"></div>
          `
        }
      }
    }

    loadLottie()

    return () => {
      if (animationInstance) {
        animationInstance.destroy()
      }
    }
  }, [size])

  const sizeClasses = {
    sm: "h-16 w-20",
    md: "h-24 w-32",
    lg: "h-32 w-40",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div ref={containerRef} className={`${sizeClasses[size]} flex items-center justify-center`} />
    </div>
  )
}
