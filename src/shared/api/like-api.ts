import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator"

export const likePostApi = fetchDecorator((payload) => {
    return instance.post("likes", { ...payload })
});

