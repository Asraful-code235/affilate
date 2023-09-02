"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getLogo() {
  const res = await axios.get("/api/city/getCity");
  return (await res).data;
}

export default function Header() {
  const {
    data: states,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["logo"],
    queryFn: getLogo,
    keepPreviousData: true,
  });

  if (isLoading) return "";
  if (isError) return "Something went wrong";

  return (
    <header className="w-full bg-sky-800  text-white py-8 flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        {states?.logo ? states?.logo.name : "Hotel mark"}
      </h1>
    </header>
  );
}
