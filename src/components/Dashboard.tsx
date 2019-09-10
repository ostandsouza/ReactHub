import React, { useState, useEffect, useContext, useMemo } from 'react'
import { FaTimes, FaCheck, FaExclamation, FaBars } from "react-icons/fa";
import Card from './Card';
import { IconContext } from 'react-icons';
import '../App.css';
import Progress from './Progress';
import { useHttp } from '../hooks/Http';
import InitialContext from '../context/InitialContext';
import Pagination from './Pagination';
import Reports from './Reports';
import axios from "axios";

const Dashboard = () => {
  const TestcaseData= useContext(InitialContext)
  //const [ReportAPI] = useHttp('/api/read',{"api": TestcaseData.Selected},[TestcaseData.Selected])
  const [getReport, setReport] = useState<IReport[]>([])

  //var singleReport: IReport[]
  var failures:number= 0
  var passing:number= 0
  var skipped:number= 0
  var inTotal:number= 0
  const [getPercentage, setPercentage] = useState<INumber>({
    Fail: 0,
    Pass: 0,
    Skip: 0
})
const [initPercentage, setinitPercentage] = useState<INumber>({
  Fail: 0,
  Pass: 0,
  Skip: 0
})

const [getresult, setresult] = useState<INumber>({
  Fail: 0,
  Pass: 0,
  Skip: 0
})

useEffect(() => {
  var resp:IReport[]
  if(TestcaseData.Selected!==""){
      const data = async() : Promise<any> =>{
              try {
                resp = await axios.post('/api/read',{"api": TestcaseData.Selected}) 
              } catch (e) {
                  console.log(`Axios request failed: ${e}`);
              } 
              return resp
          };
          data().then(res=>{
            console.log("data status",res.data.status.length)
            if(res.data.status.length > 0)
              setReport(res.data.status)
            else
              setReport([])
          })
      }
},[TestcaseData.Selected])
  
  // useEffect(() => {
  //   if(ReportAPI.status.length > 0){
  //     setReport(ReportAPI.status)
  //     console.log("asdabcd")
  //   }
  //   else {
  //     setReport([])
  //     console.log("abcd")
  //   }
  // },[ReportAPI])

  useEffect(() => {
    if(typeof getReport !== 'undefined' && getReport.length > 0){
    for (var i = 0; i < getReport.length; i++) {
     if(getReport[i].FailedTestCases !== undefined  && getReport[i].PassedTestCases !== undefined && getReport[i].SkippedTestCases !== undefined && getReport[i].TotalTestCases !== undefined){
      failures+=Number.parseInt(getReport[i].FailedTestCases.toString())
      passing+=Number.parseInt(getReport[i].PassedTestCases.toString())
      skipped+=Number.parseInt(getReport[i].SkippedTestCases.toString())
      inTotal+=Number.parseInt(getReport[i].TotalTestCases.toString())
     }
  }
  setresult({Fail:failures,Pass:passing,Skip:skipped})
  TestcaseData.updateTestcases({Fail:failures,Pass:passing,Skip:skipped})
  setPercentage({Fail:Math.round((failures/inTotal)*100),Pass:Math.round((passing/inTotal)*100),Skip:Math.round((skipped/inTotal)*100)})
  setinitPercentage({Fail:Math.floor((failures/inTotal)*100),Pass:Math.floor((passing/inTotal)*100),Skip:Math.floor((skipped/inTotal)*100)})
  }
  else{
    setresult({Fail:0,Pass:0,Skip:0})
    TestcaseData.updateTestcases({Fail:0,Pass:0,Skip:0})
    setinitPercentage({Fail:0,Pass:0,Skip:0})
    setPercentage({Fail:0,Pass:0,Skip:0})
  }
  },[getReport])

    const [getType, setType] = useState<IObject>({
        Fail: 'Failed Testcases',
        Pass: 'Passed Testcases',
        Skip: 'Skipped Testcases'
    })

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemPerPage, setItemPerPage] = useState<number>(10)
    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = getReport.slice(indexOfFirstItem,indexOfLastItem)

    const paginate = (pagenumber:number) => {
      setCurrentPage(pagenumber)
    }

    const toggleSelected = (e: React.ChangeEvent<HTMLInputElement>, index:number) =>{
      if(e.target.checked && !e.currentTarget.classList.contains("checked")){
          // console.log("reports",currentItems[index]);
          e.currentTarget.classList.add('checked');
          console.log("asdasd",e.target)
          TestcaseData.updateTestcases({Fail:currentItems[index].FailedTestCases,Pass:currentItems[index].PassedTestCases,Skip:currentItems[index].SkippedTestCases})
          setPercentage({Fail:Math.floor((currentItems[index].FailedTestCases/currentItems[index].TotalTestCases)*100),Pass:Math.floor((currentItems[index].PassedTestCases/currentItems[index].TotalTestCases)*100),Skip:Math.floor((currentItems[index].SkippedTestCases/currentItems[index].TotalTestCases)*100)})

      }
      else{
          var els = document.getElementsByClassName("tick checked");
          console.log("asdasd",els)
          // for (var i = 0; i < els.length; i++) {
          //     els[i].classList.remove('checked')
          //     els[i].getAttribute("checked")

          // }
          e.target.checked = false
          e.currentTarget.classList.remove('checked');
          TestcaseData.updateTestcases(getresult)
          setPercentage(initPercentage)
      }
  }


    return (
        <React.Fragment>
            <div className="main-content">
            <br/>
            <br/>
            <br/>
            <br/>
            
            <p className="flex-grow" style={{color: 'white'}}>Dashboard Reports</p>
            <div className="row clearfix">
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Card type={getType.Pass} count={TestcaseData.Testcases.Pass} className='bg-light-green' Icon ={FaCheck}/>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Card type={getType.Fail} count={TestcaseData.Testcases.Fail} className='bg-pink' Icon ={FaTimes} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Card type={getType.Skip} count={TestcaseData.Testcases.Skip} className='bg-cyan' Icon ={FaExclamation} />
            </div>
            </div>

            <div className="card">
            <p className="card-title">result Statistics</p>
            <div className="row clearfix">
            <div className="col-lg-1 col-md-6 col-sm-6 col-xs-12">
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <Progress strokeWidth="10"
            sqSize="200"
            percentage={getPercentage.Pass} type='PASS'/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <Progress strokeWidth="10"
            sqSize="200"
            percentage={getPercentage.Fail} type='FAIL'/>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <Progress strokeWidth="10"
            sqSize="200"
            percentage={getPercentage.Skip} type='SKIP'/>
            </div>
            </div>
            </div>

            <div className="card">
            <p className="card-title">result overview</p>
            <Reports reports={currentItems} toggleSelected={toggleSelected}/>
            <Pagination postPerPage={itemPerPage} totalPosts={getReport.length} paginate={paginate}/>
            </div>
            
      </div>
      </React.Fragment>
    )
}

export default Dashboard

interface IObject {
    Fail: string,
    Pass: string,
    Skip: string
}

export interface INumber {
  Fail: number,
  Pass: number,
  Skip: number
}

export interface IReport {
  _id: string,
  time: string,
  suitename: string,
  device: string,
  notes: string,
  FailedTestCases: number,
  PassedTestCases: number,
  RunType: string,
  Regression: string,
  SkippedTestCases: number,
  TotalTestCases: number,
  functionalReport: string,
  uiReport: string,
  version: string,
  issues: string[],
}
