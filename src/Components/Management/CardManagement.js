import { Card } from 'antd';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {  Modal } from 'antd';
import axios from 'axios';
import ImageSuccess from '../../success.png'

const { Meta } = Card;
function CardManagement(props) {
 
  const [search, setSearch] = useSearchParams();
    let data = props.data;
    const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Xóa sản phẩm');
  const [message,setMessage] = useState();
  var instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalDeleted = () => {
    setIsModalVisible(true);
  };

  

  const handleCancelDeleted = () => {
    setIsModalVisible(false);
    window.location.assign(window.location.pathname+'?'+search)
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    instance.delete('products/'+data.id).then((res)=>{
      if(res.status == 204){
        setTimeout(() => {
          setConfirmLoading(false);
        }, 2000);
        setVisible(true);
        showModalDeleted();
        
      }
      else{
        setMessage("Lỗi");
      }
    })
    
  };

  const handleCancel = () => {
    
    console.log('Clicked cancel button');
    setVisible(false);
  };
    return (  
      
  <Card
    hoverable
   
    style={{
      width: 300,
      margin:'10px'
    }}
    cover={<img style={{ height:'180px' }} alt="example" src={data.image} />}
  >
    <h5>{data.name}</h5>
    <div >
        <Button as={Link} to={'/edit?id='+data.id} style={{ margin:'10px', float:'left', width:'100px' }} variant="success">Cập nhật</Button>
        <Button style={{ margin:'10px',float:'right',width:'100px' }} onClick={showModal} variant="danger">Xóa</Button>
     </div>
     
     <Modal
       
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <p>Bạn có chắc muốn xóa sản phẩm <h6 style={{ color:'red', display:'inline'}}> {data.name} </h6>?
          <div>Sản phẩm sẽ <span style={{ color:'red' }}>xóa vĩnh viễn</span></div>

        </p>
        <h5>{message}</h5>
      </Modal>
      <Modal  style={{ height:'328px' }} footer={false} visible={isModalVisible}  onCancel={handleCancelDeleted}>
        <div style={{ textAlign:'center' }}>
            <img src={ImageSuccess}></img>
            <h3>Xóa sản phẩm thành công</h3>
        </div>
        
      </Modal>
  </Card>
 
     );
}



export default CardManagement;