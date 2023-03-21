import React from 'react';
import { Input, Space } from 'antd';
const { Search } = Input;
const onSearch = (value) =>{
  console.log(value);
} 

const Searchs = () => (
  <Space style={{ float:'right' }} direction="vertical">
    <Search  placeholder="Tìm sản phẩm" onSearch={onSearch} enterButton />
  </Space>
);

export default Searchs;