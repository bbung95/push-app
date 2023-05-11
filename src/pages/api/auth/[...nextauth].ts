import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { loginCredential, loginOAuth } from "./auth";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // 로그인 API 동작
                const findUser = await loginCredential(credentials?.username ?? "", credentials?.password ?? "");
                if (!findUser) {
                    return null;
                }
                return {
                    id: findUser.id,
                    nickname: findUser.nickname,
                    state_message: findUser.state_message,
                    profile_img: findUser.profile_img,
                    first_login: findUser.first_login,
                };
            },
        }),
        KakaoProvider({
            clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: "account_email",
                },
            },
            async profile(profile) {
                const findUser = await loginOAuth(profile.id, "kakao");
                return {
                    id: findUser.id,
                    nickname: findUser.nickname,
                    state_message: findUser.state_message,
                    profile_img: findUser.profile_img,
                    first_login: findUser.first_login,
                };
            },
        }),
    ],
    callbacks: {
        // session 업데이트
        async jwt({ token, trigger, session, user, account, profile }: any) {
            if (trigger === "update") {
                if (typeof session.nickname === "string") {
                    token.user.nickname = session.nickname || token.user.nickname;
                }
                if (typeof session.state_message === "string") {
                    token.user.state_message = session.state_message || token.user.state_message;
                }
                if (typeof session.profile_img === "string") {
                    token.user.profile_img = session.profile_img || token.user.profile_img;
                }

                if (typeof session.first_login === "boolean") {
                    token.user.first_login = false;
                }
            }
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
