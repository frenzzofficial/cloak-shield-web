import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
