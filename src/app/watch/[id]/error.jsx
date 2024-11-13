"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Error from "@/component/SpecialErr/SpecialErr";

const ErrorBoundary = ({ error }) => {
  const router = useRouter();

  return (
    <div>
      <Error errorMessage={error.message || "Something went wrong!"} />
      <button className="err-utt" onClick={() => router.refresh()}>Refresh Page</button>
    </div>
  );
};

export default ErrorBoundary;
