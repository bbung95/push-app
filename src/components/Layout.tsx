import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase-init";
import { onAuthStateChanged } from "firebase/auth";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("user", user);

            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    return (
        <div className="h-screen max-w-screen-sm w-full m-auto">
            {children}
            {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" ? <Navigation /> : ""}
        </div>
    );
};

export default Layout;
