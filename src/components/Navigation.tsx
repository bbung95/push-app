import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigation = () => {
    return (
        <div className="fixed bottom-0 h-24 bg-white w-full max-w-screen-sm rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
            <ul className="h-full flex justify-around items-center">
                <li className="cursor-pointer hover:scale-110 transition-all">
                    <Link href={"/home"}>
                        <Image src="/icon/home.svg" alt="" width={28} height={28} />
                    </Link>
                </li>
                <li className="cursor-pointer hover:scale-110 transition-all">
                    <Link href={"/friend"}>
                        <Image src="/icon/friends.svg" alt="" width={38} height={38} />
                    </Link>
                </li>
                <li className="cursor-pointer hover:scale-110 transition-all">
                    <Link href={"/profile"}>
                        <Image src="/icon/profile.svg" alt="" width={38} height={38} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
