import React, { useEffect, useState } from "react";
import {  Spin } from 'antd';
import Searchs from "../Searchs";
import axios from "axios";
import CardAntd from "./CardAntd";
import { useSearchParams } from "react-router-dom";
import Paginations from "../Paginations";
import { Empty } from "antd";

 function Product(){
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useSearchParams();
    const [list,setList] = useState([]);
    
    // const cate = search.get('cate');
    // const manu = search.get('manu');
    const [pagination,setPagination] = useState();
    let server='http://127.0.0.1:8000/';
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
            // console.log('products/'+callApi);
            // console.log(callApi);
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
            setLoading(false);
        }, 1500);
    },[search]);
    if(loading)
        return <Spin spinning={loading}></Spin>
    if(Object.keys(list).length == 0 )
        return <Empty/>
    else
        return (
        <>
            {/* <Spin spinning={loading}> */}
            <div style={{textAlign:'center'}}>
            <div style={{ display:'inline-block',width:'100%' }}>
                <Searchs />
            </div>
                <div style={{ paddingLeft:'10px', width:'100%',minHeight:'500px', backgroundColor: 'white',flexWrap:'wrap',justifyContent:'flex-start',display:'flex'}}>
                    {list.map( (item)=>(
                        
                            <CardAntd key={item.id} data={item} />
                         
                         
                    ))}
                   
                </div>
                <Paginations data={pagination}/>
            </div>
            {/* </Spin> */}
        </>
    );
}
export default Product;