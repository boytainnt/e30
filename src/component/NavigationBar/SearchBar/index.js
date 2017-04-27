import React, {Component} from 'react';

export default class SearchBar extends React.Component {
    render() {
        return (
            <span style={styles.container}>
                <input type="text" placeholder="Search..."/>
            </span>
        );
    }
}

const styles = {
    container:{
        borderRadius:10,
        width:1000
    },
    searchBox:{

    }
}