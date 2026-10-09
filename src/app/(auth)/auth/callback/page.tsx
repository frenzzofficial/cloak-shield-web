import { Suspense } from "react";
import OAuthCallback from "@/components/features/auth/social/OAuthCallback";

const OAuthCallbackPage = () => {
  return (
    <main className="form-page">
      <div className="form-page__container">
        <Suspense fallback={null}>
          <OAuthCallback />
        </Suspense>
      </div>
    </main>
  );
};

export default OAuthCallbackPage;
