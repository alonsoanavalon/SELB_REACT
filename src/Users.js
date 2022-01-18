import React, {Component, Fragment} from 'react';

class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users:{}
        }
    }

    render () {
        return (
            <Fragment>
                <p>Users Component</p>
            </Fragment>
        )
    }

}

export default Users
