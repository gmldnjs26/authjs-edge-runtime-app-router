"use client";

import { login } from "@/app/_authAction";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <label>
        メールアドレス:
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        パスワード:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="inline-block" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}
