import React, { useEffect, useState } from 'react';

import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved';
import Shop from '../../components/profile/Shop';

import { useSelector, useDispatch } from 'react-redux';
import { getProfileUsers } from '../../redux/actions/profileAction';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { profile, auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);
    const [postTab, setPostTab] = useState(true);
    //const [postTab, setPostTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every((item) => item !== id)) {
            dispatch(getProfileUsers({ id, auth }));
        }
    }, [id, auth, dispatch, profile.ids]);

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {
                <div className="profile_tab">
                    <button
                        className={postTab ? 'active' : ''}
                        onClick={() => {
                            setSaveTab(false);
                            setPostTab(true);
                        }}
                    >
                        Posts
                    </button>
                    {auth.user._id === id && (
                        <button
                            className={saveTab ? 'active' : ''}
                            onClick={() => {
                                setPostTab(false);
                                setSaveTab(true);
                            }}
                        >
                            Saved
                        </button>
                    )}
                    <button
                        className={!(postTab || saveTab) ? 'active' : ''}
                        onClick={() => {
                            setPostTab(false);
                            setSaveTab(false);
                        }}
                    >
                        Shop
                    </button>
                </div>
            }

            {profile.loading ? (
                <></>
            ) : (
                <>
                    {saveTab ? (
                        <Saved auth={auth} dispatch={dispatch} />
                    ) : postTab ? (
                        <Posts
                            auth={auth}
                            profile={profile}
                            dispatch={dispatch}
                            id={id}
                        />
                    ) : (
                        <Shop
                            auth={auth}
                            profile={profile}
                            dispatch={dispatch}
                            id={id}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
