import React from 'react'
import { object } from 'prop-types';

export default React.createContext({
    //ConnectionString: '',
    ConnectionStatus: false,
    Collections: [],
    IssueMap: [],
    Selected: '',
    Testcases: {Fail:0, Pass:0, Skip:0},
    updateValue : (data:any) => {},
    updateSelected : (currentCollection:string) => {},
    updateTestcases : (testcases:any) => {}
})
