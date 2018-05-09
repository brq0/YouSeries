import React, { Component } from 'react';
import $ from 'jquery';

import './navigation_bar.css';
import '../search_bar/search_bar.css';

import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem } from 'reactstrap';

import {
  Route,
  HashRouter
} from "react-router-dom";

import SearchBar from '../search_bar/search_bar';
import SignOut from '../logon/SignOut'

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

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

    return(

        <div>
          <div style={{borderBottom: "2px solid #cc0411"}}>
            <div className="header">

              <Navbar color="dark" dark expand="md">

                <NavbarBrand className="active" id="logo"></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse id="navBtn" isOpen={this.state.isOpen} navbar style={{width: '100%'}} >

                  <Nav className="m1-auto" navbar style={{width:'100%'}}>
                    <NavItem><Link className="text-light" to="/">Home </Link></NavItem>
                    <NavItem><Link className="text-light" to="/account">Your Profile</Link> </NavItem>
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
