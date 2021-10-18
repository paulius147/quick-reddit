import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPostsByCategory, selectFilteredPosts } from './postsSlice'
import { isLoadingPosts } from './postsSlice';
import Post from './Post';
import Notfound from '../../components/Notfound';

export default function Posts() {
    const dispatch = useDispatch();
    const allPosts = useSelector(selectFilteredPosts);
    const isLoading = useSelector(isLoadingPosts);

    useEffect(() => {
        dispatch(loadAllPostsByCategory('pics'))
        console.log(allPosts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <section className="posts"><div className='container-loading'><img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img>
            <img className='loading-posts' src='https://importkey.com/analyse/images/listloader.gif' alt='loading'></img></div></section>
    }

    if (allPosts.length === 0) {
        return <Notfound />
    }

    return (
        <section className='posts'>
            <div className="container">
                <ul className="posts-list gap-1">
                    {allPosts.map(post => <Post key={post.title} post={post} />)}
                </ul>
            </div>
        </section>
    )
}
