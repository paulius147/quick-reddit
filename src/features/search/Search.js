import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectFakeSearch, setReal, setSearch } from './searchSlice';

export default function Search() {
    const dispatch = useDispatch();
    const fakeSearch = useSelector(selectFakeSearch);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setReal(fakeSearch));
    }

    const handleChange = (e) => {
        const input = e.target.value;
        dispatch(setSearch(input));
    }

    return (
        <div className='search'>
            <form onSubmit={handleSubmit} className='search-form gap-1'>
                <input type="text" value={fakeSearch} onChange={handleChange} placeholder='Search' />
                <button type='submit'><i className="fas fa-search fa-2x"></i></button>
            </form>
        </div>
    )
}

export let posts;