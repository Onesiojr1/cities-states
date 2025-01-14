import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import CityHomePage from "./city/page";
import NoLogged from "./components/NoLogged";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <>{!session ? <NoLogged /> : <CityHomePage session={session} />}</>;
}
