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
    } catch (err) {
        return err.message;
    }
}
type Login = {
    email: string,
    password: string
}
export const login = async (formData: Login) => {
    try {
        
        const res = await axios.post(URL + '/api/auth/login/', formData);
        
        const token = await res.data?.token
        
        if (token) {
            
            localStorage.setItem('token', token)
            setAuthToken(token)
            return loadUser(token)
        } else {
            setAuthToken('')
            return "Not authorized request."
        }
    } catch (err) {
        return err.message
    }
}
type Register = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    imagePath?: string,
    role?: string
}
export const register = async (formData: Register) => {
    try {
        const res = await axios.post(URL + '/api/auth/register/', formData);
        return res;
        
    } catch (err) {
        return err.message
    }
}