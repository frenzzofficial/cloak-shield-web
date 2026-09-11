interface LayoutProps<_T> {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  return <> {children}</>;
};

export default ProtectedLayout;
