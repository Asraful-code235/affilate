import Image from "next/image";
import { FadeIn } from "../FadeIn";

export default function Hero() {
  return (
    <section className="w-full h-full relative">
      <FadeIn className="absolute inset-0 bg-black bg-opacity-40 ">
        <div className="flex flex-col gap-8 h-full items-center justify-center">
          <h1 className="font-bold text-white text-3xl lg:text-5xl text-center">
            Hotels with Rooftop
          </h1>
          <h1 className="font-bold text-white text-3xl lg:text-5xl text-center">
            Pool near Hermann Park
          </h1>
          <p className="font-bold text-white text-opacity-60 text-lg lg:text-2xl text-center">
            hotels with rooftop pool near Hermann Park, Houston. Hope you enjoy
            it
          </p>
        </div>
      </FadeIn>
      <img
        width="1000"
        height="700"
        src="/bg.jpeg"
        alt="hero_image"
        className="w-full aspect-[16/9] lg:aspect-[16/7] min-h-[80vh] bg-center object-cover "
      />
    </section>
  );
}
