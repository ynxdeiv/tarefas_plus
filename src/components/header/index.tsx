'use client'
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Header() {
    const { data: session, status } = useSession()
    return (
        <header className="bg-white p-4 ">
            <section className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <span className="text-xl md:text-2xl text-black font-bold">
                        Tarefas <span className="text-blue-600">Plus</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {session?.user && (
                        <Link href="/dashboard">
                            <span className="hover:text-blue-600 text-black transition-colors">
                                Meu painel
                            </span>
                        </Link>
                    )}
                    {status === 'loading' ? (
                        <></>
                    ) : session ? (
                        <>
                            <div className="flex items-center gap-3">
                                <button
                                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
                                >
                                    Olá, {session?.user?.name}
                                </button>
                                <button
                                    className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
                                    onClick={() => signOut()}
                                >
                                    Sair
                                </button>
                            </div>
                        </>


                    ) : (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => signIn('google')}
                        >
                            Acessar
                        </button>
                    )}

                </nav>

                <button className="md:hidden bg-black p-2 text-xl hover:text-blue-600">
                    <HiMenu />
                </button>
            </section>
        </header>
    );
}