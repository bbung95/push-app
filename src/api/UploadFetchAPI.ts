import axios from "axios";

export const fetchUploadImageFile = async (file: File) => {
    let formData = new FormData();
    formData.append("image", file);

    // 업로드
    const res = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: {
            key: process.env.NEXT_PUBLIC_IMGBB_KEY,
        },
        data: formData,
    });

    return res;
};
