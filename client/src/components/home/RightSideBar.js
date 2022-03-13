import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

const RightSideBar = () => {
    const { auth, suggestions } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="mt-3 status">
            <UserCard user={auth.user} />

            <div className="d-flex justify-content-between align-items-center my-2">
                <h5>Suggestions for you</h5>
                {!suggestions.loading && (
                    <i
                        className="fas fa-redo"
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(getSuggestions(auth.token))}
                    />
                )}
            </div>

            {suggestions.loading ? (
                <></>
            ) : (
                <div className="suggestions">
                    {suggestions.users.map((user) => (
                        <UserCard key={user._id} user={user}>
                            <FollowBtn user={user} />
                        </UserCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RightSideBar;
