import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Filter, User } from "../types"

interface UsersState {
    data: User[],
    loading: boolean,
    error: string | null,
    usersSearchValue: string,
    usersFilter: Filter,
    filteredData: User[]
}

const initialState: UsersState = {
    data: [],
    loading: false,
    error: "",
    usersSearchValue: "",
    usersFilter: Filter.name,
    filteredData: []
}

export const getUsers = createAsyncThunk<User[]>("users", async () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserSearchValue: (state, action: PayloadAction<string>) => {
            state.usersSearchValue = action.payload;
        },

        setFilterValue: (state, action: PayloadAction<Filter>) => {
            state.usersFilter = action.payload;
        },

        setFilteredData: (state) => {
            state.filteredData = state.data.filter((user) => {
                const fieldValue = user[state.usersFilter as keyof User];
                if (typeof fieldValue === 'string') {
                    return fieldValue.toLowerCase().includes(state.usersSearchValue.toLowerCase());
                }
                return false;
            });
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.filteredData = action.payload;
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

export const { setUserSearchValue, setFilterValue, setFilteredData} = usersSlice.actions;

export default usersSlice.reducer;