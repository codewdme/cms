import { Action, configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import selectedCarsReducer from "./selectedCarSlice";
import loadingTransitionReducer from "./loadingTransitionSlice";
import { ThunkAction, thunk } from "redux-thunk";

export const makeStore = () => {
  return configureStore({
    reducer: {
      car: carReducer,
      selectedCars: selectedCarsReducer,
      loadingTransition: loadingTransitionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
