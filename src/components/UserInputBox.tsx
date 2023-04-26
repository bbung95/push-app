import React, { useState } from "react";

interface UserInputBoxProps {
    title: string;
    handle: Function;
    type?: string;
}

const UserInputBox = ({ title, handle, type }: UserInputBoxProps) => {
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        passwordCheck: "",
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;

        setUserData({ ...userData, [target.name]: target.value });
    };

    return (
        <div className="hero">
            <div className="hero-content w-full flex-col">
                <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
                    <h1 className="text-3xl font-bold text-center">{title}</h1>
                    <div className=" pl-4 pr-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">아이디</span>
                            </label>
                            <input
                                type="text"
                                placeholder="아이디를 작성해주세요"
                                name="name"
                                className="input input-bordered"
                                value={userData.name}
                                onChange={handleOnChangeInput}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">비밀번호</span>
                            </label>
                            <input
                                type="password"
                                placeholder="비밀번호를 작성해주세요"
                                name="password"
                                className="input input-bordered"
                                value={userData.password}
                                onChange={handleOnChangeInput}
                                autoComplete="off"
                            />
                        </div>
                        {type === "signup" && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">비밀번호 확인</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="비밀번호를 작성해주세요"
                                    name="passwordCheck"
                                    className="input input-bordered"
                                    value={userData.passwordCheck}
                                    onChange={handleOnChangeInput}
                                    autoComplete="off"
                                />
                            </div>
                        )}
                        <div className="flex flex-gap form-control mt-6 gap-2">
                            <button className="btn btn-info text-white" onClick={(e) => handle(e)}>
                                {title}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInputBox;
