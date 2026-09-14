import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";

export default function NotFound() {
  return (
    <main id="conteudo" className="grid min-h-screen place-items-center bg-aluneri-bg px-6 text-white">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1222cc] p-8 text-center shadow-2xl md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-16 size-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative">
          <AluneriLogo className="mx-auto mb-8 h-auto w-40" />
          <span className="text-xs font-bold uppercase tracking-[.24em] text-blue-300">Erro 404</span>
          <h1 className="mt-4 text-4xl font-bold tracking-[-.05em] md:text-6xl">Essa página não existe.</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            O endereço pode ter mudado ou sido digitado incorretamente. Volte ao portfólio para continuar explorando a ALUNERI.
          </p>
          <Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-300">
            <ArrowLeft /> Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
