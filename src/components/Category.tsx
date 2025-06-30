/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCategoriesQuery } from "@/redux/features/product/productApi";
import { FiMenu } from "react-icons/fi";

export function Category() {
  const { data, isLoading, error } = useGetCategoriesQuery(undefined);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FiMenu className="text-lg text-teal-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>All Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isLoading && <DropdownMenuItem disabled>Loading...</DropdownMenuItem>}

        {error && <DropdownMenuItem disabled>Failed to load</DropdownMenuItem>}

        {data?.data?.map((category: any) => (
          <DropdownMenuItem key={category.id}>{category.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
