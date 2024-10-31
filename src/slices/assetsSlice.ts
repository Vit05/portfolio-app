import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAssets} from "../api/api";
import {Asset} from "../types/Asset";

interface AssetsState {
    items: Asset[];
    loading: boolean;
    error: string | null;
}

const initialState: AssetsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async () => {
    const response = await getAssets();
    return response;
});

const assetsSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch assets";
            });
    },
});

export default assetsSlice.reducer;
