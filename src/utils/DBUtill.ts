import { db } from "../lib/firebase-init";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const getIndex = async (target: string) => {
    const find = await getDoc(doc(db, "index", target));
    const index = find.data();

    await updateDoc(doc(db, "index", target), { value: Number(index?.value) + 1 });

    return index?.value;
};
