import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import ErrorResponse from '../../components/ErrorResponse/ErrorResponse';
import Loading from '../../components/Loading/Loading';
import { Translate } from '../../components/Translate/Translate';
import { UserContext } from '../../context/UserContext';
import '/src/style/sass/auth.scss'

type LoginForm = {
    email: string | null,
    password: string | null
}
// eslint-disable-next-line
const Login = ({ history, setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle(<Translate tKey="auth.login.headline" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    const { setUser, loadingUser, setLoadingUser } = useContext(UserContext);
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
            return setAlert('auth.error.login.email')
        }
        if (!password) {
            return setAlert('auth.error.login.password')
        }
        await setLoadingUser(true)
        const res = await login(formData)
        if (typeof res === 'string') {
                
            setLoadingUser(false)
            return setAlert(res)
            
        }
        await setUser(res)
        setAlert('')
        
        await setLoadingUser(false)
        if (res?.token) return history.push('/')
    }
    return (
        <Fragment>
            <form className="auth-form" autoComplete="off" onSubmit={e=> handleSubmit(e)}>
                <h1><Translate tKey="auth.login.headline" />:</h1>
                
                <label className="input-label" htmlFor="email"><Translate tKey="auth.form.email" />
                    <input type="text" autoComplete="off" name="email" onChange={e=> handleTyping(e)} />
                </label>
                
                <label className="input-label" htmlFor="password"><Translate tKey="auth.form.password" />
                    <input type="password" autoComplete="off" name="password" onChange={e=> handleTyping(e)} />
                </label>
                <div className="auth-bottom">
                    <button type="submit" className="submit-button right-button"><Translate tKey="auth.login.login" /></button>
                </div>
                {
                    alert ? <ErrorResponse message={alert} style={{ css: { color: 'orange' }}} /> : loadingUser ? <Loading /> : null
                }
            </form>
        </Fragment>
    );
}
export default withRouter(Login);