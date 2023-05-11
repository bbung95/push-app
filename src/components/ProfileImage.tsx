import React from "react";

interface ProfileProps {
    image: string;
    size: number;
}

const ProfileImage = ({ image, size }: ProfileProps) => {
    return (
        <div className="rounded-xl overflow-hidden flex justify-center" style={{ width: `${size}rem`, height: `${size}rem` }}>
            <img className="w-auto h-auto" src={image || "https://via.placeholder.com/100x100"} alt="" />
        </div>
    );
};

export default ProfileImage;
