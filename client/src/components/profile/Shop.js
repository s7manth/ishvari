import React, { useState, useEffect } from 'react';
import PostThumb from '../PostThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { PROFILE_TYPES } from '../../redux/actions/profileAction';

const Shop = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        profile.posts.forEach((data) => {
            if (data._id === id) {
                setPosts(data.posts);
                setResult(data.result);
                setPage(data.page);
                console.log(data.posts);
            }
        });
    }, [profile.posts, id]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(
            `user_posts/${id}?limit=${page * 9}`,
            auth.token
        );
        const newData = { ...res.data, page: page + 1, _id: id };
        dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
        setLoad(false);
    };

    //profile.posts.forEach((x) => console.log(x.posts));

    return (
        <div>
            <PostThumb posts={posts} result={result} isPost={false} />

            <LoadMoreBtn
                result={result}
                page={page}
                load={load}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default Shop;
