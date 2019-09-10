import React, { Component } from 'react'
import AppSidebar from './AppSidebar'
import logo from '../assets/img/logo.jpeg'
import '../App.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Button,
    Badge
} from 'reactstrap'
import Dashboard from './Dashboard';
import InitialContext from '../context/InitialContext';

interface IProps{
    userName: string;
}

interface IState{
    isActive : boolean;
    activeCollection: string
}

class AppNavbar extends Component<IProps, IState> {
    static contextType = InitialContext;

    constructor(props:IProps){
        super(props);
        this.state = {
            isActive : false,
            activeCollection: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = () =>{
        this.setState({
            isActive : !this.state.isActive
        });
    }

   notify = (e: React.FormEvent<HTMLInputElement>, currentCollection:string) =>{
        if(e.currentTarget.classList.value.includes('active')){
            e.currentTarget.classList.remove('active')
            this.setState({isActive : false,activeCollection:''}, () => {
                this.context.updateSelected('')
              }); 
        }
        else{
            var els = document.getElementsByClassName("active list-group-item");
            for (var i = 0; i < els.length; i++) {
                els[i].classList.remove('active')
            }
            e.currentTarget.classList.add('active');
            this.setState({isActive : true ,activeCollection:currentCollection}, () => {
                this.context.updateSelected(currentCollection)
              });
        }
    }

    render() {

        return (
            <div>

             <div className="wrapper">
             <AppSidebar handleEvent={this.notify}/>
             <Dashboard/> 
            </div>


            <div className="content">
            <Navbar color= "dark" dark expand="lg" className="fixed-top mb-5">
            <NavLink id="sidebarCollapse" href="#"><span className="navbar-toggler-icon"></span></NavLink>
            <a className="navbar-brand" href="#" style={{float:'left',marginLeft:'30px', fontSize:'40px',display: 'block',width: '250px'}}>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="" style={{height:'50px', width:'100px',marginTop:'-10px'}} className="img-fluid flex-center"></img>  */}
            <span className="letter" data-letter="C">C</span>
            <span className="letter" data-letter="I">I</span><span className="rest">-Hub</span>
             </a>
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
            <a className="nav-link" href="#">Home
                <span className="sr-only">(current)</span>
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
            </li>
            </ul>
            </div>
            </div>
            </Navbar>
            </div>
                    
            <Navbar color= "dark" dark expand="lg" className="sticky-bottom">
            <div className="container">
            <ul className="foote_bottom_ul_amrc">
            <li><a href="http://webenlance.com">Home</a></li>
            <li><a href="http://webenlance.com">About</a></li>
            <li><a href="http://webenlance.com">Services</a></li>
            <li><a href="http://webenlance.com">Pricing</a></li>
            <li><a href="http://webenlance.com">Blog</a></li>
            <li><a href="http://webenlance.com">Contact</a></li>
            </ul>
            {/* <NavbarBrand href="/">Home</NavbarBrand> */}
            <p className="text-center" style={{margin:'1rem', color:'black'}}>Copyright @2019 | Designed With by: <a href="#">Ostan Dsouza</a></p>
            <ul className="social_footer_ul">
            <li><a href="http://webenlance.com"><i className="fa fa-facebook-f"></i></a></li>
            <li><a href="http://webenlance.com"><i className="fa fa-twitter"></i></a></li>
            <li><a href="http://webenlance.com"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="http://webenlance.com"><i className="fa fa-instagram"></i></a></li>
            </ul>
            </div>
            </Navbar>
            </div>
        );
    }
}

export default AppNavbar
