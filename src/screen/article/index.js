/* eslint-disable */
import React, {Component} from 'react';
import FirebaseAPI from './../../services/firebase';

class Article extends Component {

    constructor(props){
        super(props);
        this.state = {
            article : {},
            id: props.params.id
        }
    }

    async componentDidMount(){
        console.log('fetch article ' + this.state.id)
        this.setState({
            isLoading:true
        },async()=> {
            let data = await FirebaseAPI.getArticleById(this.state.id);
            this.setState({
                article: data || {},
                isLoading: false
            })
            console.log('fetch done')
        });
    }

    render() {
        let {article, isLoading} = this.state;

        if (isLoading){
            return(
                <span>Is Loading</span>
            )
        }

        return (<div>
            <h1>{article.title}</h1>
            <span>{article.description}</span>
        </div>);
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
        fontSize: "32",
        textAlign: "center"
    }
}

export default Article;
