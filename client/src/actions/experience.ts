import axios from "axios"
import { URL } from "../utils/constant";



export const getExperiences = async (languageCode: string) => {
    try {
        
        const options = {
            params: {
                languageCode
            }
        }
        const res = await axios.get(URL + '/api/experience/', options);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
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