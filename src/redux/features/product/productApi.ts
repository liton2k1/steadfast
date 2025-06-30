import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => "/categories",
        }),

        getProducts: builder.query({
            query: () => "/shop/products",
        }),

        getProductById: builder.query({
            query: (slug: string) => `/product/${slug}`,
        }),

    })
})

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductByIdQuery } = productApi;