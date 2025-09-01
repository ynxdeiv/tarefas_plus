import Image from "next/image";
import heroImg from "../../public/Hero_Image.png";
import { Metadata } from "next";



export default function Home() {
  const randomNumber = (): number => {
    const min: number = 5;
    const max: number = 20;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (

    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="flex flex-col items-center text-center gap-4 max-w-4xl mx-auto">
        <Image
          src={heroImg}
          alt="Hero Image"
          priority
          className="mb-4 w-auto h-auto md:max-w-lg lg:max-w-xl"
        />
        <h1 className="text-xl md:text-4xl font-bold leading-tight text-black typing-effect">
          Sistema feito para você organizar seus estudos e tarefas
        </h1>
        <section className="flex flex-col sm:flex-row gap-2 md:gap-4">
          <article className="w-full sm:w-48 text-white border rounded-lg p-2 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 hover:scale-105 transition-transform duration-300">
            + {randomNumber()} mil posts
          </article>
          <article className="w-full text-white sm:w-48 border rounded-lg p-2 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 hover:scale-105 transition-transform duration-300">
            + {randomNumber()} mil comentários
          </article>
        </section>
      </div>
    </main>
  );
}