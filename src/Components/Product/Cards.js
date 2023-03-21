import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';
function Cards(props) {
    const data = props.data;
    const actions = props.actions;
    const clickDelete = ()=>{
      console.log("xóa sản phẩm có id "+data.id);
    }
  if(actions=="view")
      return (
        
        <Card  style={{  width: '30%', margin:'10px' , borderRadius:'10px'}} >
          <Card.Img style={{ height: '218px' }} variant="top" className='photo' src={data.image}/>
          
          <Card.Body>
            
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.price}
            </Card.Text>
            {/* <Link to={'/home/?cate='+data.id+'&id='+data.title}><Button variant="primary">Go somewhere</Button></Link> */}
            <Link to={'/product-detail/?cate='+data.id+'&id='+data.id}><Button variant="primary">Chi tiết</Button></Link>
          </Card.Body>
          
        </Card>
        
      );
      if(actions=="edit")
      return (
        
        <Card  style={{  width: '30%', margin:'10px' , borderRadius:'10px'}} >
          <Card.Img style={{ height: '218px' }} variant="top" className='photo' src={data.image}/>
          
          <Card.Body>
            
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.price}
            </Card.Text>
            {/* <Link to={'/home/?cate='+data.id+'&id='+data.title}><Button variant="primary">Go somewhere</Button></Link> */}
            <Link to={'/edit'}><Button style={{margin:'5px',backgroundColor:'lightgreen'}} variant="success">Cập nhật</Button> </Link>
            <Button onClick={clickDelete} style={{margin:'5px'}} variant="danger">Xóa</Button>
          </Card.Body>
          
        </Card>
        
      );
}

export default Cards;