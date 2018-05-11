import React from 'react';

import './navigation_bar.css';
import '../search_bar/search_bar.css';


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
      yourProfileClicked(){
        parentProps.userProfileClicked();
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
                    <NavItem><NavLink className="text-light" onClick={()=>refreshPage(parentProps)}>Home </NavLink></NavItem>
                    <NavItem><NavLink className="text-light" onClick={()=>this.yourProfileClicked()}>Your Profile</NavLink> </NavItem>

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
