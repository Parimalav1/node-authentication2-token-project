import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FormSchema from './FormSchema';
import * as yup from 'yup';
import styled from 'styled-components';

const RegStyles = styled.div`
    text-align: center;
    display:flex;
    flex-flow: column;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 5px, 2px;
    margin-right: 30%;
    margin-left: 30%;
    background-color: mistyrose;
    margin-top: 15%;

    p{
        font-size: 0.8rem;
    }
    button{
        margin: 20px 30%;
    }
    button{
        background-color: wheat;
        border:0.5px solid black;
    }
    #passInput{
        margin-left: 0.6%;
    }
`
const ErrStyles = styled.div`
    color:red;
    font-size:0.8rem;
`

// initial values
const initialFormValues = {
    username: '',
    password: ''
};

const initialLoginErrors = {
    username: '',
    password: '',
};

export default function Register(props) {
    // state
    const [formErrors, setFormErrors] = useState(initialLoginErrors);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const postNewUser = newUser => {
        axios.post('http://localhost:3000/api/auth/register', newUser)
            .then(res => {
                localStorage.setItem('userId', res.data.id)
                localStorage.setItem('username', res.data.username)
                setFormValues(initialFormValues)
                axios.post('http://localhost:3000/api/auth/login', newUser)
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        history.push("/");
                    })
            })
            .catch(err => {
                console.log("Snake eyes")
            })
    };

    // form validation via yup
    const inputChange = (e) => {
        const { name, value } = e.target

        yup
            .reach(FormSchema, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [name]: ""
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })

        setFormValues({
            ...formValues,
            [name]: value
        })
    };

    // form functionality
    const submit = (e) => {
        e.preventDefault()
        const newUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
            role: 1
        }
        postNewUser(newUser)
    };

    useEffect(() => {
        FormSchema.isValid(formValues).then(valid => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <form onSubmit={submit}>
            <RegStyles className='form-input'>
                <h2>Create An Account</h2>
                <label>Name:&nbsp;
                <input
                        onChange={inputChange}
                        placeholder='your name here'
                        name='username'
                        type='text'
                    />
                </label>
                <label>Password:&nbsp;
                <input id="passInput"
                        onChange={inputChange}
                        placeholder='your password here'
                        name='password'
                        type='password'
                    />
                </label>
                <button id="register-btn" disabled={disabled}>Register</button>
            </RegStyles>
            <ErrStyles className='errors'>
                <p id="para-one">{formErrors.username}</p>
                <p id="para-two">{formErrors.password}</p>
            </ErrStyles>
        </form>
    )
};  