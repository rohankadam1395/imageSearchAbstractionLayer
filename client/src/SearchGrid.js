import React from "react";
class SearchGrid extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(<div>
            <div className="searchGrid">{this.props.apiData.map((data,index)=>{
return <div key={index} className="images"><img className="imagesSrc" alt={data.title} src={data.link}></img></div>
        })}</div>

        </div>);
    }
}
export default SearchGrid;