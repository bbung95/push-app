import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const handleOnClickLogin = () => {
        signInWithEmailAndPassword(auth, "bbung@naver.com", "123456789")
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log(user.uid);
                router.push("/home");
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
