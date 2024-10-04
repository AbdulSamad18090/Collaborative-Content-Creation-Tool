import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header({ isMenuOpen, setIsMenuOpen, handleScroll }) {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full px-4 shadow border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Pen className="h-6 w-6" />
          <span className="text-xl font-bold">ContentCollab</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#home" onClick={handleScroll}>Home</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features" onClick={handleScroll}>Features</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing" onClick={handleScroll}>Pricing</Link>
        </nav>
        <div className="hidden md:flex space-x-4">
          <Button onClick={() => {router.push('/auth/login')}} variant="outline">Login</Button>
          <Button onClick={() => {router.push('/auth/signup')}}>Sign Up</Button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link className="block px-3 py-2 text-base font-medium hover:bg-gray-100" href="#home" onClick={handleScroll}>Home</Link>
            <Link className="block px-3 py-2 text-base font-medium hover:bg-gray-100" href="#features" onClick={handleScroll}>Features</Link>
            <Link className="block px-3 py-2 text-base font-medium hover:bg-gray-100" href="#pricing" onClick={handleScroll}>Pricing</Link>
            <Button className="w-full mt-2" variant="outline">Login</Button>
            <Button className="w-full mt-2">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
