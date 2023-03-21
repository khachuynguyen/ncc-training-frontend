import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const UploadTest = () => {
  
  const [fileList, setFileList] = useState([
  ]);
  const [display,setDisplay]=useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const handlePreview = async (file) => {
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
  };
  


  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handlePreview(fileList[fileList.length-1]);
    
    }
  return (
    <div style={{
        width: '45%',
        minHeight:'118px',
        margin:'5px'
      }}>
        <Upload 
        multiple={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // listType="text"
        fileList={fileList}
        onChange={handleChange}
        width={200}
        
      >
        {fileList.length >= 1 ? null : <h1>+</h1>}
      </Upload>
      <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      
    </div>
  );
};

export default UploadTest;