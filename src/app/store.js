import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import subredditsReducer from '../features/subreddits/subredditsSlice';
import searchReducer from '../features/search/searchSlice';
import commentsReducer from '../features/comments/commentsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
        search: searchReducer,
        comments: commentsReducer
    }
});