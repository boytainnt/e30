/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Article from './../../component/Article'
import LoadingComponent from './LoadingComponent';
import {InfiniteLoader, AutoSizer, List} from 'react-virtualized'
import FirebaseAPI from './../../services/firebase'

const numberArticle  = 8;
class Home extends Component {

    constructor(){
        super();
        this.state ={
            data : [],
            lastKey : undefined,
            isFinished : false,
            isLoading:false,
            width: 0,
            height: 0
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this._rowRenderer = this._rowRenderer.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        console.log('fetching' + this.state.data.length)
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
            })
        });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        console.log('home fetch')
        this.fetchData()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
/*
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
*/

    _rowRenderer ({ index, key, style }) {
        const { loadedRowsMap, data } = this.state;

        const row = data[index];
        let content = <Article key ={index} article={row}/>

        return (
            <div
                key={key}
                style={style}
            >
                {content}
            </div>
        )
    }

    render() {
        let {data,isLoading,isFinished} = this.state;

        return (
            <div style= {{flexGrow:1}}>

                <InfiniteLoader
                    isRowLoaded={()=>isLoading}
                    loadMoreRows={this.fetchData}
                    rowCount={data.length}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <List
                                    ref={registerChild}
                                    onRowsRendered={onRowsRendered}
                                    rowCount={data.length}
                                    height = {this.state.height}
                                    rowHeight={50*1200/this.state.width+70}
                                    rowRenderer={this._rowRenderer}
                                    width={this.state.width}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>


                {isFinished?<div>End</div>:<div/>}
            </div>
        );
    }
}

export default Home;

