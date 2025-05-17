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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmContent />
        </Suspense>
      </div>
    )
  }
