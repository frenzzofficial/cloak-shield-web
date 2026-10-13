import { Suspense } from "react";
import ConfirmEmailChange from "./ConfirmEmailChange";

const ConfirmEmailChangePage = () => (
  <main className="form-page">
    <div className="form-page__container">
      <Suspense fallback={null}>
        <ConfirmEmailChange />
      </Suspense>
    </div>
  </main>
);

export default ConfirmEmailChangePage;
