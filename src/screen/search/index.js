/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoading: false,
            isFinished: false
        }
        this.searchText = props.params.searchText
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        if (this.state.isFinished || this.state.isLoading) return;

        this.setState({
            isLoading:true
        },async()=> {
            let data = await FirebaseAPI.searchArticles(this.searchText);

            this.setState({
                data: data,
                isLoading:false,
                isFinished: true
            })
            console.log('search fetch done')
        });
    }

    render() {
        let {isLoading, data} = this.state;

        if (isLoading){
            return(
                <div>
                    searching...
                </div>
            )
        }

        return (
            <div>
                <div>
                    Search
                </div>
                {data.map((item,index)=><Article key ={index} article={item}/>)}
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

export default Search;
