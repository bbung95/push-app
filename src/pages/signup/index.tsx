import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { fetchUserAdd } from "@/api/UserFetchAPI";
import { UserAddProps } from "@/@types/userType";
import { UserFormProps } from "@/@types/userType";
import { FirebaseAuthErrorCodes } from "@/@types/firebase";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const handleOnClickSignup = ({ email, password, passwordCheck }: UserFormProps) => {
        createUserWithEmailAndPassword(auth, email, password === passwordCheck ? password : "")
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                const data: UserAddProps = {
                    id: user.uid,
                    email: user.email ?? "",
                };

                const res = await fetchUserAdd(data);
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
