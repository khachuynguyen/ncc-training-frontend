import React, { useCallback } from "react";
import { Menu } from 'antd';
import {useState,useEffect} from 'react';
import axios from "axios";
import { Link, NavLink, useSearchParams } from "react-router-dom";


function Siders() {
    
    const [search,setSearch] = useSearchParams();
    const [allManu,setAllManu]= useState([]);
    const [categories,setCategories] = useState([]);
    const [manufacturers,setManufacturers] = useState([]);
    const [selectedCate,setSelectedCate] = useState(0);
    
    const [ts,setTs] = useState();
    var instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 10000,
      });
      
    useEffect(()=>{

        instance.get('categories').then((res)=>{
            let tmp = res.data;
            let data = []
            tmp.forEach(item => {
                data.push({key:item.id,title:item.cate_name})
            });
            setCategories(data);
        });
        instance.get('manufacturers').then((res)=>{
            let tmp = res.data;
            let data = []
            tmp.forEach(item => {
                data.push({key:item.id,title:item.manu_name})
            });
            setManufacturers(data);
            setAllManu(data);
        });
    },[]);
    
    const onChangeManufacture = (e) =>{
        // console.log("Cate="+selectedCate+" Selected manufacturers"+e.key);
        if(e.key==0 && selectedCate==0)
        {
            setSearch({});
            setManufacturers(allManu);
        }          
        else
            if(selectedCate==0)
                setSearch({manufacturers:e.key})
            else
                if(e.key==0)
                    setSearch({categories:selectedCate});
                else
                    setSearch({categories:selectedCate,manufacturers:e.key});
    }
    const onChangeCategories = (e) =>{
        
        if(e.key==0){
            setSearch({});
            setManufacturers(allManu);
        }
        else{

            setSearch({categories:e.key});
             instance.get('categories/'+e.key+'/manufacturers').then((res)=>{
                let tmp = res.data;
                let data = [];
                tmp.forEach(item => {
                    data.push({key:item.id,title:item.manu_name})
                });
                //console.log(data);
                setManufacturers(data);
                // setSearch({});
            });
        }
        setSelectedCate(e.key);
        
    }
    return ( 
        <div>
            <Menu defaultSelectedKeys={'0'}  onClick={onChangeCategories} mode="inline">
            <Menu.SubMenu  key={'cates'} title="Danh mục">
                <Menu.Item key={0} >Tất cả</Menu.Item>
                
                { categories.map((item)=>(
                     <Menu.Item key={item.key} >{item.title}</Menu.Item> 
                )
                ) }
                
            </Menu.SubMenu>
            </Menu>
            <Menu  defaultSelectedKeys={'0'} onSelect={onChangeManufacture}    mode="inline">
            <Menu.SubMenu   key={'manufacturers'} title="Hãng sản xuất">
                <Menu.Item key={0} >Tất cả</Menu.Item>
                { manufacturers.map((item)=>(
                    <Menu.Item key={item.key} >{item.title}</Menu.Item>
                )
                ) }
            </Menu.SubMenu>
            </Menu>
          </div>
     );
}

export default Siders;