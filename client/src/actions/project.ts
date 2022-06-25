import axios from "axios"
import { Language, URL } from "../utils/constant";



export const getProjects = async (payload: any = { languageCode: Language.ENGLISH }, isExact: boolean = false) => {
    try {
        
        if (localStorage?.languageCode) {
            payload.languageCode = localStorage.languageCode
        }

        const options = {
            params: {
                ...payload
            }
        }
        const res = await axios.get(URL + '/api/project/', options);

        return res.data;

    } catch (err: any) {
        return 'error.message'
    }
}

export const getProject = async (value: string | number) => {
    try {
        
        const res = await axios.get(URL + '/api/project/' + value);

        return res.data;

    } catch (err: any) {
        return 'error.message'
    }
}
export const editProject = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/project/' + id, formData);

        return res.data;

    } catch (err: any) {
        return 'error.message'
    }
}