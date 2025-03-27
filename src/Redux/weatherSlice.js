import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e1e8e3fac2msh41470a28711cc54p10c93cjsn2cea12f8bffc",
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    return data; 
  }
);

// Weather slice
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
