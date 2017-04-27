/* eslint-disable */
import React, {Component} from 'react';
import SearchBar from './SearchBar'

class NavigationBar extends Component {

    render() {
        return (
            <div style= {styles.container}>
               <label style={styles.label}>
                   e30
               </label>
                <SearchBar/>
            </div>
        );
    }

}


const styles = {
    container:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(0,0,0)',
        flexGrow:1
    },
    label:{
        padding: 5,
        margin: 5,
        color: "#ffffff",
        display: "inline-block",
        fontFamily: "monospace",
        fontSize: "32",
        textAlign: "center"
    },
    searchBar:{

    }
}

export default NavigationBar;
