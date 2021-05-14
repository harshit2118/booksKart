import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Books from './booksSelf';
import BookSelf from './booksSelf';
import MyShelf from './myShelf';
import NavBar from './navbar';
import SearchPage from './searchPage';
import Settings from './settings';
class MainComp extends Component{
    state={
        myBooks:[],
        filterOptions:{
            langCheck:true,
            filterCheck:true,
            printCheck:true,
            orderCheck:true,
            mainResults:"10",
        },
    }
    onOptionsChange=(options)=>{
        let s1={...this.state};
        s1.filterOptions={...options};
        this.setState(s1);
    }
    addToMyBooks=(book)=>{
        let s1={...this.state};
        s1.myBooks.push(book);
        this.setState(s1);
    }
    removeFromMyBooks=(book)=>{
        let s1={...this.state};
        let index=s1.myBooks.findIndex((x)=>x.id===book.id);
        s1.myBooks.splice(index,1);
        this.setState(s1);
    }
    render(){
        let {myBooks,filterOptions}=this.state;
        let {mainResults}=filterOptions;
        console.log(mainResults);
        return (
        <React.Fragment>
        <NavBar
        mainResults={mainResults}/>
        <Switch>
            <Route path="/myShelf" render={(props)=><MyShelf {...props} books={myBooks} addToMyBooks={this.addToMyBooks} removeFromMyBooks={this.removeFromMyBooks}/>}/>
            <Route path="/settings" render={(props)=><Settings {...props} filterOptions={filterOptions}  onOptionsChange={this.onOptionsChange}/>}/>
            <Route path="/books" render={(props)=><Books {...props} books={myBooks} addToMyBooks={this.addToMyBooks} removeFromMyBooks={this.removeFromMyBooks} filterOptions={filterOptions}/>}/>
            <Route path="/" component={SearchPage}/>
        </Switch>
        </React.Fragment>
        )
    }
}
export default MainComp;