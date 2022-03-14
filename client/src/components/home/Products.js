import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';

import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { PRODUCT_TYPES } from '../../redux/actions/productAction';

const Posts = () => {
    const { homePosts, auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(
            `products?limit=${homePosts.page * 9}`,
            auth.token
        );

        dispatch({
            type: PRODUCT_TYPES.GET_PRODUCTS,
            payload: { ...res.data, page: homePosts.page + 1 }
        });

        setLoad(false);
    };

    return (
        <div className="posts">
            {homePosts.posts.map((post) => (
                <PostCard key={post._id} post={post} theme={theme} />
            ))}

            <LoadMoreBtn
                result={homePosts.result}
                page={homePosts.page}
                load={load}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default Posts;
