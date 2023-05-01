import { UserAuthProps } from "@/@types/userType";
import { db } from "@/lib/firebase-init";
import { matchPassword } from "@/utils/AuthUtil";
import { DocumentData, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const loginAuth = async (email: string, password: string) => {
    const qeury = query(collection(db, "user"), where("email", "==", email));
    const findUsers = await getDocs(qeury);

    if (findUsers.size === 0) {
        return null;
    }

    let findUser: DocumentData[] = [];
    findUsers.forEach((doc) => findUser.push(doc.data()));

    if (!matchPassword(password, findUser[0].password)) {
        return null;
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

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // 로그인 API 동작
                const user = await loginAuth(credentials?.username ?? "", credentials?.password ?? "");

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            user && (token.user = user); // authorize에 리턴했던 값이 user 정보에 있면 token에 추가.
            return Promise.resolve(token);
        },
        async session({ session, token }: any) {
            // token에 포함된 user 정보를 session.user에도 추가
            // 이후 client side의 session.user에서 token.user 정보 확인 가능.
            session.user = token.user;
            if (session.user != null && token.hasAcceptedTerms != null) {
                session.user.hasAcceptedTerms = token?.hasAcceptedTerms;
            }
            return Promise.resolve(session);
        },
    },
};

export default NextAuth(authOptions);
