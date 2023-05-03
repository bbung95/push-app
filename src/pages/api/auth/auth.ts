import { UserProps } from "@/@types/model";
import { db } from "@/lib/firebase-init";
import { matchPassword } from "@/utils/AuthUtil";
import { getIndex } from "@/utils/DBUtill";
import { DocumentData, and, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";

export const loginCredential = async (email: string, password: string) => {
    const qeury = query(collection(db, "user"), where("email", "==", email));
    const findUsers = await getDocs(qeury);

    if (findUsers.size === 0) {
        console.error("404", "이메일을 확인해주세요.");
        return;
    }

    let findUser: DocumentData[] = [];
    findUsers.forEach((doc) => findUser.push(doc.data()));

    if (!matchPassword(password, findUser[0].password)) {
        console.error("404", "비밀번호를 확인해주세요.");
        return;
    }

    await updateDoc(doc(db, "user", String(findUser[0].id)), { login_date: serverTimestamp() });

    return {
        id: findUser[0].id,
        email: findUser[0].email,
        nickname: findUser[0].nickname,
        profile_img: findUser[0].profile_img,
        state_message: findUser[0].state_message,
        first_login: findUser[0].first_login,
    };
};

export const loginOAuth = async (id: number, type: string) => {
    const findUser = await findUserByOauthId(id, type);

    if (!findUser) {
        // 첫 로그인 가입
        const index = await getIndex("user");
        const user: UserProps = {
            id: index,
            email: "",
            password: "",
            nickname: "",
            profile_img: "",
            state_message: "",
            first_login: true,
            created_date: serverTimestamp(),
            modified_date: serverTimestamp(),
            login_date: serverTimestamp(),
            token: "",
            auth_type: type,
            oauth_id: id,
        };

        await setDoc(doc(db, "user", String(user.id)), user);

        return { ...user };
    }

    // 로그인시 업데이트
    await updateDoc(doc(db, "user", String(findUser.id)), { login_date: serverTimestamp() });

    return { ...findUser };
};

const findUserByOauthId = async (id: number, type: string) => {
    const qeury = query(collection(db, "user"), where("oauth_id", "==", id), where("auth_type", "==", type));
    const findUsers = await getDocs(qeury);

    let findUser: DocumentData[] = [];
    findUsers.forEach((doc) => findUser.push(doc.data()));

    return findUser[0];
};
