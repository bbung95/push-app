import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { UserFormProps } from "@/@types/userType";
import { FirebaseAuthErrorCodes } from "@/@types/firebase";

const index = () => {
    const handleOnClickLogin = ({ email, password }: UserFormProps) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = FirebaseAuthErrorCodes[errorCode];

                console.error(errorCode);
                if (!errorMessage) {
                    alert("문제가 발생했습니다");
                    return;
                }
                alert(errorMessage);
            });
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="h-3/5 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="로그인" handle={handleOnClickLogin} />
            </div>
            <div className="flex-1 w-11/12 m-auto mt-12 ">
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
