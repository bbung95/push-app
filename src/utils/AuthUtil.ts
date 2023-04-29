// import { fetchGetUser, fetchUserAdd, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
// import { onAuthStateChanged } from "firebase/auth";
// import { requestPermission } from "./Notification";
// import { auth } from "@/lib/firebase-init";
// import { UserAddProps } from "@/@types/userType";
// import { initialState } from "@/recoil/atoms/authState";

// onAuthStateChanged(auth, async (user) => {
//   const token = await requestPermission();

//   console.log("auth 확인", user);

//   if (user) {
//       const uid = user.uid;
//       const email = user.email;

//       if (userAuth.id === "") {
//           const res = await fetchGetUser(uid);

//           if (!res.data.id) {
//               const data: UserAddProps = {
//                   id: uid,
//                   email: email ?? "",
//               };
//               await fetchUserAdd(data);
//               const res = await fetchGetUser(uid);
//               setUserAuth(res.data);
//           } else {
//               setUserAuth(res.data);
//           }

//           await fetchUserTokenUpdate({ id: uid, token: token ?? "" });
//       }
//   } else {
//       // User is signed out
//       setUserAuth(initialState);
//   }
// });
