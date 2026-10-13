"use client";

import "@/styles/globals.css";

/**
 * Last resort: replaces the whole document when the root layout itself fails, so it cannot use
 * any provider or layout component.
 */
const GlobalError = ({ reset }: { reset: () => void }) => (
  <html lang="en">
    <body className="dark flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The app hit an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-gradient mt-6 cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-[#02121f]"
        >
          Try again
        </button>
      </div>
    </body>
  </html>
);

export default GlobalError;
