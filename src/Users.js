import React, {Component, Fragment, useState, useEffect} from 'react';
import {get, set, update, del} from 'idb-keyval'
import {Table} from 'react-bootstrap'
export default function Users (props) {

    const [users, setUsers] = useState([])
    const [newUsers, setNewUsers] = useState([])
    const [mode, setMode] = useState('online')
    const [data, setData] = useState("")

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users";
        fetch(url)
        .then(response => response.json())
        .then(result => {
            setUsers(result/* .results */)
            set("users", (result/* .results */))
        }).catch(err => {
            console.log("en el catch")
            setMode('offline')
            get('users').then((val) => {
                setUsers(val)
            }) 
    
            
        })
    }, [])

    function getData (e) {
        e.preventDefault()
        setData(e.target.value)

        
    }

    function saveAndDeleteStorage (key) {
        get(key)
        .then(val => {
            console.log(val)
        })
        .then(() => {
            del(key)
        })
        .catch(err => console.error(err))
    }

    function setValue(e) {

        let formData = new FormData(document.getElementById("new-user"))
        console.log(formData.get('id'))

/*         if(!navigator.onLine) {
            console.log("puto")
        } else {
            console.log('estamos conectados')
            saveAndDeleteStorage('users')
        }


        let isSaved = get('test')
        if (isSaved) {
            console.log('habia algo')
            get('test').then(val => {
                set('test', data)
            })
        } else {
            console.log('no habia nada')
            set('test', data)
        } */
        
    }

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

                <form id ="new-user" name="new-user">
                    <input type="number" name="id" placeholder="Id"></input>
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="text" name="email "placeholder="Email"></input>
                </form>

                {<button onClick={setValue}>Enviar</button>}
                



        </Fragment>
    )

}








