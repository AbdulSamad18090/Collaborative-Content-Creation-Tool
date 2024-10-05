import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
          <AlertTriangle className="relative z-10 mx-auto h-24 w-24 text-gray-900 dark:text-gray-100" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops! Something went wrong</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          We apologize for the inconvenience. Our team has been notified and is working on resolving the issue.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If the problem persists, please contact our{" "}
            <a href="/support" className="underline hover:text-gray-900 dark:hover:text-gray-100">
              support team
            </a>
            .
          </p>
        </div>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  )
}