import Blogs from "../components/start/Blogs";
import Hero from "../components/start/Hero";

export default async function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between gap-8 bg-slate-50">
      <Hero />
      <Blogs />
    </section>
  );
}
