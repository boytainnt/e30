/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
class NewPost extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            isPosting: false
        }
    }

    handleKeyPress = () => {
        if (this.state.isPosting) return;
        console.log('press')
        console.log(this.title.value)
        this.setState({
            isPosting: true
        },()=> {
            FirebaseAPI.writeNewPost(this.title.value, this.content.value)
            this.setState({
                isPosting:false
            })
        });
    }

    render() {

        return (
            <div style={{flexGrow: 1}}>
                <h1>Post new article here</h1>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Title"
                        inputRef={ref => { this.title = ref; }}/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Content</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="Content"
                        inputRef={ref => { this.content = ref; }}/>
                </FormGroup>
                {this.state.isPosting?<div>Posting...</div>:<div/>}
                <Button onClick={this.handleKeyPress}>Submit</Button>
            </div>
        );
    }
}

export default NewPost;

