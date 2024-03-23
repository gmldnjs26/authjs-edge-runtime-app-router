"use client";

import { useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session, status } = useSession();
  return <div>MyPage</div>;
}
