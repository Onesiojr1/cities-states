import Link from "next/link";
import Container from "./Container";


export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-transparent-white backdrop-blur-[12px]">
      <Container className="flex justify-center h-20 gap-5">
        <Link className="flex items-center text-xl" href="/city">
          <span className="text-white font-extrabold">Cidades</ span>
        </Link>
        <Link className="flex items-center text-xl" href="/state">
          <span className="text-white font-extrabold">Estados</ span>
        </Link>
      </Container>
    </header>
  );
}