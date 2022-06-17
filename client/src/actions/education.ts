import axios from "axios"
import { URL } from "../utils/constant";


export const getEducations = async (languageCode: string) => {
    try {
        
        const options = {
            params: {
                languageCode
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