import React from 'react'
import Comment from './Comment';

export default function Comments({ comments, comNum }) {

    if (comNum === 0) {
        return <h4 style={{ textAlign: 'center', color: 'gray' }}>No Comments</h4>
    }

    if (comments.length === 0) {
        return <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--94oo0BCW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/9zqj8ab4s1a5joa9umsu.gif" alt="loading-comment" />
    }

    return (
        <section className='post-comments'>
            <div className="container">
                <ul className="comments-list gap-1">
                    {comments.map(com => <Comment key={com.comment} com={com} />)}
                </ul>
            </div>
        </section>
    )
}
