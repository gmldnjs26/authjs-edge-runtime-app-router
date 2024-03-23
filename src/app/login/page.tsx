"use client";

import { login } from "@/app/_authAction";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(
        {
          email,
          password,
        },
        "credentials"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <label>
        メールアドレス:
        <input
          className="text-black"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        パスワード:
        <input
          className="text-black"
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
