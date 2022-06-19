import axios from "axios"
import { URL } from "../utils/constant";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = async (token = "") => {

    if (token || localStorage.token) {
        setAuthToken(token || localStorage.token)
    }

    try {
        const res = await axios.get(URL + '/api/user/');
        
        return res.data

    } catch (err: any) {
        return err.message;
    }
}

export const login = async (formData: any) => {
    try {
        
        const res = await axios.post(URL + '/api/auth/login/', formData);
        
        const token = await res.data?.token
        
        if (token) {
            
            localStorage.setItem('token', token)

            setAuthToken(token)

            return loadUser(token)
        } else {
            return setAuthToken('')
        }

    } catch (err: any) {
        return err.message
    }
}

export const register = async (formData: any) => {
    try {
        const res: any = await axios.post(URL + '/api/auth/register/', formData);

        return res;
        
    } catch (err: any) {
        return err.message
    }
}