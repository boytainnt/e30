/* eslint-disable */
import React, {Component} from 'react';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase'

class Home extends Component {

    constructor(props){
        super(props);
        this.state ={
            data : []
        }
    }

    componentDidMount(){
        console.log('fetch')

        this.setState({
            isLoading:true
        },async()=> {
            let data = await FirebaseAPI.getArticles(0, 8);
            this.setState({
                data: data || [],
                isLoading:false
            })
            console.log('fetch done')
        });
    }

    render() {
        let {data,isLoading} = this.state;
        if (isLoading){
            return(
                <span>Is Loading</span>
            )
        }
        return (
            <div style= {{flexGrow:1}}>
                {data.map((item,index)=><Article key ={index} article={item}/>)}
            </div>
        );
    }

}

export default Home;
