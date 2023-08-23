import Blogs from "../components/start/Blogs";
import { FilterCard } from "../components/start/FilterCard";
import Hero from "../components/start/Hero";

export default async function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between gap-8 ">
      <Hero />
      <FilterCard />
      <Blogs />
    </section>
  );
}
