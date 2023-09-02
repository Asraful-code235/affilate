import { Input } from "../../components/ui/input";
import { Textarea } from "../..//components/ui/textarea";
import { Button } from "../ui/button";
import { cn } from "../..//lib/utils";

export default function Footer() {
  return (
    <footer className=" bg-sky-800 text-white mt-8">
      <div className="flex  flex-wrap gap-8 max-w-7xl mx-auto items-start justify-between py-4 px-4 md:px-8">
        <div className="max-w-sm text-center mx-auto space-y-2">
          {/* <h1>Hotel Mark</h1> */}
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying In publishing and graphic design,
          </p>
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
