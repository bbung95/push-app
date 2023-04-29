import { fetchNicknameCheck, fetchNicknameUpdate } from "@/api/UserFetchAPI";
import { authState } from "@/recoil/atoms/authState";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const nickname = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userAuth, setUserAuth] = useRecoilState(authState);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [nickname, setNickname] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputState, setInputState] = useState({
        text: "",
        isDisabled: false,
    });

    const handleNicknameDuplicate = async () => {
        if (nickname === "") {
            setInputState({ isDisabled: false, text: "닉네임을 입력해주세요." });
            return;
        }

        const res = await fetchNicknameCheck(nickname);

        if (!res.data) {
            setInputState({ isDisabled: false, text: "해당 닉네임은 사용중입니다." });
            return;
        }

        setInputState({ text: "사용가능한 닉네임입니다.", isDisabled: true });
    };

    const handleOnSubmitNickname = async () => {
        if (!inputState.isDisabled) return;
        const res = await fetchNicknameUpdate({ id: userAuth.id, nickname: nickname });

        if (res.data.status === 201) {
            setUserAuth({ ...userAuth, first_login: false, nickname: nickname });
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (inputState.isDisabled) {
            setInputState({ text: "", isDisabled: false });
        }
    }, [nickname]);

    return (
        <div className="relative h-full bg-main-color">
            <div className="absolute card w-96 bg-base-100 shadow-xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="card-body">
                    <h2 className="card-title">닉네임</h2>
                    <input
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        className="input input-bordered w-full max-w-xs"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        autoComplete="off"
                    />
                    {inputState.text && <p className={inputState.isDisabled ? "text-sm" : "text-sm text-red-600"}>{inputState.text}</p>}
                    <div className="card-actions justify-end">
                        <button className="btn btn-warning text-white w-24" onClick={handleNicknameDuplicate}>
                            중복체크
                        </button>
                        {inputState.isDisabled ? (
                            <button className="btn text-white w-20 btn-info" onClick={handleOnSubmitNickname}>
                                사용
                            </button>
                        ) : (
                            <button className="btn text-white w-20 btn-disabled" disabled>
                                사용
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default nickname;
