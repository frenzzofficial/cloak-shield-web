interface LayoutProps<_T> {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
