import React from 'react';

import './navigation_bar.css';
import '../search_bar/search_bar.css';

import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


import SearchBar from '../search_bar/search_bar';
import SignOut from '../logon/SignOut'


function refreshPage(props){
  props.resetPage();
}

let parentProps;

class NavigationBar extends React.Component {
      constructor(props) {
        super(props);

        parentProps = props;
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

  render(){
    const logoutBtn = this.state.isOpen ? <NavItem className="logoutBtn-open"><NavLink><SignOut /></NavLink></NavItem>
                                        : <NavItem className="logoutBtn"><NavLink><SignOut /></NavLink></NavItem>

    const url = document.URL.toString();
    let ifAccount = false;
    if(url.match('account')){
      ifAccount = true;
    }

    const homeButton =  ifAccount ? <Link className="text-light nav-link" to="/">Home </Link>
: <NavLink className="text-light" onClick={()=>refreshPage(parentProps)}>Home </NavLink>

    return(

        <div>
          <div style={{borderBottom: "2px solid #cc0411"}}>
            <div className="header">

              <Navbar color="dark" dark expand="md">

                <NavbarBrand className="active" id="logo"></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse id="navBtn" isOpen={this.state.isOpen} navbar style={{width: '100%'}} >

                  <Nav className="m1-auto" navbar style={{width:'100%'}}>
                    <NavItem>{homeButton}</NavItem>
                    <NavItem><Link className="text-light nav-link" to="/account">Your Profile</Link> </NavItem>
                    <NavItem><NavLink className="active" id="search">
                      <SearchBar pickShow={parentProps.pickShow}
                        searchSeries={parentProps.searchSeries}/>
                    </NavLink></NavItem>
                    {logoutBtn}

                  </Nav>

                </Collapse>
              </Navbar>

            </div>
          </div>
        </div>


    );
  }

}

export default NavigationBar;
