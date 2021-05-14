import React,{Component} from 'react';
class MyShelf extends Component{
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
        let {books}=this.props;
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-12 text-center text-warning bg-primary">{books.length?"My Books List":"No book added to MyBooks"}</div>
                    <div className="container"><div className="row">
                            {
                                books.map((x)=>{
                                    return <div className="col-2 ml-2 mb-2 p-2 border text-center text-wrap" style={{background:"green"}}>
                                        {x.volumeInfo.imageLinks?<img src={x.volumeInfo.imageLinks.thumbnail}/>:""}<br/>
                                        <b>{x.volumeInfo.title}</b><br/>
                                        {x.volumeInfo.authors?"Authors:"+x.volumeInfo.authors.map((x)=>x):""}<br/>
                                        {
                                            this.getBooksButton(x,books)
                                        }
                                    </div>
                                })
                            }
                        </div></div>
                </div>
            </React.Fragment>
        )
    }
}
export default MyShelf;