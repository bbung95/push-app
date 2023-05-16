import Image from "next/image";
import React from "react";

interface ProfileProps {
    image: string;
    size: number;
}

const ProfileImage = ({ image, size }: ProfileProps) => {
    return (
        <div className="rounded-xl overflow-hidden bg-white flex justify-center drop-shadow-[1px_1px_6px_rgba(0,0,0,0.1)]" style={{ width: `${size}rem`, height: `${size}rem` }}>
            {/* <img className="w-auto h-auto" src={image || "/image/white-image.png"} alt="" /> */}
            <Image className="w-auto h-auto" src={image || "/image/white-image.png"} alt="" width={100} height={100} />
        </div>
    );
};

export default ProfileImage;
