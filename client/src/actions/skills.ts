import axios from "axios";
import { URL } from "../utils/constant";



export const getImages = async ( payload: any ) => {
    try {
        
        const options = {
            params: {
                ...payload
            }
        }

        const res = await axios.get(URL + '/api/image', options)

        return res.data
    } catch (err: any) {
        return err.message;
    }
}