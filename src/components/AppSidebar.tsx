import React, { FC, useState, useRef } from 'react'
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
import { DiJira, DiAtlassian } from "react-icons/di";
import { FaGitlab, FaJenkins } from "react-icons/fa";
import { MdAccountCircle, MdNotifications, MdNotificationsOff } from "react-icons/md";
import { IconContext } from "react-icons";
import Suite from './Suite';


const AppSidebar: FC<any> = ({handleEvent}) => {
    const [getSearchList, setSearchList] = useState<string>('')
    const inputFilter = useRef<HTMLInputElement>(null);

    const updateSearch = () =>{
        setSearchList(inputFilter.current!.value)
        console.log(getSearchList)
    }

    return (
        <React.Fragment>
        <nav id="sidebar">
           <br/>
            <br/>
            <br/>
            <div className="sidebar-header">      
                 <div className="logo-wrapper waves-light">
                    <a href="#"><img src={"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} className="img-fluid flex-center" style ={{maxWidth:'70%', maxHeight:'70%', paddingLeft:'80px', paddingTop: '10px'}}></img></a>
                </div>
                 {/* <h3  style={{marginLeft:'1.5em'}}>BOOTSTRAP SIDEBAR</h3> https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg*/}
            </div>
            <br/>
            <p className="social-links">
                <a href="http://upg-jira.int.thomsonreuters.com/login.jsp" title="Raise Jira ticket" className="jira" target="_blank">
                <IconContext.Provider
                value={{ color: 'white', size: '40px' }}>
                <DiJira/>
                </IconContext.Provider>
                </a>
                <a href="http://upg-confluence.int.thomsonreuters.com/dologin.action" title="Visit Confluence site" className="confluence" target="_blank">
                <IconContext.Provider
                value={{ color: 'white', size: '40px' }}>
                <DiAtlassian/>
                </IconContext.Provider>
                </a>
                <a href="https://git.sami.int.thomsonreuters.com/users/sign_in" title="Manage GitLab projects" className="gitlab" target="_blank">
                <IconContext.Provider
                value={{ color: 'white', size: '40px' }}>
                <FaGitlab/>
                </IconContext.Provider>
                </a>
                <a href="http://localhost:8080/login?from=%2F" title="Manage Jenkins pipeline" className="jenkins" target="_blank">
                <IconContext.Provider
                value={{ color: 'white', size: '40px' }}>
                <FaJenkins/>
                </IconContext.Provider>
                </a>
            </p>


            <br />

            <InputGroup>
            <input type='text' id='filters' placeholder='Filter...' ref={inputFilter} value={getSearchList} onChange={updateSearch}/>
            <i className="fa fa-search" style={{position: 'absolute',marginLeft:'30px',marginTop:'10px', color:'#03a9f4'}}></i> 
            {/* <InputGroupAddon addonType="append">
                <Button color="secondary"></Button>
            </InputGroupAddon>*/}
            </InputGroup>

            <br />
            
            {/* <button className="btn btn-primary btn-group-xs" onClick={()=>addCollection()} style={{margin:'4px'}}>ADD</button>
            <button className="btn btn-primary btn-group-xs" onClick={(event)=>deleteCollection(event)}>DELETE</button> */}
            <div className="slimScrollDiv" style={{position: 'relative', overflow: 'auto', width: 'auto',height: '700px'}}>
            <Suite handleEvent={handleEvent} filterString={getSearchList}/>
            </div>
            </nav>
        </React.Fragment>   
    )
}

export default AppSidebar
