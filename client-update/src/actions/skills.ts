import axios from "axios";
import { URL } from "../utils/constant";

export type ImageType  = {
    project_icon?: true | false,
    education_icon?: true | false,
    experience_icon?: true | false,
    phrase?: string
}

export const getImages = async ( payload: ImageType ) => {
    try {
        
        const options = {
            params: {
                ...payload
            }
        }
        const res = await axios.get(URL + '/api/image', options)
        return res.data
    } catch (err) {
        return err.message;
    }
}