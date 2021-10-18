import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        real: "",
        fake: "",
    },
    reducers: {
        setSearch: (state, action) => {
            state.fake = action.payload;
        },
        setReal: (state, action) => {
            state.real = action.payload;
        },
        clearSearch: (state) => {
            state.real = '';
            state.fake = '';
        }
    }
});

export const selectRealSearch = (state) => state.search.real;
export const selectFakeSearch = (state) => state.search.fake;

export const { setSearch, setReal, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;