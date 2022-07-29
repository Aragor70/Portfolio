import axios from "axios"
import { Language, URL } from "../utils/constant";

type Experience = {
    name?: string;
    status?: string;
    website?: string;
    isVisible?: boolean;
    term?: string;
    order?: number;
    languageCode?: Language;
}

export const getExperiences = async (payload: Experience = { languageCode: Language.ENGLISH }) => {
    try {

        
        if (localStorage?.languageCode) {
            payload.languageCode = localStorage.languageCode
        }
        
        const options = {
            params: {
                ...payload
            }
        }
        const res = await axios.get(URL + '/api/experience/', options);

        return res.data;

    } catch (err) {
        return err.message
    }
}

export const editExperience = async (id: number, formData: Experience) => {
    try {
        
        const res = await axios.put(URL + '/api/experience/' + id, formData);

        return res.data;

    } catch (err) {
        console.log(err.message)
    }
}