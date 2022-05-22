import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../actions/auth';

import '../style/auth.css'


type LoginForm = {
    email: string | null,
    password: string | null
}

const Login = ({ history, setPageTitle }: any) => {


    useEffect(() => {
        setPageTitle('Login')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    const [formData, setFormData] = useState<LoginForm>({
        email: null,
        password: null
    })
    const { email, password } = formData;

    const [alert, setAlert] = useState('');

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            return setAlert('Please enter e-mail address.')
        }
        if (!password) {
            return setAlert('Please enter password.')
        }
        console.log(alert)

        const res: any = await login(formData)

        if (res?.token) return history.push('/')
    }
    
    return (
        <Fragment>
            
            <form className="auth-form" autoComplete="off" onSubmit={e=> handleSubmit(e)}>
                <h1>Login:</h1>
                
                <label className="input-label" htmlFor="email">E-mail
                    <input type="text" autoComplete="off" name="email" onChange={e=> handleTyping(e)} placeholder="E-mail address" />
                </label>
                
                <label className="input-label" htmlFor="password">Password
                    <input type="password" autoComplete="off" name="password" onChange={e=> handleTyping(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Log in</button>
                </div>
                

            </form>
        </Fragment>
    );
}
export default withRouter(Login);