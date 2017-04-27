/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase'

class NewPost extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style= {{flexGrow:1}}>
               Post new article here
            </div>
        );
    }

}

export default NewPost;

