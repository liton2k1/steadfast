
export interface IProduct {
    slug: string;
    id: number;
    name: string;
    thumbnail: string;
    regular_price: number;
    discount_price: number;
    product_detail?: {
        regular_price: string;
        discount_price: string;
    };
}


export interface IProductDetail {
    id: number;
    name: string;
    thumbnail: string;
    sku: string;
    barcode: string;
    brand_id: number;
    product_type_id: number;
    category_id: number;
    merchant_id: number;
    rating_avg: number;
    rating_count: number;
    description: string;
    product_detail: {
        regular_price: string;
        discount_price: string;
    };
    image?: Record<string, { url: string }>;
    variations?: IVariation[];
}

export interface IVariation {
    sku: string;
    image: string;
    id_delivery_fee: number;
    ed_delivery_fee?: number;
    total_stock_qty: number;
    color: string;
    size: string;
    id: number;

}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    subcategories?: {
        id: number;
        name: string;
        slug: string;
        image: string;
        subchilds?: {
            id: number;
            name: string;
            slug: string;
            image: string;
        }[];
    }[];
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    image: string;
    quantity: number;
    sku?: string | null;
    variationId?: number | null;
    color?: string | null;
    size?: string | null;

}

export interface CartState {
    items: CartItem[];
}
