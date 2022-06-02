import axios from "axios"
import { Language, URL } from "../utils/constant";



export const getProjects = async () => {
    try {

        let languageCode = Language.ENGLISH
        
        if (localStorage?.languageCode) {
            languageCode = localStorage.languageCode
        }

        const options = {
            params: {
                languageCode
            }
        }
        const res = await axios.get(URL + '/api/project/', options);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
    }
}

export const getProject = async (id: number) => {
    try {
        
        const res = await axios.get(URL + '/api/project/' + id);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
    }
}
export const editProject = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/project/' + id, formData);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
    }
}