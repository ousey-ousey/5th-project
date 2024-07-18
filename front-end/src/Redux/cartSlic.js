import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsID: localStorage.getItem("selectedProductsID")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};

const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productwithquantity = { ...action.payload, Quantity: 1 };
      state.selectedProducts.push(productwithquantity);
      state.selectedProductsID.push(action.payload.id);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    increaseQuantity: (state, action) => {
      const icreased = state.selectedProducts.find(
        (item) => item.id === action.payload.id
      );
      if (icreased) {
        icreased.Quantity += 1;
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    decreaseQuantity: (state, action) => {
      const decreased = state.selectedProducts.find(
        (item) => item.id === action.payload.id
      );
      if (decreased) {
        decreased.Quantity -= 1;
        if (decreased.Quantity === 0) {
          state.selectedProducts = state.selectedProducts.filter(
            (item) => item.id !== action.payload.id
          );
          state.selectedProductsID = state.selectedProductsID.filter(
            (item) => item !== action.payload.id
          );
        }
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    deleteProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== action.payload.id
      );
      state.selectedProductsID = state.selectedProductsID.filter(
        (item) => item !== action.payload.id
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
  },
});

export const { deleteProduct, increaseQuantity, decreaseQuantity, addProduct } =
  selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;
