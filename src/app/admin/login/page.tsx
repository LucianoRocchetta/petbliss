"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (!result?.error) {
      router.push("/admin");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h2 className="text-3xl font-bold">Panel de control</h2>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col w-1/4 text-zinc-800">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded-2xl w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded-2xl w-full"
        />
        <button type="submit" className="mt-5 p-2 bg-blue-500 text-zinc-200 rounded-2xl">
          Login
        </button>
      </form>
    </div>
  );
}
