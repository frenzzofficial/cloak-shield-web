import type React from "react";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <AuthProvider>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
      {/* Every toast.success / toast.error in the app renders here. */}
      <Toaster theme="dark" position="bottom-right" richColors />
    </AuthProvider>
  );
};

export default AppClientLayout;
