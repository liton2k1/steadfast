import { CartItem, CartState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = (): CartItem[] => {
    if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch {
                return [];
            }
        }
    }
    return [];
};

const saveCartToLocalStorage = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(items));
    }
};

const initialState: CartState = {
    items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            saveCartToLocalStorage(state.items);
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.variationId === action.payload.variationId
            );
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            saveCartToLocalStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            saveCartToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToLocalStorage(state.items);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; type: "inc" | "dec" }>
        ) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity =
                    action.payload.type === "inc"
                        ? item.quantity + 1
                        : Math.max(1, item.quantity - 1);
            }
            saveCartToLocalStorage(state.items);
        },
    },
});

export const {
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
