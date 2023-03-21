import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;
function CardAntd(props) {
    let data = props.data;
    return ( 
        <Link style={{ textDecorationLine:'none' }} to={'/product-detail?id='+data.id}>
            <Card
              hoverable
              style={{
                width: 300,
                margin:'20px'
              }}
              cover={<img style={{ height:'180px' }} alt="example" src={data.image} />}
            >
              <div style={{ textAlign:'left' }}>
                  <h5>{data.name}</h5>
                  <h6>${data.price}</h6>
              </div>
              
            </Card>
  </Link>
     );
}



export default CardAntd;