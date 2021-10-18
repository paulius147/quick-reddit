import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoadingComments: false,
        hasError: false
    },
    reducers: {

    }
});