import React,{Component} from 'react';
import queryString from 'query-string';
import http from '../httpBooks'
import Options from './options'
class Books extends Component{
    state={
        data:{},
        languageArr:[{value:"en",text:"English"},
        {value:"fr",text:"French"},
        {value:"hi",text:"Hindi"},
        {value:"es",text:"Spanish"},
        {value:"zh",text:"Chinese"},
        ],
        filterArr:[
            {value:"partial",text:"Partial Volume"},
            {value:"full",text:"Full Volume"},
            {value:"free-ebooks",text:"Free Google e-Books"},
            {value:"paid-ebooks",text:"Paid Google e-Books"},
        ],
        printTypesArr:[
            {value:"all",text:"All"},
            {value:"books",text:"Books"},
            {value:"magazines",text:"Magazines"},
        ],
        orderArr:["newest","relevance"],

    }
    handleOptionChange=(options)=>{
        //console.log(options);
        options.startIndex=0;
        options.maxResults=10;
        this.callURL("/books",options);
    }
    callURL=(url,options)=>{
        //console.log(options)
        let searchStr=this.makeSerachStr(options);
        //console.log(searchStr);
        this.props.history.push({
            pathName:url,
            search:searchStr,
        })
    }
    makeSerachStr=(options)=>{
        let {q,filter,langRestrict,printType,startIndex,orderBy,maxResults}=options
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"q",q);
        searchStr=this.addToQueryString(searchStr,"filter",filter);
        searchStr=this.addToQueryString(searchStr,"langRestrict",langRestrict);
        searchStr=this.addToQueryString(searchStr,"printType",printType);
        searchStr=this.addToQueryString(searchStr,"orderBy",orderBy);
        searchStr=this.addToQueryString(searchStr,"startIndex",startIndex);
        searchStr=this.addToQueryString(searchStr,"maxResults",maxResults);
        return searchStr;
    }
    addToQueryString=(searchStr,name,value)=>{
        return value?
        searchStr?`${searchStr}&${name}=${value}`
        :`${name}=${value}`
        :searchStr;
    }
    async fetchData(){
        let queryParams=queryString.parse(this.props.location.search);
        ////console.log(queryParams);
        let searchStr=this.makeSerachStr(queryParams);
        ////console.log(searchStr);
        let response = await http.get(`/books/v1/volumes?${searchStr}&api-key=AIzaSyCCGPVgN0UXYW_a4YddKjTwmd-rrOAOHgI`);
       // //console.log(response);
        let {data}=response;
        this.setState({data:data});
    }
    componentDidMount(){
        this.fetchData()
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props) this.fetchData();
    }
    updatePage=(num)=>{
        let queryParams=queryString.parse(this.props.location.search);
        console.log(queryParams);
        let {startIndex="0",maxResults="10"} = queryParams;
        let newStartIndex="";
        if(num===0){
            newStartIndex=parseInt(startIndex)-parseInt(maxResults);
        }
        else{
            newStartIndex=parseInt(startIndex)+parseInt(maxResults);
        }
        queryParams.startIndex=newStartIndex;
        this.callURL("/home",queryParams);
    }
    getBooksButton=(book,books)=>{
        if(books.length)
        {
            if(books.find((x)=>x.id==book.id)){
                return <button className="btn btn-secondary" onClick={()=>this.props.removeFromMyBooks(book)}>Remove From MyBooks</button>
            }
            else{
                return <button className="btn btn-secondary" onClick={()=>this.props.addToMyBooks(book)}>Add to MyBooks</button>
            }
        }
        else{
            return <button className="btn btn-secondary" onClick={()=>this.props.addToMyBooks(book)}>Add to MyBooks</button>
        }
    }
    render(){
        let {data={},languageArr,filterArr,printTypesArr,orderArr}=this.state;
        let {items=[]}=data;
        let {books,filterOptions}=this.props;
        console.log(filterOptions);
        let queryParams=queryString.parse(this.props.location.search);
        let {q,startIndex,maxResults}=queryParams
        //console.log(data);
        return(
            <div className="container m-4">
                <div className="row">
                    <div className="col-3">
                        <Options
                        options={queryParams}
                        languageArr={languageArr}
                        filterArr={filterArr}
                        printTypesArr={printTypesArr}
                        orderArr={orderArr}
                        filterOptions={filterOptions}
                        onOptionsChange={this.handleOptionChange}/>
                    </div>
                    <div className="col-9">
                    <div className="row">
                        <div className="col-4"></div><div className="col-4"><h4 className="text-warning">{q+" Books"}</h4></div>
                        <div className="col-12 text-success">{(parseInt(startIndex)+1)+" to "+((parseInt(startIndex))+parseInt(filterOptions.mainResults)+" entries")}</div><br/>
                            {
                                items.map((x)=>{
                                    return <div className="col-3 ml-1 mb-1 p-2 border text-center" style={{background:"green"}}>
                                        {x.volumeInfo.imageLinks?<img src={x.volumeInfo.imageLinks.thumbnail}/>:""}<br/>
                                        <b>{x.volumeInfo.title}</b><br/>
                                        {x.volumeInfo.authors?"Authors:"+x.volumeInfo.authors.map((x)=>x):""}<br/>
                                        {
                                            this.getBooksButton(x,books)
                                        }
                                    </div>
                                })
                            }
                        </div>
                        <div className="row">
                                <div className="col-1">{startIndex==0?"":<button className="btn btn-warning" onClick={()=>this.updatePage(0)}>Previous</button>}</div>
                                <div className="col-10"></div>
                                <div className="col-1">{parseInt(startIndex)+parseInt(filterOptions.mainResults)>parseInt(data.totalItems)?"":<button className="btn btn-warning" onClick={()=>this.updatePage(1)}>Next</button>}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Books;