/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../env';

export const useGetTransact = () => {
  const [loading, setLoading] = useState(false);
  const [transact, setTransact] = useState([]);
  
  const getTransaction = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${env.BASE_URL}/transactions`)
      console.log(response)
      
      setTransact(response?.data || [])
    } catch (error:any) {
      console.log(error)
    } finally{
      setLoading(false)
    }
   
  }
  
   
  useEffect(() => {
    getTransaction()
  }, [])
  return { loading, transact, getTransaction}
}

export const useGetWallet = () => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState < {} | any>({});
  
  const getWallet = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${env.BASE_URL}/wallet`)
      console.log(response)
      
      setWallet(response?.data || [])
    } catch (error:any) {
      console.log(error)
    } finally{
      setLoading(false)
    }
   
  }
  
   
  useEffect(() => {
    getWallet()
  }, [])
  return { loading, wallet, getWallet}
}