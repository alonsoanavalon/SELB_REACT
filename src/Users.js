import React, {Component, Fragment, useState, useEffect} from 'react';
import {get, set, update, del} from 'idb-keyval'
import {Table} from 'react-bootstrap'
export default function Users (props) {

    const [users, setUsers] = useState([])
    const [mode, setMode] = useState('online')

    useEffect(() => {

        let url = "https://selb.bond/test";

        setTimeout(() => {

            fetch(url)
            .then(response => response.json())
            .then(result => {
                setUsers(result.results)
                set("users", (result.results))
            }).catch(err => {
                setMode('offline')
                get('users').then((val) => {
                    setUsers(val)
                    
                }) 
            })

        }, 1000)


    }, [])


    function getDataAndPost (newUser) {

        fetch("https://selb.bond/test", {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(newUser) 
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }
    
    function printAndSave (){

        let formData = new FormData(document.getElementById("new-user"))
        console.log(formData.entries)

        let newUser = {
            id: formData.get('id'),
            name:formData.get('name'),
            email:formData.get('email')
        }

        setUsers([...users, newUser])
        getDataAndPost(newUser)

    }

    function printAndLocal () {

        let formData = new FormData(document.getElementById("new-user"))

        let newUser = {
            id: formData.get('id'),
            name:formData.get('name'),
            email:formData.get('email')
        }

        //Saving in useState (Render)

        setUsers([...users, newUser])

        //Saving in IDB

        get('newUsers')
        .then(res => {
            
            let isSaved = res
            console.log(isSaved, " IS SAVED ")
            if (isSaved === undefined) {
                set("newUsers", newUser)
            } else {
                get("newUsers")
                .then(savedUsers => {
                    console.log(savedUsers, "usuarios")
                    console.log(savedUsers.length, "LENGHT")
                    if (savedUsers.length === undefined) {
                        //alert("Agregando nuevo usuario 1")
                        set("newUsers", [savedUsers, newUser])
                    } else {
                        //alert("Agregando nuevo usuario 2")
                        set("newUsers", [...savedUsers, newUser])
                    }
                    setUsers([...users, newUser])
                })
            }
            set('users', [...users, newUser])
        })
        .catch(err => console.error(err))

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

    function setValueOnline () {
        printAndSave()
    }

    function setValueOffline () {
        printAndLocal()
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
                    <input type="text" name="email"placeholder="Email"></input>
                </form>
                {
                mode === 'offline' 
                ? <button onClick={setValueOffline}>Enviar Offline</button>
                : <button onClick={setValueOnline}>Enviar Online</button>
                }

        </Fragment>
    )

}








