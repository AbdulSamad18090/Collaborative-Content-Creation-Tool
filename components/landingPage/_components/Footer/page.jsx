import { Pen } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white px-4 border-t dark:bg-neutral-950">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Pen className="h-6 w-6" />
          <span className="text-xl font-bold">ContentCollab</span>
        </div>
        <nav className="flex flex-wrap justify-center space-x-4">
          <Link className="text-sm hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">Privacy Policy</Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">Contact Us</Link>
        </nav>
      </div>
      <div className="container py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        © 2024 ContentCollab. All rights reserved.
      </div>
    </footer>
  );
}
