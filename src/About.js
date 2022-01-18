import React, {Component, Fragment} from 'react';

class About extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users:{}
        }
    }

    render () {
        return (
            <Fragment>
                <p>About Component</p>
            </Fragment>
        )
    }

}

export default About