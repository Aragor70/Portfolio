import axios from "axios"
import { Language, URL } from "../utils/constant";


export const getEducations = async (payload: any = { languageCode: Language.ENGLISH }) => {
    try {
        
        if (localStorage?.languageCode) {
            payload.languageCode = localStorage.languageCode
        }
        
        const options = {
            params: {
                ...payload
            }
        }
        const res = await axios.get(URL + '/api/education/', options);

        return res.data;

    } catch (err: any) {
        return err.message;
    }
}
export const editEducation = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/education/' + id, formData);

        return res.data;

    } catch (err: any) {
        return err.message;
    }
}