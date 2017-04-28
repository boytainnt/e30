/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import FirebaseAPI from './../../services/firebase';

class Article extends Component {

    constructor() {
        super();
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    addToFavorite() {
        FirebaseAPI.addFavorite(this.props.uid, this.props.article.id)
    }

    render() {
        let {article} = this.props;
        return (
            <div style={styles.container}>
                <Link to={`/article/${article.id}`}>
                    <label style={styles.label}>
                        {article.title || ''}
                    </label>
                </Link>
                <div>
                    {this.props.isLogin
                        ? <Button onClick={this.addToFavorite}>
                            Add to Favorite
                        </Button>
                        : <span/>}
                </div>
                <hr/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.user.uid,
        isLogin: state.auth.token != undefined
    }
}

export default connect(mapStateToProps)(Article);


const styles = {
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1

    },
    label: {
        padding: 5,
        margin: 5,
        color: "rgb(214,214,214)",
        display: "inline-block",
        fontFamily: "monospace",
        fontSize: 32,
        textAlign: "center"
    },
    line: {
        height: 1,
        width: 100,
        backgroundColor: 'black'
    }
}

