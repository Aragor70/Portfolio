import axios from "axios";
import { URL } from "../utils/constant";



export const getImages = async () => {
    try {
        const res = await axios.get(URL + '/api/image')

        return res.data
    } catch (err: any) {
        return err.message;
    }
}