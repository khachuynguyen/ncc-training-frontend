import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';

import CardAntd from './CardAntd';
import axios from 'axios';
function Suggestions(props) {
    const list = props?.data;
    let data = []
    let server='http://127.0.0.1:8000/';
    try {
        list.forEach(product => {
    data.push(
        {id:product.id,name:product.product_name,price:product.price,image:server+product.avatar});
    });
    } catch (error) {
        
    }
    
    // const [list,setList] = useState();
    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:8000/api/product-relative/id='+data).then(res =>{
    //         let tmp = res.data;
            
    //         setList(tmp);
    //          console.log(tmp);
            
    //       }).catch(err=>console.log(err))
    // },[])
    // async function fetchData() {
    //     let response = await axios(
    //       `api`
    //     );
    //     let user = await response.data;
    //     setproduct(user);
    //     console.log(product);
    //   }
    
    //   useEffect(() => {
    //     fetchData();
    //   }); 
    
    return ( 
        // <Row   style={{ display:'flex', width:'100%' }}>
        //         {data.map( (item)=>(
                    
        //                 <CardAntd data={item} key={item.id}/>
                       
        //             ))}
        // </Row>
        <div style={{ paddingLeft:'10px', width:'100%', backgroundColor: 'white',flexWrap:'wrap',justifyContent:'flex-start',display:'flex'}}>
                    {data.map( (item)=>(
                        
                            <CardAntd key={item.id} data={item} />
                         
                         
                    ))}
                   
                </div>
     );
}

export default Suggestions;