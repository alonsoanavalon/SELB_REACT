import React, {Component, Fragment, useState, useEffect} from 'react';
import {Table} from 'react-bootstrap'
export default function Users (props) {

    const [users, setUsers] = useState([])
    const [mode, setMode] = useState('online')

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";
        fetch(url)
        .then(response => response.json())
        .then(result => {
            setUsers(result/* .results */)
            localStorage.setItem("users", JSON.stringify(result/* .results */))
        }).catch(err => {
            setMode('offline')
            let collection = localStorage.getItem("users")
            setUsers(JSON.parse(collection))
        })
    }, [])

    const displayUsers = () => {
        return users.map(user => (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>

        ))
        
    }


    return (
        <Fragment>
            <p>Users Component</p>
            {
                mode === 'offline' 
                ? <div className="alert alert-danger" role="alert">You are in offline mode</div>
                : <div className="alert alert-primary" role="alert">Your are in online mode</div>
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers()}
                </tbody>
            </Table>
        </Fragment>
    )

}








