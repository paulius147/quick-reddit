import React from 'react'
import { useDispatch } from 'react-redux';
import { setClicked, setCurrId, loadCommentsByPost } from './postsSlice';
import Comments from '../comments/Comments';

export default function Post({ post }) {
    const dispatch = useDispatch();

    const handleCom = () => {
        dispatch(setCurrId(post.id));
        dispatch(setClicked(post.id));
        dispatch(loadCommentsByPost(post.id));
        console.log(post.postComments)
    }

    function time() {
        let postDate = new Date(post.time * 1000);
        let dateFuture = new Date();

        let diffInMilliSeconds = Math.abs(dateFuture - postDate) / 1000;

        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;

        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;

        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        let difference = '';
        if (days > 0) {
            difference += (days === 1) ? `${days} day ` : `${days} days `;
        }

        if (hours > 0 && days < 1) {
            difference += (hours === 0 || hours === 1) ? `${hours} hour ` : `${hours} hours `;
        }

        if (hours < 1 && days < 1 && minutes > 0) {
            difference += (minutes === 0 || hours === 1) ? `${minutes} minute ` : `${minutes} minutes `;
        }

        difference += 'ago';

        return difference;
    }

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    return (
        <li className='post gap-1'>
            <div className='post-votes gap-1'>
                <div className="votes">
                    <i className="fas fa-arrow-up"></i>
                    <span>{post.votes}</span>
                    <i className="fas fa-arrow-down"></i>
                </div>
                <div className='title-media-author gap-1'>
                    <a className='post-title-link' href={post.video} target='_blank' rel="noreferrer" ><h3 className='post-title'>{post.title}</h3></a>
                    {post.video.includes('youtube') || post.video.includes('youtu.be') ? <iframe title='yt' src={'//www.youtube.com/embed/' + getId(post.video)} frameBorder="0" allowFullScreen width="100%" height="450"></iframe> : post.video.includes('vimeo') ? <a href={post.video} rel="noreferrer" target="_blank" ><img className='post-img' src={post.photo} alt='post-img' /></a> : post.photo.includes('.jpg') || post.photo.includes('.png') ? <img className='post-img' src={post.photo} alt='post-img'></img> : ''}
                    <div className="author-time-com gap-1">
                        <span className="author">{post.author}</span>
                        <span className="time">{time()}</span>
                        <div onClick={handleCom} className="comments">
                            <i className="far fa-comments"></i>
                            <span className='com-num'>{post.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
            {post.clicked && <Comments comNum={post.comments} comments={post.postComments} />}
        </li>
    )
}