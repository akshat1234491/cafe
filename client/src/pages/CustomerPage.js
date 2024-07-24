import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';
const CustomerPage = () => {
  const dispatch = useDispatch();
  const [billsData,setBillsData] = useState([]);
  const getAllBills =async () =>{
    try{
      dispatch({
        type:'SHOW_LOADING',
      });
      const {data} = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({
        type:'HIDE_LOADING',
     });
      console.log(data);
    }
    catch (error) {
      dispatch({
        type:'HIDE_LOADING',
     });
      console.log(error);
    }
  };

  //useeffect
  useEffect(() => {
    getAllBills();
  },[]);

  const columns = [
    {title:'Customer ID',dataIndex:'_id'},
    {title:'Customer Name',dataIndex:'customerName'},
    {title:'Contact Number',dataIndex:'customerNumber'},
  ];

  return (
    <DefaultLayout>
    <h1>
        Customer Page
    </h1>
    <Table columns={columns} dataSource={billsData} bordered/>
    </DefaultLayout>
  )
  
  
};

export default CustomerPage;