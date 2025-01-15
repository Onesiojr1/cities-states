import Link from "next/link";
import Main from "./main";

export default function NoLogged() {
  return (
    <Main>
      <div className="flex flex-col items-center">
      <h1 className="text-5xl leading-none my-12 uppercase">Você não está logado</h1>
      <p className="text-3xl leading-tight mb-12 text-zinc-300">Faça login para continuar ou crie sua conta</p>
      <Link className="bg-blue-500 text-white p-2 rounded my-2" href="/api/auth/signin">Login</Link>
      {/* <Link className="bg-green-500 text-white p-2 rounded" href="/auth/register">Cadastrar</Link> */}
      </div>
    </Main>
  )
}