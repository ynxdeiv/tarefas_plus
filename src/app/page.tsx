import Image from "next/image";
import heroImg from "../../public/Hero_Image.png";

export default function Home() {
  const randomNumber = (): number => {
    const min: number = 5;
    const max: number = 20;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="flex flex-col items-center text-center gap-4">
        <Image
          src={heroImg}
          alt="Hero Image"
          priority
          className="mb-4 max-w-full h-auto"
        />
        <h1 className="text-xl md:text-4xl font-bold leading-tight font-geist-mono">
          Sistema feito para você organizar seus estudos e tarefas
        </h1>
        <section className="flex flex-col sm:flex-row gap-2 text-black">
          <article className="w-full sm:w-48 border bg-white rounded-lg p-2">
            + {randomNumber()} mil posts
          </article>
          <article className="w-full sm:w-48 border bg-white rounded-lg p-2">
            + {randomNumber()} mil comentários
          </article>
        </section>

      </div>
    </main>
  );
}
