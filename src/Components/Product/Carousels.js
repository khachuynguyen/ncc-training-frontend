import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Carousels(props) {
  const list = props.data;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  let result = [];
  // console.log(Object.keys(list).length)
  for (let i = 0; i < list.length; i++) {
    result.push(<Carousel.Item key={i}>
      <img
      style={{ height:'300px' }}
        className="d-block w-100"
        src={list[i]}
        alt="Second slide"
      />

    
    </Carousel.Item>)
    
  }
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {/* {
        list.map((item)=>(
          <Carousel.Item >
        <img
        style={{ height:'300px' }}
          className="d-block w-100"
          src={item}
          alt="Second slide"
        />

      
      </Carousel.Item>
        ))
      } */}
      {result}
      
{/*       
      <Carousel.Item>
        <img
        style={{ height:'300px' }}
          className="d-block w-100"
          src="https://sohanews.sohacdn.com/zoom/480_300/160588918557773824/2022/7/9/photo1657352082975-16573520830551611108184.jpeg"
          alt="Second slide"
        />

      
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{ height:'300px' }}
          className="d-block w-100"
          src="https://cms-i.autodaily.vn/du-lieu/2019/07/19/2020-chevrolet-corvette-stingray-6.jpg"
          alt="Third slide"
        />
      </Carousel.Item> */}
    </Carousel>
  );
}

export default Carousels;