/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Article from './../../component/Article'
import FirebaseAPI from './../../services/firebase'

class Favourite extends Component {

    constructor(){
        super();
        this.state ={
            data : [],
            lastKey : undefined,
            isLoading: false,
            isFinished : false
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        if (nextProps.isLogin != this.props.isLogin){
            console.log('new props')
            this.refreshData();
        }
    }

    fetchData(){
        if (this.state.isFinished) return;
        this.setState({
            isLoading:true
        },async()=> {
            let data = await FirebaseAPI.getFavorite(this.props.uid);

            this.setState({
                data: data,
                isLoading:false,
                isFinished: true
            })
            console.log('favorite fetch done')
        });
    }

    refreshData(){

        this.setState({
            data: [],
            isLoading: false,
            isFinished: false
        }, () => this.fetchData())

    }

    render() {

        let {data,isLoading,isFinished} = this.state;

        return (
            <div style= {{flexGrow:1}}>
                Your favorite here
                {data.map((item,index)=><Article key ={index} article={item} isFavourite={true}/>)}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.user.uid,
        isLogin: state.auth.isLogin
    }
}


export default connect(mapStateToProps)(Favourite);

