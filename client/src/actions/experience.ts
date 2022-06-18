import axios from "axios"
import { Language, URL } from "../utils/constant";



export const getExperiences = async (payload: any = { languageCode: Language.ENGLISH }) => {
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

    } catch (err: any) {
        return err.message
    }
}

export const editExperience = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/experience/' + id, formData);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
    }
}