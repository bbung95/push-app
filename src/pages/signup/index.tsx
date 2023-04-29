import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { UserFormProps } from "@/@types/userType";
import { FirebaseAuthErrorCodes } from "@/@types/firebase";

const index = () => {
    const handleOnClickSignup = ({ email, password, passwordCheck }: UserFormProps) => {
        createUserWithEmailAndPassword(auth, email, password === passwordCheck ? password : "")
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log("가입완료", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = FirebaseAuthErrorCodes[errorCode];

                console.error(errorCode);
                if (!errorMessage) {
                    alert("문제가 발생했습니다");
                    return;
                }
                if (errorCode === "auth/missing-password" && password !== passwordCheck) {
                    alert("비밀번호를 확인해주세요.");
                    return;
                }
                alert(errorMessage);
            });
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="pb-12 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="회원가입" handle={handleOnClickSignup} type="signup" />
            </div>
            <div className="flex-1 w-11/12 m-auto pt-4 ">
                <div className="flex gap-3 items-center">
                    <Link href={"/"}>
                        <img src="/icon/arrow-back-white.svg" alt="" width={28} height={28} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default index;
