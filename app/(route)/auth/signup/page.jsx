"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen, Zap, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt with:", name, email, password);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-white/[0.02] bg-[size:50px_50px]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 transition duration-300 ease-in-out"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15), transparent 80%)`,
        }}
      />
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-5 p-8 rounded-xl backdrop-blur-sm relative z-10 border border-neutral-200 border-black/10 shadow-2xl">
        <div className="text-center">
          <Pen className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="group">
              <Label htmlFor="name" className="sr-only">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-200 border-black placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-70"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="group">
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-200 border-black placeholder-gray-500 text-white focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-70"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group relative">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-200 border-black placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-70"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-neutral-200 border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Zap className="h-5 w-5 transition-colors" aria-hidden="true" />
              </span>
              Sign up
            </Button>

            <div className="flex items-center gap-1 text-gray-400">
              <div className="h-[1px] w-full bg-gray-400 my-4"></div>
              <p>or</p>
              <div className="h-[1px] w-full bg-gray-400 my-4"></div>
            </div>

            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-neutral-200 border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className='text-2xl' />

              </span>
              Continue with Google
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-gray-300 hover:text-gray-200 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
