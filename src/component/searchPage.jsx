import React,{Component} from 'react';
class SearchPage extends Component{
    state={
        searchText:"",
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state};
        s1.searchText=input.value;
        this.setState(s1);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let json={};
        console.log("hello");
        console.log(this.state.searchText);
        json.q=this.state.searchText;
        this.props.history.push(`/books?q=${this.state.searchText}&startIndex=0&maxResults=10`)
    }
    render(){
        let {searchText}=this.state;
        return(
            <div className="text-center">
                <img src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=502&fit=crop&dpr=1"
                style={{borderRadius:"50%",width:"512px",height:"256px"}}/>
                <div className="row mt-3">
                    <div className="col-3"></div>
                    <input className="form-control col-6"
                    value={searchText}
                    onChange={this.handleChange}
                    placeholder="Search"/>
                    <div className="col-1">
                        <button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>Search Book</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchPage;