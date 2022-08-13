import axios from "axios";



type EmailPayloadType = {
    body: any;
    headers: any
}

export const email = async ( payload: EmailPayloadType ) => {
    try {

        const options = {
            ...payload
        }

        const res = await axios.post('/api/email', options);

        return res.data;

    } catch (err) {
        return err.message;
    }
}