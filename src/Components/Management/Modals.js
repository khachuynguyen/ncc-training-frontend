import { Button, Modal } from 'antd';
import React, { useState,useEffect } from 'react';
import { Form, Input, InputNumber,Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import {  Upload } from 'antd';
import ImageSuccess from '../../success.png'
import { useNavigate, useSearchParams } from 'react-router-dom';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
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
const Modals = () => {
  //Categories and Manufacture and fileUpload
  const [search,setSearch] =  useSearchParams();
  const [mess,setMess] = useState();
  const [cates,setCates] = useState();
  const [manufacs,setManufacs] = useState();
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);

  const showModalSuccess = () => {
    setIsModalVisibleSuccess(true);
  };

  

  const handleCancelSuccess = () => {
    setIsModalVisibleSuccess(false);
    
    window.location.assign(window.location.pathname+'?'+search)
  };
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
  let navigate = useNavigate();
  // const [displayManu,setDisplayManu] = useState(true);
  //upload
  const [fileList, setFileList] = useState([]);
  const [form] =Form.useForm();
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    
    
    form.resetFields();
    setIsModalVisible(false);
  };
  

  const onFinish = (values) => {
    console.log(values);
    let formData = new FormData;
    formData.append('product_name',values.product_name);
    formData.append('manu_id',values.Manufacturers);
    formData.append('price',values.price);
    formData.append('cate_id',values.Categories);
    formData.append('description',values.description);
    formData.append('image',fileList[0]);
    axios(
     {
      url:'http://127.0.0.1:8000/api/products',
      method:'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
     } 
    ).then(
      (res)=>{
        if(res.data.product_name = values.product_name || res.status!=201){
          console.log("Thêm thành công");
          setMess('Thêm thành công');
          showModalSuccess();
          setIsModalVisible(false);
          form.resetFields();
          setFileList([]);
        }else{
          setMess(res.data.error)
        }
        
      }
    );
    console.log(Object.fromEntries([...formData]));
    
  };
  
  const handleChangeCate = (value) => {
    console.log(value);
    
  };
  
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm sản phẩm
      </Button>
      <Modal  width={600} title="Thêm sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form form={form}   {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name="product_name"
                label="Tên sản phẩm"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
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
                <Select options={cates} onChange={handleChangeCate} />
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
                <Select  options={manufacs} />
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
                <InputNumber style={{
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
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Ảnh minh họa">
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button style={{ marginRight:'15px' }} type="primary" htmlType="submit">
                Thêm
                </Button>
                <Button  onClick={handleCancel} type="light" >
                Cancel
                </Button>
            </Form.Item>
            </Form>
            <p>{mess}</p>
      </Modal>
      <Modal  style={{ height:'328px' }} footer={false} visible={isModalVisibleSuccess}  onCancel={handleCancelSuccess}>
        <div style={{ textAlign:'center' }}>
            <img src={ImageSuccess}></img>
            <h3>Thêm sản phẩm thành công</h3>
        </div>
        
      </Modal>
    </>
  );
};

export default Modals;