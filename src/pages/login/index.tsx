import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { UserAddProps, UserFormProps } from "@/@types/userType";
import { FirebaseAuthErrorCodes } from "@/@types/firebase";
import { requestPermission } from "@/utils/Notification";
import { fetchGetUser, fetchUserAdd, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { useRecoilState } from "recoil";
import { authState, initialState } from "@/recoil/atoms/authState";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userAuth, setUserAuth] = useRecoilState(authState);

    const changeAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            const token = await requestPermission();

            console.log("auth 확인", user);

            if (user) {
                const uid = user.uid;
                const email = user.email;

                if (userAuth.id === "") {
                    const res = await fetchGetUser(uid);

                    if (!res.data.id) {
                        const data: UserAddProps = {
                            id: uid,
                            email: email ?? "",
                        };
                        await fetchUserAdd(data);
                        const res = await fetchGetUser(uid);
                        setUserAuth(res.data);
                    } else {
                        setUserAuth(res.data);
                    }

                    await fetchUserTokenUpdate({ id: uid, token: token ?? "" });
                }
            } else {
                // User is signed out
                setUserAuth(initialState);
            }
        });
    };

    const handleOnClickLogin = ({ email, password }: UserFormProps) => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("로그인 완료", user);

                    changeAuth();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = FirebaseAuthErrorCodes[errorCode];

                    console.error(errorCode);
                    if (!errorMessage) {
                        alert("문제가 발생했습니다 " + errorCode);
                        return;
                    }
                    alert(errorMessage);
                });
        });
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="pb-12 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="로그인" handle={handleOnClickLogin} />
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
