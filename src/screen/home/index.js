/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import LoadingComponent from './LoadingComponent';

import FirebaseAPI from './../../services/firebase'

const numberArticle  = 2;
class Home extends Component {

    constructor(){
        super();
        this.state ={
            data : [],
            lastKey : undefined,
            isFinished : false
        }
    }

    fetchData(){
        if (this.state.isFinished) return;
        this.setState({
            isLoading:true
        },async()=> {
            let data = await FirebaseAPI.getArticles(this.state.lastKey, numberArticle);

            //join
            let tempList = [...this.state.data];
            tempList = tempList.concat(...data)
            //get last key:
            let lastKey = tempList[tempList.length-1].id;

            this.setState({
                data: tempList,
                isLoading:false,
                lastKey: lastKey,
                isFinished: data.length < numberArticle
            }, ()=>this.fetchData())
        });
    }

    componentDidMount(){
        console.log('home fetch')
        this.fetchData()
    }

    render() {
        let {data,isLoading,isFinished} = this.state;

        return (
            <div style= {{flexGrow:1}}>
                {data.map((item,index)=><Article key ={index} article={item}/>)}
                {isLoading?<LoadingComponent/>:<div/>}
                {isFinished?<div>End</div>:<div/>}
            </div>
        );
    }

}

export default Home;

