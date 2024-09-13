import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { User } from "../types"

interface Users {
    data: User[],
    loading: boolean,
    error: string | null
}

const initialState: Users = {
    data: [],
    loading: false,
    error: ""
}

export const getUsers = createAsyncThunk("users", async()=>{
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(getUsers.pending,(state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
                state.data = [];
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default usersSlice.reducer;