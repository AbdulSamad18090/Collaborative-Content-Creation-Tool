"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PDFEditor from "./PdfEditor/page";

const PdfDocument = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return session && <PDFEditor />;
};

export default PdfDocument;
