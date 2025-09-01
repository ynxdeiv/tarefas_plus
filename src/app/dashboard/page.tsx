'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";



export default function Dashboard() {




  const { data: session } = useSession();


  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Olá</h1>
      <p>Bem-vindo ao seu dashboard!</p>
      <Link href="/">Voltar para home</Link>
    </div>
  );
}
