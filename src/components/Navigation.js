import React from 'react'
import Search from '../features/search/Search'

export default function Navigation() {
    return (
        <nav className='navigation'>
            <div className="container gap-1">
                <div className="logo gap-1">
                    <a href='http://localhost:3000'><i className="fab fa-reddit-square fa-3x"></i></a>
                    <h1 className="title"><span className='blue'>Quick</span>Reddit</h1>
                </div>
                <Search />
                <div className='right'></div>
            </div>
        </nav>
    )
}
