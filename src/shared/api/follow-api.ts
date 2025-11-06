import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator"
import type { Follow } from "../../typescript/types";

export const followUserApi = fetchDecorator<Follow>((payload) => {
    return instance.post("follows", { ...payload })
});

