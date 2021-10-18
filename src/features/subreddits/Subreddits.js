import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Subreddit from './Subreddit'
import { loadAllSubreddits } from './subredditsSlice'
import { selectSubreddits, isLoadingSubreddits } from './subredditsSlice'

export default function Subreddits() {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const isLoading = useSelector(isLoadingSubreddits);

    useEffect(() => {
        dispatch(loadAllSubreddits())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <section className="subs"><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /><img className='loading-subs' src='https://lakeofcakes.com/assets/images/skeleton.gif' alt='loading' /></section>
    }

    return (
        <section className='subs'>
            <div className="container">
                <ul className="subs-list gap-1">
                    <h1 className='subs-list-title'>Subreddits</h1>
                    {subreddits.map(sub => <Subreddit key={sub.title} sub={sub} />)}
                </ul>
            </div>
        </section>
    )
}
