import { fetchDeleteUserToken, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import ProfileImage from "@/components/ProfileImage";
import { loadingState } from "@/recoil/atoms/loadingState";
import { requestPermission } from "@/utils/Notification";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

const index = () => {
    const { data: session } = useSession();
    const setIsLoading = useSetRecoilState(loadingState);

    const handleOnClickLogout = async () => {
        if (!confirm("로그아웃 됩니다")) return;

        setIsLoading(true);
        await fetchDeleteUserToken(String(session?.user.id));
        await signOut({ redirect: false, callbackUrl: "/foo" });
        setIsLoading(false);
    };

    const handleOnClickNotification = async () => {
        const token = await requestPermission();
        fetchUserTokenUpdate({ id: String(session?.user.id), token: token ?? "" });
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <h1 className="text-3xl font-bold">마이페이지</h1>
                {session?.user && (
                    <>
                        <div className="relative mt-4 h-56 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex gap-3">
                                <ProfileImage image={session.user.profile_img} size={8} />
                                <div className="flex-1">
                                    <span className="text-2xl flex-1 font-bold text-gray-700">{session.user.nickname}</span>
                                    <p className="mt-4 line-clamp-2">{session.user.state_message}</p>
                                </div>
                            </div>

                            <Link href={"/profile/update"} className="btn absolute w-[calc(100%_-_2rem)] bottom-4">
                                <img src="/icon/edit.svg" alt="" width={28} height={28} />
                            </Link>
                        </div>
                        <div className="flex flex-col mt-4 gap-2">
                            {/* <Link href="/profile/locker" className="btn btn-info text-white text-lg">
                                보관함
                            </Link> */}
                            <Link href="/profile/invited" className="btn btn-info text-white text-lg">
                                초대목록
                            </Link>
                            <button className="btn btn-accent text-white text-lg" onClick={handleOnClickNotification}>
                                알림 설정
                            </button>
                            <button className="btn btn-error text-white text-lg" onClick={handleOnClickLogout}>
                                로그아웃
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default index;
