import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostThumb = ({ posts, result, isPost }) => {
    const { theme } = useSelector((state) => state);
    const posts_filtered = posts.filter((x) => x.isProduct ^ isPost);
    //console.log(posts_filtered);

    if (result === 0)
        return <h2 className="text-center text-danger">No Post</h2>;

    return (
        <div className="post_thumb">
            {posts_filtered.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                    <div className="post_thumb_display">
                        {post.images[0].url.match(/video/i) ? (
                            <video
                                controls
                                src={post.images[0].url}
                                alt={post.images[0].url}
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)'
                                }}
                            />
                        ) : (
                            <img
                                src={post.images[0].url}
                                alt={post.images[0].url}
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)'
                                }}
                            />
                        )}

                        <div className="post_thumb_menu">
                            <i className="far fa-heart">{post.likes.length}</i>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PostThumb;
