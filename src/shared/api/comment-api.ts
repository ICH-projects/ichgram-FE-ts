import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator"

export const createCommentApi = fetchDecorator((payload) => {
    return instance.post("comments", { ...payload })
});

