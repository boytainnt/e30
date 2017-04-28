/* eslint-disable */
import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux';
import FirebaseAPI from './../../services/firebase'

//for modal show
const ModalConstant = {
    loginAlert: {
        header: 'Alert',
        content: 'You must to login!!!'
    },
    postSuccess:{
        header: 'Success',
        content: 'Create new article successfully'
    },
    postFail:{
        header: 'Alert',
        content: 'Enter title and content of your post!!!'
    }
}


class NewPost extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            isPosting: false,
            postFailAlert: false,
            postSuccessAlert:false,
            loginAlert:false,
        }
    }

    handleKeyPress = () => {

        //checkin:
        if (this.state.isPosting) return;

        if (this.title.value.length === 0 || this.content.value.length ===0){
            this.setState({
                postFailAlert:true
            })
            return;
        }

        if (!this.props.isLogin){
            this.setState({
                loginAlert:true
            })
            return;
        }

        //post:
        console.log('press')
        console.log(this.title.value)
        this.setState({
            isPosting: true
        },()=> {
            FirebaseAPI.writeNewPost(this.title.value, this.content.value)
            this.setState({
                isPosting:false,
                postSuccessAlert:true
            })
        });
    }

    renderModal(){

        let  modalConst = this.state.postSuccessAlert
                            ?   Modal.postSuccess
                            :   this.state.postFailAlert
                                    ? ModalConstant.postFail
                                    : ModalConstant.loginAlert;

        return(
            <Modal show={this.state.loginAlert || this.state.postSuccessAlert || this.state.postFailAlert}>
                <Modal.Header>
                    <Modal.Title>{modalConst.header}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {modalConst.content}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=>{
                        this.setState({
                            postSuccessAlert:false,
                            postFailAlert:false,
                            loginAlert:false
                        })
                    }}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        )
    }

    render() {

        let {isPosting} = this.state;

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
                <Button
                    disabled={isPosting}
                    onClick={this.handleKeyPress}>
                    {isPosting?'Posting...':'Submit'}
                </Button>
                {this.renderModal()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    }
}

export default connect(mapStateToProps)(NewPost);

