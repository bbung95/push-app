import React from "react";

const PushItem = () => {
    return (
        <li className="flex items-center pl-2 pr-2 h-20 cursor-pointer">
            <img className="w-16 h-16 rounded-xl" src="https://via.placeholder.com/100x100" alt="" />
            <div className="flex-1 p-2">
                <span className="text-lg font-bold text-gray-700">Alice Smith</span>
                <p className="text-gray-500">🔥Great, I will have a look</p>
            </div>
            <div className="flex flex-col w-16">
                <span className="text-gray-400">4:20 PM</span>
            </div>
        </li>
    );
};

export default PushItem;
