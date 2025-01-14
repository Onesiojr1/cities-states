"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="ml-auto h-full flex items-center justify-center">
      <span className="text-xl mr-6">{session.user.email}</span>
      <Link className="bg-red-500 text-white p-2 rounded" href={"/api/auth/signout"}>Sair</Link>
    </div>
    );

  return (
    <div className="ml-auto h-full flex items-center justify-center">
      <Link className="text-2xl mr-6" href={"/api/auth/signin"}>
        Login
      </Link>
      {/* <Link className="bg-green-500 text-white p-2 rounded" href={"/signup"}>Cadastrar</Link> */}
    </div>
  );
};

export default SignInButton;
