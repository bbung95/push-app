import React, { useEffect, useState } from "react";
import { authState } from "@/recoil/atoms/authState";
import { useRecoilState } from "recoil";
import Link from "next/link";
import axios from "axios";
import { fetchNicknameCheck, fetchUserProfileUpdate } from "@/api/UserFetchAPI";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const index = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState({
        nickname: "",
        state_message: "",
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;

        setUserData({ ...userData, [target.name]: target.value });
    };

    const handleUpdateUserProfile = async () => {
        if (userData.nickname === undefined || userData.nickname === "") {
            alert("닉네임을 입력해주세요.");
            return;
        }

        const { data } = await fetchNicknameCheck(userData.nickname);

        if (userData.nickname !== session?.user.nickname && !data) {
            alert("해당 닉네임은 사용중입니다.");
            return;
        }

        const res = await fetchUserProfileUpdate({
            id: String(session?.user.id),
            nickname: userData.nickname,
            state_message: userData.state_message,
        });

        if (res.data.status !== 201) return;

        alert("프로필이 수정되었습니다.");
        // session 업데이트
        await update({ nickname: userData.nickname, state_message: userData.state_message });
        router.push("/profile");
    };

    useEffect(() => {
        setUserData({
            nickname: session?.user.nickname ?? "",
            state_message: session?.user.state_message ?? "",
        });
    }, [status]);

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <div className="flex gap-3 items-center">
                    <Link href={"/profile"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">프로필 수정</h1>
                </div>
                {status === "authenticated" && (
                    <>
                        <div className="mt-4 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col items-center m-auto">
                                    <img className="w-28 h-28 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                                    <button className="btn btn-info">프로필 사진 수정</button>
                                </div>
                                <div className="flex gap-4">
                                    <label htmlFor="nickname" className="font-bold text-md">
                                        닉네임
                                    </label>
                                    <input
                                        id="nickname"
                                        type="text"
                                        name="nickname"
                                        placeholder="닉네임"
                                        className="input input-bordered bg-white flex-1"
                                        value={userData.nickname}
                                        onChange={handleOnChangeInput}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label htmlFor="message" className="font-bold text-md">
                                        소개글
                                    </label>
                                    <input
                                        id="message"
                                        type="text"
                                        name="state_message"
                                        placeholder="소개글"
                                        className="input input-bordered bg-white flex-1"
                                        value={userData.state_message}
                                        onChange={handleOnChangeInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btn w-full mt-4" onClick={handleUpdateUserProfile}>
                            <img src="/icon/edit.svg" alt="" width={28} height={28} />
                        </button>
                    </>
                )}
            </div>
        </main>
    );
};

export default index;
