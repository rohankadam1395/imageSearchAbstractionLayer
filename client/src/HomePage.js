import axios from 'axios';
import React from 'react';
import './HomePage.css';
import SearchGrid from "./SearchGrid";
import RecentSearches from './RecentSearches';
import {IconContext} from 'react-icons';
import {FaHistory,FaSearch} from 'react-icons/fa';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.apiCall=this.apiCall.bind(this);
        this.searchTextChange=this.searchTextChange.bind(this);
        this.recentSearch=this.recentSearch.bind(this);
        this.state={
            apiData:[],
            search:"",
            searchInput:"inputSearchcss",
            recentSearch:[{}],
            toggle:true
        }
    }
    searchTextChange(event){
        //console.log(event.target.value);
this.setState({
    search:event.target.value,
    searchInput:"inputSearchcss"
})
    }


    recentSearch(){
        if(this.state.toggle){
            axios.get('/data').then(response=>{
                console.log("Getting the below data from database");
                console.log(response.data);
                this.setState({
                    toggle:!this.state.toggle,
                    recentSearch:response.data
                })
            
            });
        }else{
            this.setState({
                toggle:!this.state.toggle,
            })
        }

    }
    apiCall(){
        if(this.state.search===""){
this.setState({
    searchInput: "inputSearchcssError"
})
        }else{

        
axios.get('/api',{
    params:{
        "search":this.state.search
    }
}).then(response=>{
    console.log("Got the response from google");
    console.log(response);
    this.setState({
        toggle:true,
        apiData:response.data
    })
}).catch(err=>{
    console.log(err);
});


axios.post('/data',{searchQuery:this.state.search}).then(response=>{
    console.log("Sending to server the search data and then getting a success message");
    console.log(response);
});
        }
    }
    render(){
        return(<div className="home">
<header><h2>Image Search Component</h2></header>
<div className="headSearch">
<input type="text" className={this.state.searchInput} value={this.state.search} onChange={this.searchTextChange}></input>
<IconContext.Provider value={{style:{fontSize:'30px'}}}><FaSearch onClick={this.apiCall}></FaSearch></IconContext.Provider>
</div>
<div className="recentSearches"><IconContext.Provider value={{style:{fontSize:'30px'}}}><FaHistory onClick={this.recentSearch}></FaHistory></IconContext.Provider></div>
{this.state.toggle ?<SearchGrid apiData={this.state.apiData}/> :<RecentSearches recentSearch={this.state.recentSearch}/>  }
    
    


        </div>);
    }
}
export default Home;