import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {axiosWithAuth} from './axiosWithAuth';

const HeaderStyle = styled.div`
    display:flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
    margin: 0 0 2% 0;
    nav{
        display:flex;
    }
    button{
        width: 100px;
        margin: 1%;
        padding: 3px;
        background-color: mistyrose;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 1em;
        :hover{
            background-color: lightblue;
        }
    }
    .link{
        width: 100px;
        text-align: center;
        margin: 1%;
        padding: 3px;
        text-decoration: none;
        background-color: mistyrose;
        border: 1px solid black;
        border-radius: 5px;
        color: black;
        font-size: 1em;
        :hover{
            background-color: lightblue;
        }
    }
`

export function Header() {

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        window.location.reload()
    }

    return (
        <HeaderStyle>
            <nav>
                <button onClick={handleLogout}>Logout</button>
                <Link className="link" to="/">Home</Link>
            </nav>
        </HeaderStyle>
    )

};

export const Home = () => {
    // state
    const [userList, setUserList] = useState([]);

    const fetchUsers = () => {
        axiosWithAuth()
        .get('http://localhost:3000/api/users')
            .then(res => {
                console.log(res.data);
                setUserList([...res.data, ...userList])
            })
            .catch(err => {
                console.log("Snake eyes")
            })
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>USERS</h1>
            {
                userList.map(x => {
                return <div key={x.username}>
                    <p>***</p>
                    <p key={x.id}>{x.username}</p>
                </div>
                })
            }
        </div>
    )
};