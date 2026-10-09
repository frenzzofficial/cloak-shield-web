import { Suspense } from "react";
import VerifyEmail from "./VerifyEmail";

const VerifyEmailPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <VerifyEmail />
        </Suspense>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
