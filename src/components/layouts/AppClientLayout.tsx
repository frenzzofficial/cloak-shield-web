import type React from "react";
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
    </AuthProvider>
  );
};

export default AppClientLayout;
