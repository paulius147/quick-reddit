import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loadAllSubreddits = createAsyncThunk(
    'subreddits/loadAllSubreddits',
    async () => {
        const data = await fetch(`https://www.reddit.com/subreddits.json`);
        const json = await data.json();
        return json.data.children;
    }
);

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoadingSubreddits: false,
        hasError: false,
        currentSub: 'pics'
    },
    reducers: {
        setCurrentSub: (state, action) => {
            state.currentSub = action.payload;
        }
    },
    extraReducers: {
        [loadAllSubreddits.pending]: (state, action) => {
            state.isLoadingSubreddits = true;
            state.hasError = false;
        },
        [loadAllSubreddits.fulfilled]: (state, action) => {
            state.isLoadingSubreddits = false;
            state.hasError = false;
            state.subreddits = action.payload.map(sub => ({
                title: sub.data.display_name,
                photo: sub.data.icon_img,
            }));
        },
        [loadAllSubreddits.rejected]: (state, action) => {
            state.isLoadingSubreddits = false;
            state.hasError = true;
        }
    }
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;
export const hasError = (state) => state.subreddits.hasError;
export const currentSub = (state) => state.subreddits.currentSub;
export const { setCurrentSub } = subredditsSlice.actions;

export default subredditsSlice.reducer;