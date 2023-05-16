type errorType = {
    [key: string]: string;
};

export const UserAuthErrorCodes: errorType = {
    "invalid-email": "이메일을 확인해주세요.",
    "email-already-in-use": "해당 이메일을 기존 사용자가 이미 사용 중입니다",
    "weak-password": "비밀번호는 6자리 이상 입력해주세요.",
    "wrong-password": "비밀번호를 확인해주세요.",
    "sign-in-fail": "이메일 또는 비밀번호를 확인해주세요.",
} as const;
