import React from 'react'
import Search from '../features/search/Search'
import { loadAllPostsByCategory } from '../features/posts/postsSlice'
import { useDispatch } from 'react-redux'
import { setCurrentSub } from '../features/subreddits/subredditsSlice'
import { clearSearch } from '../features/search/searchSlice'

export default function Navigation() {
    const dispatch = useDispatch();

    const handleTitle = () => {
        dispatch(loadAllPostsByCategory('pics'));
        dispatch(setCurrentSub('pics'))
        dispatch(clearSearch());
        window.scrollTo(0, 0);
    }

    return (
        <nav className='navigation'>
            <div className="container gap-1">
                <div onClick={handleTitle} className="logo gap-1">
                    <i className="fab fa-reddit-square fa-3x"></i>
                    <h1 className="title"><span className='blue'>Quick</span>Reddit</h1>
                </div>
                <Search />
                <div className='right'>
                    <a href='#subs'><button className='subreddits-btn'>Subreddits</button></a>
                </div>
            </div>
        </nav>
    )
}
