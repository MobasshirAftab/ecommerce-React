import { createSlice } from "@reduxjs/toolkit";

// Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Products Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        createProduct: (state, action) => {
            state.products.push(action.payload);
        }
    }
});

export const { createProduct } = productsSlice.actions;

// Combine Reducers
const rootReducer = {
    products: productsSlice.reducer,
    cart: cartSlice.reducer
};

export default rootReducer;
