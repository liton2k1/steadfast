"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiSearch } from "react-icons/fi";

export function Search() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiSearch className="text-2xl" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <div className="flex items-center w-full bg-white rounded-md overflow-hidden shadow-sm border mt-3">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-teal-500 hover:bg-teal-600 p-2">
              <FiSearch className="text-white text-xl" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
