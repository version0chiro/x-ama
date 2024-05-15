'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { SubmitButton } from "@/components/common/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div onClick={
        () => reset()
      }>
        <SubmitButton text='Try Again' />
      </div>
    </div>
  )
}