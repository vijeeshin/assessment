import { dispatch } from "../store"
import { submitFormData } from "./local-body-form-two-slice"

export const insertDataToServer = async (data) => {
        await dispatch(submitFormData(data));
}