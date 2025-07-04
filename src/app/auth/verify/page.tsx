import { Suspense } from "react";
import VerifyPage from "./verifyPage";

export const metadata = {
  title: "Verify Email | Page",
};

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <VerifyPage />
    </Suspense>
  );
}
