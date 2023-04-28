import { UserAddProps } from "@/@types/userType";
import { fetchUserAdd } from "@/api/UserFetchAPI";
import { app, auth, provider } from "@/lib/firebase-init";
import { async } from "@firebase/util";
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function index() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const router = useRouter();

    // const handlerGoogleLogin = () => {
    //     signInWithRedirect(auth, provider);
    // };
    // getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         // const credential = GoogleAuthProvider.credentialFromResult(result);
    //         // const token = credential.accessToken;

    //         // // The signed-in user info.
    //         // const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...

    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });

    return (
        <div className="h-full bg-main-color">
            <div className="flex flex-col gap-4 w-9/12 m-auto pt-96">
                <Link href={"/login"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    로그인
                </Link>
                <Link href={"/signup"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    회원가입
                </Link>
                {/* <Link href={"/home"} className="btn btn-warning text-gray-600 drop-shadow-md">
                    kakao
                </Link>
                <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={handlerGoogleLogin}>
                    google
                </button> */}
            </div>
        </div>
    );
}
