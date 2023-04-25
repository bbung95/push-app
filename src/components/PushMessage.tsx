import React from "react";

const PushMessage = ({ id }: { id: number }) => {
    return (
        <div>
            {id % 2 === 0 ? (
                <div className="chat chat-start">
                    <div className="chat-header">
                        8시 알림문자 화이팅!
                        <time className="text-xs opacity-50"> 2 hours ago</time>
                    </div>
                    <div className="chat-bubble bg-gray-300 text-gray-700">🔥오늘도 화이팅!🔥오늘도 화이팅!🔥오늘도 화이팅!🔥오늘도 화이팅!~</div>
                </div>
            ) : (
                <div className="chat chat-end">
                    <div className="chat-header">
                        Anakin
                        <time className="text-xs opacity-50"> 12:46</time>
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                </div>
            )}
        </div>
    );
};

export default PushMessage;
