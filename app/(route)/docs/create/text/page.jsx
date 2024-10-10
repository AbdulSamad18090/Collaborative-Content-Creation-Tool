"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import TextEditor from "./_components/TextEditor/page";

const TextDocument = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return session && <div>text Editor</div>;
};

export default TextDocument;
