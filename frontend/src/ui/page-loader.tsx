import { LoadingSpinner } from "./loading-spinner"

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <LoadingSpinner size="lg" />
      <div className="text-center">
        <p className="text-lg font-medium text-muted-foreground">{message}</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Fetching latest data from backend...</p>
      </div>
    </div>
  )
}
