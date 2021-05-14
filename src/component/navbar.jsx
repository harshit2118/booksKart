import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class NavBar extends Component{
    render(){
        let {mainResults}=this.props;
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                <i class="fas fa-book-open"></i>
                </Link>
                <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-taget="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to={`/books?q=Harry Potter&startIndex=0&maxResults=${mainResults}`}>Harry Potter</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={`/books?q=Agatha Christie&startIndex=0&maxResults=${mainResults}`}>Agatha Christie</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={`/books?q=Premchand&startIndex=0&maxResults=${mainResults}`}>Premchand</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={`/books?q=Jane Austen&startIndex=0&maxResults=${mainResults}`}>Jane Austen</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/myShelf'>My Books</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/settings'>Settings</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;