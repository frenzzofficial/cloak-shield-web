import type { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div className="dark bg-background text-foreground"> {children}</div>;
};

export default PublicLayout;
