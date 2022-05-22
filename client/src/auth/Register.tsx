import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { register } from '../actions/auth';

import '../style/auth.css'


const Register = ({ history, setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('Sign up')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    const [formData, setFormData] = useState<any>({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirmation: null
    })
    
    const [alert, setAlert] = useState('');

    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!formData?.email) {
            return setAlert('Please enter e-mail address.')
        }
        if (!formData?.password) {
            return setAlert('Please enter password.')
        }
        if (formData?.password !== formData?.passwordConfirmation) {
            return setAlert('Please enter both the same passwords.')
        }

        console.log(alert)

        await register(formData)

        return history.push('/login')
    }

    const customComplete = (e: any) => {
        
        console.log(e)
        if(e.target.autocomplete) {
            e.target.autocomplete ='none'
        }
    }

    return (
        <Fragment>
            <form className="auth-form" autoComplete="new-password" onSubmit={ e=> handleSubmit(e) }>
                <h1>Sign up:</h1>
                
                <label className="input-label" htmlFor="firstName">First name
                    <input type="text" autoComplete="new-password" name="firstName" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <label className="input-label" htmlFor="lastName">Last name
                    <input type="text" autoComplete="new-password" name="lastName" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="email">E-mail
                    <input type="text" autoComplete="new-password" name="email" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="password">Password
                    <input type="password" autoComplete="new-password" name="password" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>

                <label className="input-label" htmlFor="passwordConfirmation">Confirm your password
                    <input type="password" autoComplete="new-password" name="passwordConfirmation" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button">Sign up</button>
                </div>

            </form>
        </Fragment>
    );
}
export default withRouter(Register);