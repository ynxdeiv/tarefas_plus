import Image from "next/image";
import heroImg from "../../public/Hero_Image.png";
import { Metadata } from "next";
import Link from "next/link";

export default function Home() {
  const randomNumber = (): number => {
    const min: number = 5;
    const max: number = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100">
      <section className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Sistema feito para você
            <span className="block text-slate-600 mt-2">
              organizar suas
              <span className="text-transparent bg-gradient-to-r from-slate-700 via-blue-700 to-slate-600 bg-clip-text"> tarefas</span>
            </span>
          </h1>
          <div className="relative max-w-4xl mx-auto flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-blue-400/20 rounded-3xl blur-3xl transform rotate-6"></div>
            <Image
              src={heroImg}
              alt="Tarefas Plus - Sistema de Gerenciamento"
              priority
            />
          </div>
        </div>
      </section>



    </main>
  );
}