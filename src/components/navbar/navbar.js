import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './../../assets/logo.png';

class NavBar extends React.Component {
    state = {
        searchBox : '',
        search : {
            query : '',
            redirect : false,
            update : false
        }
    }

    toggleSearchUpdate = () => {
        const search = {...this.state.search};
        search.update = !search.update;
        this.setState({search});
    }

    toggleSearchRedirect = () => {
        const search = {...this.state.search};
        search.query = this.state.searchBox
        search.redirect = !search.redirect;
        this.setState({search});
    }

    searchRedirect = () => {
        if(this.state.search.redirect === true){
            const search = {...this.state.search};
            search.redirect = false;
            this.setState({search});
            return <Redirect to={`/search/${this.state.search.query}`}/>
        }
    }

    handleSearchBoxUpdate = event => {
        this.setState({searchBox : event.target.value});
    }
    
    render(){
        return (
            <nav className={"navbar"}>
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src={logo} alt={"brand-logo"} width="112" height="28"/>
                    </Link>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNav" to="">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="mainNav" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="field">
                            <p className="control">
                                <input className="input" type="text" placeholder="Search" onChange={this.handleSearchBoxUpdate}/>
                            </p>
                        </div>
                        <div className='field'>
                            <p className="control">
                                {this.searchRedirect()}
                                <button type="button" className="button" onClick={()=>this.toggleSearchRedirect()}>
                                    <span className="icon">
                                        <i className="fas fa-search"/>
                                    </span>
                                </button>
                            </p> 
                        </div>
                    </div>
                </div>
            </nav>

        );
    }
}

export default NavBar;
