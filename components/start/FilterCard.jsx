"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "../..//components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

export function FilterCard() {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  return (
    <section className="grid md:sticky md:top-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6 px-4 md:px-8 bg-white md:-mt-24 z-50 border border-transparent rounded-md shadow-md">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select State here" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select City here" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-w-full">
          <SelectValue placeholder="Select Number of guest" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !checkIn && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkIn ? format(checkIn, "PPP") : <span>Check In</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkIn}
            onSelect={setCheckIn}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !checkOut && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkOut ? format(checkOut, "PPP") : <span>Check Out</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkOut}
            onSelect={setCheckOut}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant={"outline"}
        className={cn(
          "w-[240px] justify-center text-left font-normal bg-sky-800 text-white"
        )}
      >
        Search Now
      </Button>
    </section>
  );
}
