import React, { useEffect, useState } from "react";
import {  Spin } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Empty, Form, Input, InputNumber, Select } from 'antd';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AddImage from '../../Vector.png';
import Slides from "./Slides";
import SlideItem from "./SlideItem";
const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = (values) => {
    console.log(values);
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
    string:{
      range: '${label} must be between ${min} and ${max}',
    }
  };
  
function EditProduct() {
  const [loading, setLoading] = useState(true);
    const [search,setSearch]=useSearchParams();
    const [list,setList] = useState(null);
    const [file1,setFile1]=useState(null);
    const [fileList, setFileList] = useState([null,'file2',null,'file4']);
    const [cates,setCates] = useState();
    const [form] = Form.useForm();
    const [manufacs,setManufacs] = useState();
    let server = 'http://127.0.0.1:8000/';
    var instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 10000,
    });
    useEffect(()=>{
        let id = search.get('id');
        // console.log(id);
        const getData = async() =>{
          try {
             const res =  await instance.get('products/'+id)
             const data = await res.data;
             setList(data);
             setLoading(false);
            console.log(data);
          } catch (error) {
              setLoading(false);
          }
           
            
        }
          
          getData();

        
    },[])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/categories').then(res =>{
          let tmp = res.data;
          let data = [];
          tmp.forEach(item => {
              data.push({
                label: item.cate_name,
                value: item.id,
              });
          });
          setCates(data);
          
        }).catch(err=>console.log(err))
        axios.get('http://127.0.0.1:8000/api/manufacturers').then(res =>{
              let tmp = res.data;
              let data = [];
              tmp.forEach(item => {
                data.push({
                  label: item.manu_name,
                  value: item.id,
                });
            });
            setManufacs(data);
            }).catch(err=>console.log(err));
      },[]  );
      
    

    
    const handleCancel = () => {
    
    
        form.resetFields();
        
      };
    if(loading)
      return <Spin spinning={loading}></Spin>
    if(list==null && !loading)
      return <Empty></Empty>
    else{
         
        return ( 
        <>
            <Spin spinning={loading}>
            <Container style={{ width:'100%',minHeight:'100vh', backgroundColor:'white' }}>
                <Row>
                  
                    <Col style={{ padding:'10px' }}>
                    <Form initialValues={{ product_name: list?.product?.product_name,Categories:list?.cate_name,
                    Manufacturers: list?.manu_name,price:list?.product?.price,description: list?.product?.description}}
                     style={{ marginRight:'10px' }} {...layout} form={form} name="control-hooks" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name="product_name"
                        label="Tên sản phẩm"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                        >
                          <Input  />
                          
                        </Form.Item>
                        
                        <Form.Item
                            name="Categories"
                            label="Danh mục sản phẩm"
                            rules={[
                            {
                                required: true,
                                message: 'Chọn danh mục sản phẩm',
                            },
                            ]}
                        >
                            <Select  options={cates} />
                        </Form.Item>
                        <Form.Item 
                            name="Manufacturers"
                            label="Hãng sản xuất"
                            rules={[
                            {
                                required: true,
                                message: 'Chọn hản sản xuất',
                            },
                            ]}
                        >
                            <Select   options={manufacs} />
                        </Form.Item>
                        
                        <Form.Item
                            name="price"
                            label="Giá sản phẩm"
                            rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 10000,
                                max: 1000000000,
                            },
                            ]}
                        >
                            <InputNumber  style={{
                        width: 200,
                        }} />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả sản phẩm"
                        rules={[
                            {
                            type: 'string',
                            min: 0,
                            max: 500,
                            },
                        ]}
                        >
                            <Input.TextArea  />
                        </Form.Item>
                        <Form.Item  wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button style={{  marginRight:'15px' }} type="primary" htmlType="submit">
                            Cập nhật
                            </Button>
                            <Button  onClick={handleCancel} type="light" >
                            Cancel
                            </Button>
                        </Form.Item>
            </Form>
                    </Col>
                <Col style={{ padding:'10px' }}>
                    <h6 >Ảnh minh họa</h6>
                    <Row style={{ margin:'10px' }}>
                        <img src={server+list?.product?.avatar}></img>
                    </Row>
                    <h6>Ảnh Slide</h6>
                    <Row style={{ margin:'10px' }}>
                        
                    </Row>
                <div style={{ width:'100%', display:'flex',flexWrap:'wrap',justifyContent:'space-around' }}>
                  <SlideItem file={file1} setFile={setFile1} item={null}></SlideItem>
                  <SlideItem item={1}></SlideItem>
                </div>
                </Col>
                </Row>
          </Container>
          </Spin>
        </>
     );
    }
}

export default EditProduct;