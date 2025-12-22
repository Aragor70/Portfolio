import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { register } from '../../actions/auth';
import ErrorResponse from '../../components/ErrorResponse/ErrorResponse';
import Loading from '../../components/Loading/Loading';
import { Translate } from '../../components/Translate/Translate';
import { UserContext } from '../../context/UserContext';
import '/src/style/sass/auth.scss'
type RegisterFormData = {
    firstName: null | string,
    lastName: null | string,
    email: null | string,
    password: null | string,
    passwordConfirmation: null | string
}
// eslint-disable-next-line
const Register = ({ history, setPageTitle }: any) => {
    useEffect(() => {
        setPageTitle(<Translate tKey="auth.register.headline" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirmation: null
    })
    
    const { loadingUser } = useContext(UserContext);
    
    const [alert, setAlert] = useState('');
    const handleTyping = (e: { target: HTMLInputElement }) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!formData?.email) {
            return setAlert('auth.error.login.email')
        }
        if (!formData?.password) {
            return setAlert('auth.error.login.password')
        }
        if (formData?.password !== formData?.passwordConfirmation) {
            return setAlert('auth.error.login.passwordConfirmation')
        }
        const res = await register(formData);
        if (typeof res === 'string') {
                
            return setAlert(res)
            
        }
        return history.push('/login')
    }
    
    // eslint-disable-next-line
    const customComplete = (e: any) => {
        
        if(e.target.autocomplete) {
            e.target.autocomplete ='none'
        }
    }
    return (
        <Fragment>
            <form className="auth-form" autoComplete="off" onSubmit={ e=> handleSubmit(e) }>
                <h1><Translate tKey="auth.register.headline" />:</h1>
                
                <label className="input-label" htmlFor="firstName"><Translate tKey="auth.form.firstName" />
                    <input type="text" autoComplete="off" name="firstName" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <label className="input-label" htmlFor="lastName"><Translate tKey="auth.form.lastName" />
                    <input type="text" autoComplete="off" name="lastName" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <label className="input-label" htmlFor="email"><Translate tKey="auth.form.email" />
                    <input type="text" autoComplete="off" name="email" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <label className="input-label" htmlFor="password"><Translate tKey="auth.form.password" />
                    <input type="password" autoComplete="off" name="password" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <label className="input-label" htmlFor="passwordConfirmation"><Translate tKey="auth.form.passwordConfirmation" />
                    <input type="password" autoComplete="off" name="passwordConfirmation" onChange={ e=> handleTyping(e) } onFocus={e=> customComplete(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button"><Translate tKey="auth.register.register" /></button>
                </div>
                {
                    alert ? <ErrorResponse message={alert} style={{ css: { color: 'orange' }}} /> : loadingUser ? <Loading /> : null
                }
            </form>
        </Fragment>
    );
}
export default withRouter(Register);