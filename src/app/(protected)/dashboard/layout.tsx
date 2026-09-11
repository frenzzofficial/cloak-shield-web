interface LayoutProps<_T> {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10">{children}</div>;
};

export default DashboardLayout;
