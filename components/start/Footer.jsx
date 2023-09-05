"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getLogo() {
  const res = await axios.get("/api/logo/getLogo");
  return (await res).data;
}
export default function Footer() {
  const {
    data: states,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["footerdata"],
    queryFn: getLogo,
    keepPreviousData: true,
  });
  console.log(states);
  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <footer className=" bg-sky-800 text-white mt-8">
      <div className="flex  flex-wrap gap-8 max-w-7xl mx-auto items-start justify-between py-4 px-4 md:px-8">
        <div className="max-w-sm text-center mx-auto space-y-2">
          {/* <h1>Hotel Mark</h1> */}
          <p>{states?.logo ? states?.logo[0]?.footertext : ""}</p>
        </div>
        {/* <div className="flex flex-col gap-2">
          <Input type="email" placeholder="Email" />
          <Textarea placeholder="Type your message here." />
          <Button
            variant={"outline"}
            className={cn("w-[240px] justify-center text-left font-normal")}
          >
            Send
          </Button>
        </div> */}
      </div>
    </footer>
  );
}
