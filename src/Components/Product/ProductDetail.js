import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Empty, Spin } from 'antd';
import Col from 'react-bootstrap/Col';
import { useSearchParams } from "react-router-dom";
import Carousels from "./Carousels";
import Suggestions from "./Suggestions";
import axios from "axios";

function ProductDetail() {
  const [product,setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listImage,setListImage]=useState([]);
    let server = 'http://127.0.0.1:8000/';
    var instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 10000,
    });
    const [search,setSearch]=useSearchParams();
    if(!search.has('id'))
        window.location.assign('product'+'?'+search);
    useEffect(()=>{
      setLoading(true);
      const id =search.get('id');
      const getData = async() =>{
        await instance.get('products/'+id).then(res =>{
        // console.log(res.data);
        setProduct(res.data);
      }).catch(err=>console.log(err))
      }
      getData();
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    },[search]);
    useEffect(()=>{
      let tmp =[];
      tmp.push(server+product?.product?.avatar);
      for(let i=1;i<=3;i++){
        tmp.push("https://sohanews.sohacdn.com/zoom/480_300/160588918557773824/2022/7/9/photo1657352082975-16573520830551611108184.jpeg");
      }
      setListImage(tmp);
    },[product])
    if(loading)
      return <Spin spinning={loading}></Spin>
    if(Object.keys('product').length==0 && !loading)
      return <Empty></Empty>;
    else{
      
        return ( 
            <Container style={{ width:'100%',minHeight:'100vh', backgroundColor:'white' }}>
            <Row style={{ width:'100%',margin:'10px'}}>
              <Col  style={{ padding:'10px' }}>
              <h3>{product?.product?.product_name}</h3>
              <p>Danh mục: {product?.cate_name} </p>
              <p>Hãng sản xuất: {product?.manu_name} </p>
              <p>Giá: ${product?.product?.price}</p>
              <div>
                <h5>Mô tả sản phẩm</h5>
                {product?.product?.description}
                
              </div>
            </Col>
              <Col style={{ padding:'10px' }}>
                    <Carousels data={listImage}/>
              </Col>
            </Row>
            <h3>Gợi ý cho bạn</h3>
            <Suggestions data={product?.suggest}/> 
            
          </Container>
          
        );
    }
    
}

export default ProductDetail;