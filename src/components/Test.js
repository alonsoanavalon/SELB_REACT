import React, {Component} from 'react';

class Test extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            users: {}
        }
    }


    componentDidMount() {
        fetch("https://selb.fun/test")
        .then(res => res.json())
        .then(data => this.setState({users: data.results[0]}))


    }


    
    render () {
        const name = "pepe"

        return(
            <div>
                <h1>Hello</h1>
                <p>{name}</p>
                
            </div>
            )
            
        }
    }

export default Test;