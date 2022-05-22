import axios from "axios"
import { URL } from "../utils/constant";



export const getProjects = async (languageCode: string) => {
    try {
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

export const editProject = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/project/' + id, formData);

        return res.data;

    } catch (err: any) {
        console.log(err.message)
    }
}