import { Suspense } from "react";
import ConfirmContent from "./page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Confirm Your Account - Grit',
    robots: {
      index: false,
      follow: false,
    }
}

export default function ConfirmPage() {
    return (
      <div className="grid items-center justify-items-center min-h-screen pt-24 sm:pt-28 lg:pt-24 px-6 sm:px-8 pb-12 sm:pb-16 font-[family-name:var(--font-geist-sans)]">
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmContent />
        </Suspense>
      </div>
    )
  }
