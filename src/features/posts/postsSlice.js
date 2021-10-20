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

export const loadCommentsByPost = createAsyncThunk(
    'posts/loadCommentsByPost',
    async (id) => {
        const data = await fetch(`https://www.reddit.com/comments/${id}.json`);
        const json = await data.json();
        return json;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        hasError: false,
        currId: '',
        isLoadingComments: false
    },
    reducers: {
        setClicked: (state, action) => {
            // eslint-disable-next-line
            state.posts.map(post => {
                if (post.id.includes(action.payload)) {
                    return post.clicked = !post.clicked;
                }
            })
        },
        setCurrId: (state, action) => {
            state.currId = action.payload;
        }
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
                video: post.data.url,
                clicked: false,
                postComments: []
            }));
        },
        [loadAllPostsByCategory.rejected]: (state) => {
            state.isLoadingPosts = false;
            state.hasError = true;
        },



        [loadCommentsByPost.pending]: (state) => {
            state.isLoadingComments = true;
            state.hasError = false;
        },
        [loadCommentsByPost.fulfilled]: (state, action) => {
            state.isLoadingComments = false;
            state.hasError = false;
            // eslint-disable-next-line
            state.posts.map(post => {
                if (post.id.includes(state.currId)) {
                    post.postComments = action.payload[1].data.children.map(com => ({
                        comment: com.data.body,
                        author: com.data.author,
                    }));
                }
            })
        },
        [loadCommentsByPost.rejected]: (state) => {
            state.isLoadingComments = false;
            state.hasError = true;
        },
    }
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const hasError = (state) => state.posts.hasError;
export const isLoadingComments = (state) => state.posts.isLoadingComments;
export const selectCurrId = (state) => state.posts.currId;

export const { setClicked, setComments, setCurrId } = postsSlice.actions;

export const selectFilteredPosts = (state) => {
    const allPosts = selectPosts(state);
    const searchTerm = selectRealSearch(state);

    return allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export default postsSlice.reducer;