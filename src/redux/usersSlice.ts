import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterType, User } from "../types";

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  usersSearchValue: string;
  filterType: FilterType;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: "",
  usersSearchValue: "",
  filterType: FilterType.name,
};

export const getUsers = createAsyncThunk<User[]>(
  "users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserSearchValue: (state, action: PayloadAction<string>) => {
      state.usersSearchValue = action.payload;
    },

    setFilterType: (state, action: PayloadAction<FilterType>) => {
      state.filterType = action.payload;
    },

    setFilteredUsers: (state) => {
      state.filteredUsers = state.users.filter((user) => {
        const fieldValue = user[state.filterType];

        return fieldValue
          .toLowerCase()
          .includes(state.usersSearchValue.toLowerCase());
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users = [];
        state.loading = false;
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const { setUserSearchValue, setFilterType, setFilteredUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
