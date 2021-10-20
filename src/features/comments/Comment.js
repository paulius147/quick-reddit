import React from 'react'

export default function Comment({ com }) {
    return (
        <li className='comment'>
            <h4 className='com-author'>{com.author}</h4>
            <p>{com.comment}</p>
        </li>
    )
}