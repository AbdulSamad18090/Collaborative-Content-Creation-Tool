"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function InvitePageComponent({ role = "Member" }) {
  const [inviteStatus, setInviteStatus] = useState("pending");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAccept = () => {
    setInviteStatus("accepted");
    setIsRegistering(true);
  };

  const handleReject = () => {
    setInviteStatus("rejected");
  };

  const handleBack = () => {
    setInviteStatus("pending");
    setIsRegistering(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    alert("Registration submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg  bg-black text-white border-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">
              Youre Invited
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Join us as a{" "}
              <span className="font-semibold text-yellow-600">{role}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {inviteStatus === "pending" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-center text-gray-300">
                  Youve been invited to join our exclusive platform as a{" "}
                  <span className="font-semibold text-yellow-600">{role}</span>.
                  Would you like to accept?
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleAccept}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="bg-black text-white hover:bg-black hover:text-white"
                  >
                    Decline
                  </Button>
                </div>
              </motion.div>
            )}
            {inviteStatus === "rejected" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <p className="text-center text-gray-400">
                  Were sorry to see you go. If you change your mind about
                  joining as a {role}, please contact us.
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="bg-black text-white hover:bg-black hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Invite
                  </Button>
                </div>
              </motion.div>
            )}
            <Transition
              show={isRegistering}
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form onSubmit={handleRegister} className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-white"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="bg-black text-white hover:bg-black hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    Register as {role}
                  </Button>
                </div>
              </form>
            </Transition>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            By accepting this invite, you agree to our Terms of Service and
            Privacy Policy.
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
