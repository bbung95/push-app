import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import axios from "axios";
import { fetchUserAdd } from "@/api/UserFetchAPI";
import { UserAddProps } from "@/@types/userType";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const handleOnClickSignup = () => {
        createUserWithEmailAndPassword(auth, "bbung@naver.com", "123456789")
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log(user.uid);

                const data: UserAddProps = {
                    id: user.uid,
                    email: user.email ?? "",
                };

                const res = await fetchUserAdd(data);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="h-3/5 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="회원가입" handle={handleOnClickSignup} type="signup" />
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
