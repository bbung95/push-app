import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchNicknameCheck, fetchUserProfileUpdate } from "@/api/UserFetchAPI";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UserProfileProps } from "@/@types/userType";
import { fetchUploadImageFile } from "@/api/UploadFetchAPI";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import ProfileImage from "@/components/ProfileImage";
import Alert from "@/components/Alert";
import { alertState } from "@/recoil/atoms/alertState";

const index = () => {
    const { data: session, status, update } = useSession();
    const setIsLoading = useSetRecoilState(loadingState);
    const fileRef = useRef<HTMLInputElement>(null);
    const [userData, setUserData] = useState<UserProfileProps>({
        nickname: "",
        state_message: "",
        profile_img: "",
    });

    const setAlertState = useSetRecoilState(alertState);
    const showAlertMessage = (message: string, type: string) => {
        const state = { isShow: true, message: message, type: type };
        setAlertState(state);
        setTimeout(() => {
            setAlertState({ ...state, isShow: false });
        }, 2000);
    };

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setUserData({ ...userData, [target.name]: target.value });
    };

    const imagePreview = (file: File) => {
        var reader = new FileReader();

        reader.onload = function () {
            var result = reader.result;
            setUserData({ ...userData, profile_img: result });
        };
        reader.readAsDataURL(file);
    };

    const handleOnChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const selectFiles = files as FileList;
        if (selectFiles.length > 0) {
            imagePreview(selectFiles[0]);
        }
    };

    const handleUpdateUserProfile = async () => {
        if (userData.nickname === undefined || userData.nickname === "") {
            showAlertMessage("닉네임을 입력해주세요.", "warning");
            return;
        }

        const { data } = await fetchNicknameCheck(userData.nickname);

        if (userData.nickname !== session?.user.nickname && !data) {
            showAlertMessage("해당 닉네임은 사용중입니다.", "warning");
            return;
        }

        // 로딩 시작
        setIsLoading(true);

        let fileUrl;
        const { files } = fileRef.current ?? {};
        const selectFiles = files as FileList;
        if (selectFiles.length > 0) {
            const imageRes = await fetchUploadImageFile(selectFiles[0]);
            if (imageRes.status !== 200) {
                showAlertMessage("이미지 업로드시 문제가 발생했습니다.", "warning");
                return;
            }

            fileUrl = imageRes.data.data.url;
        }

        const res = await fetchUserProfileUpdate({
            id: String(session?.user.id),
            nickname: userData.nickname,
            state_message: userData.state_message,
            profile_img: fileUrl ?? session?.user.profile_img,
        });

        setIsLoading(false);
        if (res.data.status !== 201) return;

        // session 업데이트
        showAlertMessage("프로필이 수정되었습니다.", "info");
        await update({ nickname: userData.nickname, state_message: userData.state_message, profile_img: fileUrl });
    };

    useEffect(() => {
        setUserData({
            nickname: session?.user.nickname ?? "",
            state_message: session?.user.state_message ?? "",
            profile_img: session?.user.profile_img ?? "",
        });
    }, [status]);

    return (
        <main className="relative h-full bg-white w-full overflow-auto pb-28">
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
                                    <ProfileImage image={String(userData.profile_img)} size={8} />

                                    <input id="profile-image" type="file" className="hidden" name="image" onChange={handleOnChangeFileInput} ref={fileRef} accept=".jpg, .png, .jpeg" />
                                    <label htmlFor="profile-image" className="btn btn-info mt-2 text-white">
                                        프로필 사진 수정
                                    </label>
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
