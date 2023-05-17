type messageType = {
    [key: string]: string;
};

export const PushMessageTypes: messageType = {
    "push-message": "새로운 쪽지가 도착했습니다.",
    "invited-message": "새로운 친구요청이 있습니다.",
    "accept-invited-message": "친구요청을 수락했습니다.",
} as const;
