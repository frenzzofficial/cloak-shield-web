import { Suspense } from "react";
import SignupForm from "./SignupForm";

const SignUpPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
};

export default SignUpPage;
