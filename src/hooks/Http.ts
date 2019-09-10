import React, {useState, useEffect} from 'react'
import axios from "axios";

export const useHttp = (url:string, postData:Object, dependencies:Object[]) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchedData, setFetchedData] = useState<IData>({status:[]})

    useEffect(() => {
        const data = async () => {
            try {
                setIsLoading(true)
                console.log('postData',postData)
                const res = await axios.post(url,postData) 
                setFetchedData(res.data)
                setIsLoading(false)
            } catch (e) {
                console.log(`Axios request failed: ${e}`);
                setIsLoading(false)
            } 
        }
        data()
    },dependencies) 
    return [fetchedData]
}

export const useGetHttp = (url:string, dependencies:Object[]) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchedData, setFetchedData] = useState<IData>({status:[]})

    useEffect(() => {
        const data = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(url) 
                setFetchedData(res.data)
                setIsLoading(false)
            } catch (e) {
                console.log(`Axios request failed: ${e}`);
                setIsLoading(false)
            } 
        }
        data()
    },dependencies) 
    return [fetchedData]
}

interface IData{
    status: any | [];
}