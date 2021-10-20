import React from 'react'
import { useDispatch } from 'react-redux'
import { clearSearch } from '../features/search/searchSlice';

export default function Notfound() {
    const dispatch = useDispatch();

    const goBack = () => {
        dispatch(clearSearch());
    }

    return (
        <div className='posts not-found'>
            <h1>Nothing Found...</h1>
            <button onClick={goBack} className='back'>Go Back</button>
        </div>
    )
}
