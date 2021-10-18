import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectRealSearch } from '../search/searchSlice';

export const loadAllPostsByCategory = createAsyncThunk(
    'posts/loadAllPostsByCategory',
    async (cat) => {
        const data = await fetch(`https://www.reddit.com/r/${cat}.json`);
        const json = await data.json();
        return json.data.children;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        hasError: false,
    },
    extraReducers: {
        [loadAllPostsByCategory.pending]: (state) => {
            state.isLoadingPosts = true;
            state.hasError = false;
        },
        [loadAllPostsByCategory.fulfilled]: (state, action) => {
            state.isLoadingPosts = false;
            state.hasError = false;
            state.posts = action.payload.map(post => ({
                posts: post,
                id: post.data.id,
                title: post.data.title,
                votes: post.data.ups - post.data.downs,
                author: post.data.author,
                subreddit: post.data.subreddit,
                comments: post.data.num_comments,
                time: post.data.created_utc,
                photo: post.data.url,
                video: post.data.url
            }));
        },
        [loadAllPostsByCategory.rejected]: (state) => {
            state.isLoadingPosts = false;
            state.hasError = true;
        }
    }
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const hasError = (state) => state.posts.hasError;

export const selectFilteredPosts = (state) => {
    const allPosts = selectPosts(state);
    const searchTerm = selectRealSearch(state);

    return allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export default postsSlice.reducer;





// FOR TIME CALCULATION
// let dateNow = new Date(1634010280 * 1000);
// let dateFuture = new Date();

// let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

// // calculate days
// const days = Math.floor(diffInMilliSeconds / 86400);
// diffInMilliSeconds -= days * 86400;
// console.log('calculated days', days);

// // calculate hours
// const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
// diffInMilliSeconds -= hours * 3600;
// console.log('calculated hours', hours);

// // calculate minutes
// const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
// diffInMilliSeconds -= minutes * 60;
// console.log('minutes', minutes);

// let difference = '';
// if (days > 0) {
//     difference += (days === 1) ? `${days} day, ` : `${days} days, `;
// }

// difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

// difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

// return console.log(difference);