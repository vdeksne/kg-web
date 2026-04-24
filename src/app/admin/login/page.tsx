import { Suspense } from "react";
import { AdminLoginClient } from "./login-client";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-zinc-500">
          Loading…
        </div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
