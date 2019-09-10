import React, { FC } from 'react'
import { Table } from 'reactstrap';
import axios from "axios";
import { IReport } from './Dashboard';

const Reports:FC<any> = ({reports, toggleSelected}) => {

    // const downloadButton= async(id:string) =>{
    //     let file:string
    //     try {
    //         console.log("id",id)
    //         const res = await axios.post('/api/download',{"id": id}) 
    //         file= res.data.status
    //         console.log("file",file)
    //         setTimeout(function(){
    //         var element = document.createElement('a');
    //         //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('http://localhost:4100/file'));
    //         element.setAttribute('href', 'http://localhost:4100/file')
    //         element.setAttribute('download', file);
    //         element.setAttribute('target','_blank');
          
    //         element.style.display = 'none';
    //         document.body.appendChild(element);
          
    //         if (document.createEvent) {
    //             var e = document.createEvent('MouseEvents');
    //             e.initEvent('click', true, true);
    //             element.dispatchEvent(e);
    //             return true;
    //         }
          
    //         document.body.removeChild(element);
    //     }, 1000); 
    //     } catch (e) {
    //         console.log(`Axios request failed: ${e}`);
    //     } 
    // }


    const previewButton= async(id:string) =>{
        let file:string
        try {
            console.log("id",id)
            const res = await axios.post('/api/download',{"id": id}) 
            file= res.data.status
            console.log("file",file)
            setTimeout(function(){
                window.open('http://localhost:4100/file', '_blank')
            }, 1000); 
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        } 
    }

    return (
        <React.Fragment>
            <Table striped style={{marginLeft:'20px'}}>
            <thead>
            <tr>
                <th> </th>
                <th>#</th>
                <th>Time Stamp</th>
                <th>Device</th>
                <th>Run Type</th>
                <th>Version</th>
                <th>Executed Cases</th>
                <th>Issues Found</th>
                <th>Functional Report</th>
                <th>UI Report</th>
            </tr>
            </thead>
            <tbody>
            {reports && reports.reverse().map((report:IReport,index:any) =>
            // {console.log("getReport",report)}
            <tr key={index}>
            <td><input type="radio" name="FirstSelector" value={index} onClick={(e)=>toggleSelected(e,index)}/></td>
            <td>{index+1}</td>
            <td>{report.time}</td>
            <td>{report.device}</td>
            <td>{report.RunType}</td>
            <td>{report.version}</td>
            <td>{report.TotalTestCases}</td>
            <td>{report.issues}</td>
            <td><a className="badge badge-outline-success mr-4 mr-xl-2" href="javascript:void(0)" onClick={()=>previewButton(report.functionalReport)}>view</a></td>
            <td><a className="badge badge-outline-success mr-4 mr-xl-2" href="javascript:void(0)" onClick={()=>previewButton(report.uiReport)}>view</a></td>
          </tr>
          )}
            </tbody>
          </Table>
        </React.Fragment>
    )
}

export default Reports
