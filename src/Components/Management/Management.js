import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Paginations from "../Paginations";
import {  Spin } from 'antd';
import Searchs from "../Searchs";
import CardManagement from "./CardManagement";
import Modals from "./Modals";



function Management(){
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useSearchParams();
    const [list,setList] = useState([]);
    const [pagination,setPagination] = useState();
    const manu = search.get('manu');
    let server = 'http://127.0.0.1:8000/';
    const cate = search.get('cate');
    var instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 10000,
      });
    
    useEffect( ()=>{
        setLoading(true);
        let i=0;
        let callApi='';
        search.forEach((key, value) => {
            if(value=="page")
                callApi=callApi+'?page='+key;
            else
                callApi=callApi+'/'+value+'/'+key;
            i=1;
        });
        if(i!=0){
            
            console.log(callApi);
            instance.get('products'+callApi).then((res)=>{
                let tmp = res.data.data;
                let data = []
                try {
                    tmp.forEach(product => {
                    data.push({id:product.id,name:product.product_name,price:product.price,image:server+product.avatar});
                });
                setList(data);
                setPagination(res.data);
                } catch (error) {
                    
                } 
            });
        }
        else{
            // console.log('get all');
            instance.get('products').then((res)=>{
                let tmp = res.data.data;
                let data = []
                try {
                    tmp.forEach(product => {
                    data.push({id:product.id,name:product.product_name,price:product.price,image:server+product.avatar});
                });
                setList(data);
                setPagination(res.data);
                } catch (error) {
                    
                } 
            });
        }
        setTimeout(() => {
            clearTimeout();
            setLoading(false);
        }, 1500);
    },[search]);
    if(loading)
        return <Spin spinning={loading}></Spin>
    if(Object.keys(list).length == 0)
        return <Empty/>
    else
    return (
        <Spin spinning={loading}>
        <div>
            <div style={{  display:'inline-block',width:'100%' }}>
                <Modals/>
                <Searchs />
            </div>
            
            <div style= {{ backgroundColor:'white',minHeight:'500px', textAlign:'center'}}>
                <div  style={{width:'100%', backgroundColor: 'white',flexWrap:'wrap',justifyContent:'flex-start',display:'flex'}}>
                    {list.map( (item)=>(
                        <CardManagement key={item.id} data={item} />
                    ))}
                </div>
                
            </div>
            <div style={{ textAlign:'center' }}>

            <Paginations data={pagination}/>
            </div>
        </div>
        </Spin>
    );
}
export default Management;