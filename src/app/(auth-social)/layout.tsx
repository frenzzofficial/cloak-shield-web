interface LayoutProps<_T> {
  children: React.ReactNode;
}

const SignInSocialLayout = ({ children }: LayoutProps<"/">) => {
  return <> {children}</>;
};

export default SignInSocialLayout;
