import { alertState } from "@/recoil/atoms/alertState";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Alert = () => {
    const state = useRecoilValue(alertState);

    return <>{state.isShow && (state.type === "warning" ? <WarningAlert message={state.message} /> : <InfoAlert message={state.message} />)}</>;
};

const WarningAlert = ({ message }: { message: string }) => {
    return (
        <div className="fixed bottom-4 left-0 w-full">
            <div className="m-auto alert alert-warning shadow-lg w-11/12 ">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

const InfoAlert = ({ message }: { message: string }) => {
    return (
        <div className="fixed bottom-4 left-0 w-full">
            <div className="m-auto alert alert-info shadow-lg w-11/12 ">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

export default Alert;
