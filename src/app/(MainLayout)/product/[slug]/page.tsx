/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";
import Container from "@/components/Container";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosHeartEmpty } from "react-icons/io";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} from "@/redux/features/product/productApi";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";
import type { CartItem, IProductDetail } from "@/types/types";
import { FiBox } from "react-icons/fi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(slug as string);
  const product = data?.data as IProductDetail;
  const [categoryName, setCategoryName] = useState<string>("");
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const dispatch = useAppDispatch();

  const { data: categoriesData } = useGetCategoriesQuery(undefined);

  useEffect(() => {
    const found = categoriesData?.data?.find(
      (cat: any) => cat.id === product?.category_id
    );
    if (found) setCategoryName(found.name);
  }, [categoriesData, product]);

  const handleAddToCart = () => {
    if (!product) return;
    const variation = product.variations?.[0];

    const newItem: CartItem = {
      id: product.id,
      title: product.name,
      price: Number(product.product_detail.discount_price),
      originalPrice: Number(product.product_detail.regular_price),
      image: product.thumbnail,
      quantity,
      variationId: variation?.id || null,
      color: variation?.color || null,
      size: variation?.size || null,
      sku: variation?.sku || null,
    };

    dispatch(addToCart(newItem));
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error || !product)
    return <p className="text-center text-red-500">Failed to load product</p>;

  const images = [
    ...(product.image
      ? Object.values(product.image).map((img) => ({ src: img.url }))
      : []),
    ...(product.variations?.map((v) => ({ src: v.image })) || []),
  ];

  const variation = product.variations?.[0];
  const rating = product.rating_avg || 0;
  const availableStock = variation?.total_stock_qty || 0;

  return (
    <div className="mt-10">
      <Container>
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${product.category_id}`}>
                  {categoryName || "Category"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-gray-500" asChild>
                <Link href="#">{product.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <ImageGallery
              items={images.map((img) => ({
                original: img.src,
                thumbnail: img.src,
              }))}
              showPlayButton={false}
              showNav={false}
              showFullscreenButton={false}
              renderItem={(item) => (
                <div className="w-full flex justify-center items-center border rounded-md">
                  <Image
                    src={item.original}
                    alt="product image"
                    width={200}
                    height={200}
                    className="w-full p-2"
                  />
                </div>
              )}
              renderThumbInner={(item) => (
                <div className="overflow-hidden mx-1 border rounded-md mt-3">
                  <Image
                    src={item.thumbnail || "/placeholder.png"}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    className="w-full h-16 p-2"
                  />
                </div>
              )}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center justify-between text-yellow-500">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                  {rating.toFixed(1)}
                </span>
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      fill={idx < rating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </span>
                <span className="text-gray-500">({product.rating_count})</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <IoIosHeartEmpty size={24} />
                <IoShareSocialOutline size={24} />
              </div>
            </div>

            <div className="flex items-center text-xl font-bold text-green-600">
              <span className="flex items-center">
                <TbCurrencyTaka size={28} />
                {Number(product.product_detail.discount_price).toLocaleString(
                  "en-BD"
                )}
              </span>
              <span className="flex items-center text-sm text-gray-400 line-through ml-2">
                <TbCurrencyTaka size={20} />
                {Number(product.product_detail.regular_price).toLocaleString(
                  "en-BD"
                )}
              </span>
            </div>

            <span
              className={`text-sm inline-block px-2 py-1 rounded text-white ${
                availableStock > 0 ? "bg-orange-500" : "bg-red-500"
              }`}
            >
              {availableStock > 0
                ? `Available Stock: ${availableStock}`
                : "Out of Stock"}
            </span>

            {variation && (
              <p className="text-sm text-gray-600">
                SKU: <span className="font-bold">{variation.sku}</span>
              </p>
            )}

            {availableStock > 0 && (
              <div className="mt-4">
                <p className="font-medium mb-1">Quantity</p>
                <div className="flex items-center gap-3 border w-max p-1 rounded-full bg-white">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 flex items-center justify-center text-xl text-gray-600 bg-gray-100 rounded-full cursor-pointer"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center font-medium text-sm">
                    {quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(prev + 1, availableStock))
                    }
                    className="w-6 h-6 flex items-center justify-center text-xl text-gray-600 bg-gray-100 rounded-full cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={availableStock === 0}
              className={`mt-5 w-full py-1.5 rounded font-semibold text-white cursor-pointer ${
                availableStock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Add to Cart
            </button>
          </div>

          <div>
            <div className="border p-5 rounded-md">
              <p className="font-semibold mb-2">Delivery Options</p>
              <p className="flex items-center">
                <FiBox className="mr-2 text-teal-500" /> Regular —{" "}
                <TbCurrencyTaka size={16} />
                {variation?.id_delivery_fee || 60}
              </p>
              <p className="flex items-center">
                <FiBox className="mr-2" /> Express —{" "}
                <TbCurrencyTaka size={16} />
                {variation?.ed_delivery_fee || 150}
              </p>
              <div className="mt-4 border-t pt-4">
                <p className="font-semibold">
                  Merchant ID: {product.merchant_id}
                </p>
                <p className="text-sm text-gray-500">
                  Product Type ID: {product.product_type_id}
                </p>
                <p className="text-sm text-gray-500">
                  Category ID: {product.category_id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Description */}
      <div className="bg-[#f6f8fa] p-5 pb-10 mt-10">
        <div className="max-w-[995px] mt-10 space-y-6">
          {product.description && (
            <div className="bg-white p-5 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-700 line-clamp-4">
                {showMoreDescription
                  ? product.description
                  : product.description.slice(0, 300)}
              </p>
              {product.description.length > 300 && (
                <div className="flex justify-center text-center mt-4">
                  <button
                    onClick={() => setShowMoreDescription((prev) => !prev)}
                    className="text-sm text-gray-600 hover:underline flex items-center justify-center gap-1"
                  >
                    {showMoreDescription ? "See Less" : "See More"}{" "}
                    <IoIosArrowDown />
                  </button>
                </div>
              )}
            </div>
          )}

          {(product.sku || product.barcode || product.brand_id) && (
            <div className="bg-white p-5 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Specification</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {product.sku && <li>SKU: {product.sku}</li>}
                {product.barcode && <li>Barcode: {product.barcode}</li>}
                {product.brand_id && <li>Brand ID: {product.brand_id}</li>}
                {product.id && <li>Product ID: {product.id}</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
