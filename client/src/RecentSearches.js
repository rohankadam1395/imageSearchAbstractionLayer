import React from 'react';

class RecentSearches extends React.Component{
    constructor(props){
        super(props);
    
    }

render(){
    return(<div className="recentSearchesList">
        {this.props.recentSearch.map((data,index)=>{
            return <div className="recentItem" key={index}>{data.query}</div>
        })}
        </div>);
}

}

export default RecentSearches;