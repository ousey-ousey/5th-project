import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { ONEproducts, productsApi } from "./productsApi";
import selectedProductsSlice from "./cartSlic";
export const store = configureStore({
  reducer: {
    cart: selectedProductsSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [ONEproducts.reducerPath]: ONEproducts.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(ONEproducts.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
