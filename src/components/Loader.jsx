import React from 'react';

const Loader = ({ size = 8, color = 'text-blue-500' }) => {
    return (
        <div className={`flex justify-center items-center`}>
            <div
                className={`${color} animate-spin rounded-full border-t-2 border-r-2 border-transparent h-${size} w-${size}`}
                style={{ borderColor: 'currentColor' }}
            />
        </div>
    );
};

export default Loader;
