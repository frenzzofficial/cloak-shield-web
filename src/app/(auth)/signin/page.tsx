import { Suspense } from "react";
import GuestOnly from "@/components/features/auth/guards/GuestOnly";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <GuestOnly>
            <SignInForm />
          </GuestOnly>
        </Suspense>
      </div>
    </main>
  );
};

export default SignInPage;
