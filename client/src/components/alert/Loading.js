import React from 'react';

const Loading = () => {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'white',
                    opacity: '0.5',
                }}
            ></div>
            <div id="loader"></div>
        </div>
    );
};

export default Loading;
