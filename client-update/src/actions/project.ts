import axios from "axios"
import { Language, URL } from "../utils/constant";


export const getProjects = async (payload: { languageCode?: Language, isVisible?: true | false } = { languageCode: Language.ENGLISH }) => {
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

    } catch (err) {
        return 'error.message'
    }
}

export const getProject = async (value: string | number) => {
    try {
        
        const res = await axios.get(URL + '/api/project/' + value);

        return res.data;

    } catch (err) {
        return 'error.message'
    }
}
// eslint-disable-next-line
export const editProject = async (id: number, formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/project/' + id, formData);

        return res.data;

    } catch (err) {
        return 'error.message'
    }
}

// eslint-disable-next-line
export const updateProjectStatus = async (action: 'include' | 'exclude', formData: any) => {
    try {
        
        const res = await axios.put(URL + '/api/project/status/' + action, formData);

        return res.data;

    } catch (err) {
        return 'error.message'
    }
}