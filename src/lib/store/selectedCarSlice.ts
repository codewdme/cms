import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Car {
  id: string;
  carType: string;
  carModel: string;
  price: number;
  regYear: number;
  kmsDriven: number;
  regState: string;
  fuelType: string;
  listingDate: Date;
  images: {
    frontView: object;
  };
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
  isNew: boolean;
  soldTo: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const selectedCarSlice = createSlice({
  name: "selectedCar",
  initialState,
  reducers: {
    addToSelectedCars: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    clearSelectedCar: (state, action: PayloadAction<Car>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload.id);
    },
    resetSelectedCars: (state, action) => {
      state.cars = [];
    },
  },
});

export const { addToSelectedCars, clearSelectedCar, resetSelectedCars } =
  selectedCarSlice.actions;
export default selectedCarSlice.reducer;
