import moment from "moment";
import "moment/locale/ko";

export const formatDate = (value: Date) => {
    const momentDate = moment(value);
    const target = new Date(value);
    const today = new Date();

    const date = today.getDate() - target.getDate();

    let result = "";

    if (date == 0) {
        // 분초
        result = momentDate.startOf("minute").fromNow();
    } else if (date == 1) {
        // 어제
        result = "어제";
    } else {
        // 일자
        result = momentDate.subtract(10, "days").calendar().replaceAll(".", "-").slice(0, -1);
    }

    return result;
};
