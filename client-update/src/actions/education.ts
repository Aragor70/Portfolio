import axios from "axios"
import { Language, URL } from "../utils/constant";

type Education = {
    name?: string;
    status?: string;
    website?: string;
    isVisible?: boolean;
    term?: string;
    order?: number;
    languageCode?: Language;
}

export const getEducations = async (payload: Education  = { languageCode: Language.ENGLISH }) => {
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
        console.log(res.data)
        return res.data;

    } catch (err) {
        return err.message;
    }
}
export const editEducation = async (id: number, formData: Education) => {
    try {
        
        const res = await axios.put(URL + '/api/education/' + id, formData);

        return res.data;

    } catch (err) {
        return err.message;
    }
}