type errorType = {
    [key: string]: string;
};

export const FirebaseAuthErrorCodes: errorType = {
    "auth/invalid-email": "이메일을 확인해주세요.",
    "auth/email-already-exists": "해당 이메일을 기존 사용자가 이미 사용 중입니다",
    "auth/email-already-in-use": "해당 이메일을 기존 사용자가 이미 사용 중입니다",
    "auth/user-not-found": "해당 이메일로 가입된 계정을 찾을 수 없습니다.",
    "auth/weak-password": "비밀번호는 6자리 이상 입력해주세요.",
    "auth/missing-password": "비밀번호를 입력해주세요.",
};
