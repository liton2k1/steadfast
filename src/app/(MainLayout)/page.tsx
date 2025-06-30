"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/types";
import { TbCurrencyTaka } from "react-icons/tb";

const Page = () => {
  const { data, error, isLoading } = useGetProductsQuery(undefined);
  const products = data?.data;

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {products?.map((product: IProduct) => (
          <div
            key={product.id}
            className="border rounded-md p-5 shadow-sm bg-white"
          >
            <div className="w-full h-48 relative mb-3">
              <Image
                src={product.thumbnail || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            <h2 className="font-semibold text-md mb-1">
              {product?.name?.length > 25
                ? product.name.slice(0, 25) + "..."
                : product.name}
            </h2>

            <div className="mb-2 flex items-center gap-2">
              <p className="text-sm text-gray-500 line-through flex items-center">
                <TbCurrencyTaka size={20} />
                {Number(product.regular_price).toLocaleString("en-BD")}
              </p>

              <p className="text-sm text-teal-600 font-semibold flex items-center">
                <TbCurrencyTaka size={20} />
                {Number(product.discount_price).toLocaleString("en-BD")}
              </p>
            </div>

            <Link href={`/product/${product.slug}`}>
              <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition text-sm font-medium cursor-pointer">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Page;
