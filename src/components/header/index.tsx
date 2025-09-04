'use client'
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX, HiOutlineUser, HiOutlineLogout, HiOutlineChartBar } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
export default function Header() {
    const [isMenu, setIsMenu] = useState(false)
    const { data: session, status } = useSession()
    
    return (
        <header className="bg-slate-50/95 backdrop-blur-sm   p-4 sticky top-0 z-50">
            <section className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <span className="text-xl md:text-2xl text-slate-800 font-bold group-hover:text-slate-600 transition-colors">
                        Tarefas <span className="text-slate-700">Plus</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-4">
                    {session?.user && (
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors group">
                            <HiOutlineChartBar className="w-4 h-4 text-slate-600 group-hover:text-slate-700" />
                            <span className="text-slate-700 group-hover:text-slate-800 font-medium">
                                Dashboard
                            </span>
                        </Link>
                    )}
                    
                    {status === 'loading' ? (
                        <div className="w-8 h-8 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : session ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                                <HiOutlineUser className="w-4 h-4 text-slate-600" />
                                <span className="text-slate-700 font-medium text-sm">{session?.user?.name?.split(' ')[0]}</span>
                            </div>
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors"
                                onClick={() => signOut()}
                            >
                                <HiOutlineLogout className="w-4 h-4" />
                                <span className="text-sm">Sair</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                            onClick={() => signIn('google')}
                        >
                            <span>Entrar</span>
                        </button>
                    )}
                </nav>

                <button 
                    className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsMenu(!isMenu)}
                >
                    {isMenu ? (
                        <HiOutlineX className="w-6 h-6 text-slate-700" />
                    ) : (
                        <HiOutlineMenu className="w-6 h-6 text-slate-700" />
                    )}
                </button>

                {isMenu && (
                    <>
                        <div 
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMenu(false)}
                        ></div>
                        <nav className="fixed top-20 right-4 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 md:hidden animate-in slide-in-from-right-2 duration-200">
                            <div className="space-y-4">
                                {session?.user && (
                                    <Link 
                                        href="/dashboard" 
                                        onClick={() => setIsMenu(false)}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                    >
                                        <HiOutlineChartBar className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
                                        <span className="text-slate-700 group-hover:text-slate-800 font-medium">
                                            Dashboard
                                        </span>
                                    </Link>
                                )}
                                
                                {status === 'loading' ? (
                                    <div className="flex justify-center p-4">
                                        <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : session ? (
                                    <>
                                        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-xl">
                                            <HiOutlineUser className="w-5 h-5 text-slate-700" />
                                            <span className="text-slate-800 font-medium">
                                                {session?.user?.name}
                                            </span>
                                        </div>
                                        <button
                                            className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors"
                                            onClick={() => {
                                                signOut();
                                                setIsMenu(false);
                                            }}
                                        >
                                            <HiOutlineLogout className="w-5 h-5" />
                                            <span>Sair</span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="flex items-center gap-3 w-full p-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                                        onClick={() => {
                                            signIn('google');
                                            setIsMenu(false);
                                        }}
                                    >
                                        <span>Entrar com Google</span>
                                    </button>
                                )}
                            </div>
                        </nav>
                    </>
                )}
            </section>
        </header>
    );
}