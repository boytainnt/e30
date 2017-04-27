/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase'

class Favourite extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style= {{flexGrow:1}}>
                Your favorite here
            </div>
        );
    }

}

export default Favourite;

