/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {Button,Glyphicon} from 'react-bootstrap';
import FirebaseAPI from './../../services/firebase';

class Article extends Component {

    constructor() {
        super();
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    addToFavorite() {
        let {article} = this.props;
        FirebaseAPI.addFavorite(this.props.uid, article)
    }

    //not show favourite button when not login
    //show 'add to favourite' if isFavourite = false
    //show 'favourited' if isFavourite = true
    renderFavourite(){

        if (!this.props.isLogin){
            return (<span/>)
        }

        //not implement yet in home
        if (this.props.isFavourite){
            return(
                <Button>
                    Favourited
                </Button>)
        }

        return(
            <Button onClick={this.addToFavorite}>
                <Glyphicon glyph="star" />
                 Favourite
            </Button>
        )

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
                    {this.renderFavourite()}
                </div>
                <hr/>
            </div>
        );
    }

}

Article.defaultProps = {
    isFavourite: false
};

const mapStateToProps = (state) => {
    return {
        uid: state.auth.user.uid,
        isLogin: state.auth.isLogin
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

