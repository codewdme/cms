import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { stopLoadingTransition } from "./loadingTransitionSlice";

interface Car {
  id: string;
  carType: string;
  brand: string;
  carModel: string;
  price: number;
  regYear: number;
  kmsDriven: number;
  regState: string;
  fuelType: string;
  listingDate: Date;
  images: object[]; // Array of strings
  specs: {
    engine: string;
    transmission: string;
    ownership: string;
    peakTorque: string;
    peakPower: string;
    doors: string;
    drive: string;
    seatingCapacity: string;
    manufacturingYear: number;
  };
  isBooked: boolean;
  isSold: boolean;
  isCarNew: boolean;
  soldTo: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    removeCar: (state, action: PayloadAction<Car>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload.id);
    },
    updateCarData: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex((car) => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
    },
    updateCarBookingStatus: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex((car) => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = {
          ...state.cars[index],
          isBooked: action.payload.isBooked,
        };
      }
    },
    updateCarSoldStatus: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex((car) => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = {
          ...state.cars[index],
          isSold: action.payload.isSold,
        };
      }
    },
  },
});

export const {
  addCar,
  removeCar,
  updateCarSoldStatus,
  updateCarBookingStatus,
  setCars,
  updateCarData,
} = carSlice.actions;

export const fetchCars =
  (
    filterQueries: {
      regYear: any;
      brand: any;
      isCarNew: any;
      kmsDriven: any;
      price: any;
      carType: any;
    } = {
      regYear: "",
      kmsDriven: "",
      price: "",
      carType: "",
      brand: "",
      isCarNew: "",
    }
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch("/api/fetch-cars-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterQueries),
      });
      const data = await response.json();
      dispatch(setCars(data.cars));
      dispatch(stopLoadingTransition(""));
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

export default carSlice.reducer;
