import React, { useEffect } from 'react';

import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';

import { useSelector } from 'react-redux';

let scroll = 0;

const Shop = () => {
    const { homePosts } = useSelector((state) => state);

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset;
            return scroll;
        }
    });

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' });
        }, 100);
    }, []);

    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status />
                {homePosts.result === 0 && homePosts.posts.length === 0 ? (
                    <h2 className="text-center">No Products</h2>
                ) : (
                    <Posts />
                )}
            </div>
        </div>
    );
};

export default Shop;
