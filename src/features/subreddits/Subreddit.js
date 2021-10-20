import React from 'react'
import { loadAllPostsByCategory } from '../posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../search/searchSlice';
import { setCurrentSub, currentSub } from './subredditsSlice';

export default function Subbredit({ sub }) {
    const dispatch = useDispatch();
    const currSub = useSelector(currentSub);

    const handleClick = () => {
        dispatch(loadAllPostsByCategory(sub.title));
        dispatch(clearSearch());
        dispatch(setCurrentSub(sub.title));
    }

    return (
        <li onClick={handleClick} className={sub.title === currSub ? 'sub currSub gap-1' : 'sub gap-1'}>
            {sub.photo ? <img className='sub-img' src={sub.photo} alt="sub-img" /> : <img className='sub-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/768px-Solid_white.svg.png' alt="sub-img" />}
            <h4 className='sub-title'>{sub.title}</h4>
        </li>
    )
}
