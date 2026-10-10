import { Suspense } from "react";
import GuestOnly from "@/components/features/auth/guards/GuestOnly";
import SignupForm from "./SignupForm";

const SignUpPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <GuestOnly>
            <SignupForm />
          </GuestOnly>
        </Suspense>
      </div>
    </main>
  );
};

export default SignUpPage;
