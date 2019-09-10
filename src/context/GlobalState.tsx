import React, {useState, createContext, useEffect} from 'react'
import InitialContext from './InitialContext'
import { useHttp, useGetHttp } from '../hooks/Http';
import { INumber } from '../components/Dashboard';
import axios from "axios";

interface IProps {
    children: React.ReactNode,
    // ConnectionString?: string,
    // ConnectionStatus?: boolean,
    // IssueMap?:[],
    // Collections?:[],
    // Selected: string
}

const GlobalState: React.FC<IProps> = (props) => {
    var collection:string
    var url:string = "mongodb://localhost:27017/react"
    // const [ConnectionStringAPI] = useHttp('/api/',{"url": "mongodb://localhost:27017/react"},[])
    // const [IssueMapAPI] = useHttp('/api/read',{"api": "IssueMap"},[])
    // const [ConnectionStatusAPI] = useGetHttp('/api/conn',[])
    // const [CollectionsAPI] = useGetHttp('/api/list',[])

    //const [ConnectionString, setConnectionString] = useState<string>('')
    const [IssueMap, setIssueMap] = useState<never[]>([])
    const [ConnectionStatus, setConnectionStatus] = useState<boolean>(false)
    const [Collections, setCollections] = useState<never[]>([])
    const [Selected, setSelected] = useState<string>('')
    const [Testcases, setTestcases] = useState<INumber>({Fail:0, Pass:0, Skip:0})

 // const CollectionsMemo = useMemo(() => ({
    //      Collections
    //   }), [])


    useEffect(() => {
        if(!ConnectionStatus){
          console.log("ConnectionStatus failed")
            var conn:string;
            const data = async() : Promise<any> =>{
                    try {
                        conn = await axios.get('/api/conn') 
                    } catch (e) {
                        console.log(`Axios request failed: ${e}`);
                    } 
                    return conn
                };
                data().then(res=>{
                    console.log("data is called",res.data.status)
                    if(res.data.status !=="Connection to the server was not successful" || !res.data.status ){
                    console.log("connection successful")
                    const other = async()=>{
                      console.log("ConnectionStatus passed")
                      const lists =  await axios.get('/api/list') 
                      const conn = await axios.get('/api/conn') 
                      const issues = await axios.post('/api/read',{"api": "IssueMap"}) 
                      setCollections(lists.data.status)
                      setConnectionStatus(conn.data.status)
                      setIssueMap(issues.data.status[0])
                  }
                  other()
                    }
                    else{
                    const connect = async(): Promise<any>=>{
                        const connectionString = await axios.post('/api/',{"url": url}) 
                        return connectionString.data.status
                    }
                    connect().then(val=>{
                      console.log("connectionString",val)
                      const other = async()=>{
                          const lists =  await axios.get('/api/list') 
                          const conn = await axios.get('/api/conn') 
                          const issues = await axios.post('/api/read',{"api": "IssueMap"}) 
                          setCollections(lists.data.status)
                          setConnectionStatus(conn.data.status)
                          setIssueMap(issues.data.status[0])
                      }
                      other()
                      console.log("connection failed")
                  })
                  }
              })
            }
    },[])

    // useEffect(() => {
    //     setConnectionString(ConnectionStringAPI.status)
    // },[ConnectionStringAPI])

    // useEffect(() => {
        //console.log("IssueMapAPI.status",IssueMapAPI.status)
    //     setIssueMap(IssueMapAPI.status[0])
    // },[IssueMapAPI])

    // useEffect(() => {
    //     setConnectionStatus(ConnectionStatusAPI.status)
    // },[ConnectionStatusAPI])


    // useEffect(() => {
    //     setCollections(CollectionsAPI.status)
    // },[CollectionsAPI])

    useEffect(() => {
        var newColl = [...Collections]
        newColl.map((coll,index)=>{collection = coll as string
            if(collection.startsWith("file")||collection.startsWith("IssueMap")){
            newColl.splice(index,1)
            setCollections(newColl)
            }
            })
    },[Collections])


    const updateValue = (data:any) => {
        setIssueMap(data)
     }

     const updateSelected = (currentCollection:string) =>{
        setSelected(currentCollection)
     }

     const updateTestcases = (testcases:INumber) =>{
        setTestcases(testcases)
     }

    return (
        <InitialContext.Provider value={{
            //ConnectionString, 
            ConnectionStatus, 
            IssueMap, 
            Collections,
            Selected,
            Testcases,
            updateValue,
            updateSelected,
            updateTestcases
            }}>
                {props.children}
        </InitialContext.Provider>
    )
}

export default GlobalState

