"use client";
import Image from "next/image";
import { FadeIn } from "../FadeIn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getLogo() {
  const res = await axios.get("/api/logo/getLogo");
  return (await res).data;
}
export default function Hero() {
  const {
    data: states,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newdata"],
    queryFn: getLogo,
    keepPreviousData: true,
  });
  console.log(states);
  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <section className="w-full h-full relative">
      <FadeIn className="absolute inset-0 bg-black bg-opacity-40 ">
        <div className="flex flex-col gap-8 h-full items-center justify-center">
          <h1 className="font-bold text-white text-3xl lg:text-5xl leading-7 max-w-2xl mx-auto text-center">
            {(states?.logo && states?.logo[0]?.herotext) || ""}
          </h1>

          <p className="font-bold text-white text-opacity-60 text-lg lg:text-2xl text-center">
            {(states?.logo && states?.logo[0]?.herosubtext) || ""}
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
