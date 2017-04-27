/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router'

class Article extends Component {

    render() {
        let {article} = this.props;
        return (
            <div style= {styles.container}>
                <Link to={`/article/${article.id}`}>
                    <label style={styles.label}>
                        {article.title||''}
                    </label>
                </Link>
                <hr/>
            </div>
        );
    }

}

const styles = {
    container:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        flexGrow:1

    },
    label:{
        padding: 5,
        margin: 5,
        color: "rgb(214,214,214)",
        display: "inline-block",
        fontFamily: "monospace",
        fontSize: 32,
        textAlign: "center"
    },
    line:{
        height:1,
        width:100,
        backgroundColor:'black'
    }
}

export default Article;
