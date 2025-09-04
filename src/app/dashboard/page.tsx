'use client'
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { TaskProps } from "../interface";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard() {
  const [input, setInput] = useState('')
  const [publicTask, setPublicTask] = useState(false)
  const [task, setTask] = useState<TaskProps[]>([]);
  const { data: session } = useSession();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (input === '') return;

    try {
      await addDoc(collection(db, 'tarefas'), {
        tarefa: input,
        created: new Date(),
        user: session?.user?.email ?? '',
        public: publicTask
      });
      setInput('');
      setPublicTask(false);
      toast.success('Tarefa registrada com sucesso!');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao registrar tarefa!');
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteDoc(doc(db, 'tarefas', id));
      toast.success('Tarefa deletada com sucesso!');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao deletar tarefa!');
    }
  }

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked)
  }
  useEffect(() => {
    async function loadTask() {
      if (!session?.user?.email) return;
      
      
      const taskRef = collection(db, 'tarefas')
      const q = query(
        taskRef,
        where('user', '==', session?.user?.email)
      )
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const lista = [] as TaskProps[];
        snapshot.forEach((doc) => {;
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            user: doc.data().user,
            public: doc.data().public,
            created: doc.data().created
          })
        })
        setTask(lista);
      })
      
      return () => unsubscribe();
    }
    loadTask()
  }, [session])

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Dashboard de Tarefas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Nova Tarefa</h2>
            <form className="bg-slate-800 p-8 rounded-xl shadow-lg h-fit" onSubmit={handleRegister}>
              <Textarea
                placeholder='Digite qual sua tarefa'
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                value={input}
              />
              <div className="flex items-center gap-2 w-full mt-4 mb-6">
                <input type="checkbox" id="public-task" className="accent-slate-600"
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label htmlFor="public-task" className="text-white">Deixar tarefa pública?</label>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md text-lg"
              >
                Registrar Tarefa
              </button>
            </form>
          </div>


          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Minhas Tarefas ({task.length})</h2>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 min-h-[500px] border border-slate-200/50">
              {task.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-lg font-medium text-slate-700">Nenhuma tarefa encontrada</p>
                  <p className="text-sm text-slate-600">Crie sua primeira tarefa ao lado!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {task.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 p-4 rounded-lg hover:shadow-md transition-shadow border-l-4 border-l-slate-600 bg-white/60 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          item.public ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {item.public ? '🌐 Pública' : '🔒 Privada'}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                          title="Deletar tarefa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-slate-800 mb-2 font-medium">{item.tarefa}</p>
                      
                      <div className="text-xs text-slate-500">
                        📅 {item.created && (
                          typeof item.created === 'object' && 'toDate' in item.created ? 
                            new Date((item.created as { toDate: () => Date }).toDate()).toLocaleDateString('pt-BR') :
                            new Date(item.created).toLocaleDateString('pt-BR')
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
