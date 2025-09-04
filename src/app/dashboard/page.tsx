'use client'
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/textarea";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Dashboard() {

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (input === '') {
      alert('teste')
      return;
    }



  }

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked)
  }

  const [input, setInput] = useState('')
  const [publicTask, setPublicTask] = useState(false)
  const { data: session } = useSession();


  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <main className="min-h-screen  flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl t-bold md:text-6xl text-black mb-8">Qual sua tarefa?</h1>
      <form className="flex flex-col items-center w-full max-w-xl gap-6 bg-gray-900 p-8 rounded-xl shadow-lg" onSubmit={handleRegister}>
        <Textarea
          placeholder='Digite qual sua tarefa'
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
          value={input}
        />
        <div className="flex items-center gap-2 w-full max-w-lg">
          <input type="checkbox" id="public-task" className="accent-blue-500"
            checked={publicTask}
            onChange={handleChangePublic}
          />
          <label htmlFor="public-task" className="text-white">Deixar tarefa pública?</label>
        </div>
        <button
          type="submit"
          className="w-full max-w-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md text-lg"
        >
          Registrar
        </button>
      </form>
    </main>
  );
}
