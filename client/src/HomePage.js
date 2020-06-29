import axios from 'axios';
import React from 'react';
import './HomePage.css';
import SearchGrid from "./SearchGrid";
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
            recentSearch:[],
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
axios.get('/data').then(response=>{
    console.log(response.data);
    this.setState({
        toggle:!this.state.toggle,
        recentSearch:response.data
    })

});
    }
    apiCall(){
        if(this.state.search==""){
this.setState({
    searchInput: "inputSearchcssError"
})
        }else{

        
axios.get('/api',{
    params:{
        "search":this.state.search
    }
}).then(response=>{
    console.log(response);
    this.setState({
        toggle:true,
        apiData:response.data
    })
}).catch(err=>{
    console.log(err);
});
        }
    }
    render(){
        return(<div className="home">
<header><h2>Image Search Component</h2></header>
<div className="headSearch">
<input type="text" className={this.state.searchInput} value={this.state.search} onChange={this.searchTextChange}></input>
<button onClick={this.apiCall}>Click Here</button>
</div>
<p className="recentSearches"><a href="#" onClick={this.recentSearch}>Recent Searches</a></p>
{this.state.toggle ?<SearchGrid apiData={this.state.apiData}/> :<div>
        <ul>
        {this.state.recentSearch.map((data,index)=>{
            return <li key={index}>{data}</li>
        })}
        </ul>
        </div>  }
    
    


        </div>);
    }
}
export default Home;