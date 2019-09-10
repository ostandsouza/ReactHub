import React, { useContext, FC, useEffect, ReactComponentElement, useState, useRef, useMemo } from 'react'
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
import InitialContext from '../context/InitialContext';
import { FaStickyNote } from "react-icons/fa";
import axios from "axios";

const Suite: FC<IProps> = ({handleEvent, filterString}) => {
    const collectionData= useContext(InitialContext)
    var collectionName: Array<string> = new Array();
    var count: Array<string> = new Array();
    var jData: any = {};
    var data: IKeys; 
    var val: any[];

    const [getCollection, setcollectionList] = useState<any>('')
    const inputText = useRef<any>([React.createRef(), React.createRef()]);

    const refFunc = () => {
        inputText.current = inputText.current.splice(0, collectionData.Collections.length);
        for(let i = 0; i< collectionData.Collections.length; i++) {
            inputText.current[i] = inputText.current[i] || React.createRef();
        }
        inputText.current = inputText.current.map((item:any) => item || React.createRef());
        console.log("useEffect log:", inputText.current);
        if(typeof inputText.current !== 'undefined' && inputText.current.length > 0)
        console.log("single log:", inputText.current[0].current);
        return inputText
    }   

    const memoizedValue = useMemo(() =>refFunc(), [inputText.current]);

    useEffect(() => {
        console.log("useEffect:");
        if(!collectionData.Collections.toString().search("file")){
        const data = async() : Promise<any> =>{
            await Promise.all(collectionData.Collections.map(async (coll:string, index:number) => {
                try {
                    const res = await axios.post('/api/count',{"api": coll}) 
                    collectionName[index] = coll
                    count[index]= res.data.status.split(':')[1]
                } catch (e) {
                    console.log(`Axios request failed: ${e}`);
                } 
              }));
        
        return [collectionName,count]
    }
        data().then(res =>{
            console.log("len",res[0].length);
            console.log("len",res[1].length);
            for(var i=0;i<res[0].length;i++){
                jData[res[0][i]] = res[1][i];
            }
            console.log("jData",jData)
            setcollectionList(jData)
        })
    }
    },[collectionData.Collections])

     const openUrl = (e:React.MouseEvent<HTMLElement>)=>{
        var endpoint:string = e.currentTarget.innerText
        console.log(endpoint)
        var uri:string = 'http://upg-jira.int.thomsonreuters.com/browse/'
        var finalUrl = uri.concat(endpoint)
        //window.location.href = finalUrl;
        window.open(finalUrl,"_newtab" );    
      }

      const handleDelete = (e:React.MouseEvent<HTMLElement>, currentCollection:any)=>{
        var endpoint:any = e.currentTarget.getAttribute("id")
        val = collectionData.IssueMap
        collectionData.IssueMap.map(issue => {data = issue as IKeys
            if(data.Key == currentCollection){
                data.Value.map((value:string,index:number)=>{
                if(value == endpoint){
                    data.Value.splice(index,1)
                }   
                })
                collectionData.updateValue(val)
            }
        })
      }

      
      const toggleButton = (e:React.MouseEvent<HTMLElement>) =>{
          var index:any = e.currentTarget.getAttribute("id")
        //e.currentTarget.style.visibility='hidden'
        var button = document.getElementsByClassName("note note-edit");
        for (var i = 0; i < button.length; i++) {
            if(button[i].classList.value.includes('inactive'))
                button[i].classList.remove('inactive')
            button[i].classList.add('active')
        }
        button[index].classList.remove("active")
        button[index].classList.add('inactive')

        var textArea = document.getElementsByClassName("note note-editing");
        for (var i = 0; i < textArea.length; i++) {
            if(textArea[i].classList.value.includes('active'))
                textArea[i].classList.remove('active')
            textArea[i].classList.add('inactive')
        }
        textArea[index].classList.remove("inactive")
        textArea[index].classList.add('active')
        }   

        const closeButton = (e:React.MouseEvent<HTMLElement>) =>{
            var index:any = e.currentTarget.getAttribute("id")
            var button = document.getElementsByClassName("note note-edit");
            var textArea = document.getElementsByClassName("note note-editing");
            textArea[index].classList.remove("active")
            textArea[index].classList.add('inactive')
            button[index].classList.remove("active")
            button[index].classList.add('active')
        }

        const saveButton = (e:React.FormEvent<HTMLAnchorElement>, currentCollection:any) =>{
            e.preventDefault();
            var index:any = e.currentTarget.getAttribute("id")
            //val = [...getIssueList]
            val = collectionData.IssueMap
            collectionData.IssueMap.map(issue => {data = issue as IKeys
                if(data.Key == currentCollection){
                    data.Value.push(memoizedValue.current[index].current.value)
                    collectionData.updateValue(val)
                }
            })
            var button = document.getElementsByClassName("note note-edit");
            var textArea = document.getElementsByClassName("note note-editing");
            textArea[index].classList.remove("active")
            textArea[index].classList.add('inactive')
            button[index].classList.remove("active")
            button[index].classList.add('active')
            memoizedValue.current[index].current.value = ''
        }

        const onEnterPress = (e:any, currentCollection:any) => {
            var index:any = e.currentTarget.getAttribute("id")
            if(e.keyCode == 13 && e.shiftKey == false) {
              e.preventDefault();
              val = collectionData.IssueMap
              collectionData.IssueMap.map(issue => {data = issue as IKeys
                  if(data.Key == currentCollection){
                      data.Value.push(memoizedValue.current[index].current.value)
                      collectionData.updateValue(val)
                  }
              })
              var button = document.getElementsByClassName("note note-edit");
              var textArea = document.getElementsByClassName("note note-editing");
              textArea[index].classList.remove("active")
              textArea[index].classList.add('inactive')
              button[index].classList.remove("active")
              button[index].classList.add('active')
              memoizedValue.current[index].current.value = ''
            }
          }

          let filteredCollection = collectionData.Collections.filter((collect:string) =>{
            return collect.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        })

    return (
        <React.Fragment>
            <ListGroup>
            {filteredCollection && filteredCollection.map((coll,index:any) =>
            <ListGroupItem onClick={(event)=>handleEvent(event,coll)} key={coll}>
            <span className="selected">
                    <span className="triangle"></span>
                    <i className="fa fa-check"></i>
            </span>
            <div className="system-lists"></div>
            <ListGroupItemHeading>{coll}<Badge className="badge-pill">{getCollection[coll]}</Badge></ListGroupItemHeading>
            <ListGroupItemText>
            {collectionData.IssueMap && collectionData.IssueMap.some(issue => {data = issue as IKeys
                        if(data.Key == coll)
                        return val = data.Value
                        else 
                        val = []})}

            {val && val.map(issueList => 
                <Badge className="badge-pill" color="secondary" key={issueList}>
                    <Badge  href="javascript:void(0)" onClick={(event)=>openUrl(event)}>
                            {issueList}</Badge>
                <button id={issueList} type="button" className="close" aria-label="Dismiss" onClick={(event)=>handleDelete(event,coll)}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </Badge>
                )}  
            </ListGroupItemText>
            <div className="note-container">
                <p className="note note-edit active">
                    <Button className="btn-group-xs" id={index} onClick={(event)=>toggleButton(event)}><FaStickyNote/>Add Issue</Button>
                </p>
                <div className="note note-editing inactive">
                {/* <form ref={el => this.myFormRef = el} onSubmit={this.searchClick} autoComplete="off"> */}
                <textarea id={index} className="IssueText" placeholder="Add new issue..." name="NewIssue" onKeyDown={(event)=>onEnterPress(event, coll)} ref={inputText.current[index]}></textarea>
                <a href="javascript:void(0)" className="btn btn-primary btn-group-xs" id={index} onClick={(event)=>saveButton(event,coll)} style={{margin:'4px'}}>Save</a>
                <a href="javascript:void(0)" className="btn btn-primary btn-group-xs" id={index} onClick={(event)=>closeButton(event)}>Cancel</a>
                {/* </form> */}
                </div>
            </div>
            </ListGroupItem>
            )}
            </ListGroup>
        </React.Fragment>
    )
}

export default Suite

interface IKeys { 
    Key: string,
    Value: any[] 
}

interface IProps {
    handleEvent: any
    filterString: string
}