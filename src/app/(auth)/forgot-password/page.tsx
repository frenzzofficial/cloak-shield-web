import { Suspense } from "react";
import GuestOnly from "@/components/features/auth/guards/GuestOnly";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <GuestOnly>
            <ForgotPasswordForm />
          </GuestOnly>
        </Suspense>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
