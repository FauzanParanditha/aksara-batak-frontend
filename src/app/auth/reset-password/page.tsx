import { Suspense } from "react";
import ResetPasswordPage from "./resetPassword";

export const metadata = {
  title: "Verify Email | Page",
};

export default function ResetPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <ResetPasswordPage />
    </Suspense>
  );
}
