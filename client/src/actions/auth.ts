import axios from "axios"
import { URL } from "../utils/constant";
import setAuthToken from "../utils/setAuthToken";


export const login = async (formData: any) => {
    try {
        
        const res = await axios.post(URL + '/api/auth/login/', formData);
        
        const token = await res.data?.token
        
        if (token) {
            
            localStorage.setItem('token', token)

            setAuthToken(token)

            return {token}
        } else {
            return setAuthToken('')
        }

    } catch (err: any) {
        console.log(err.message);
    }
}

export const register = async (formData: any) => {
    try {
        const res: any = await axios.post(URL + '/api/auth/register/', formData);

        return res;
        
    } catch (err: any) {
        console.log(err.message);
    }
}