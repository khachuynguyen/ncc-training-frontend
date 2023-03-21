import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import AddImage from '../../Vector.png';
function SlideItem(props) {
    // let file = props.file;
    let [setFile] = useState(props.setFile)
    // let setFile=props.setFile;
    let item = props.item;
    function onDelete(){
        setFile(null);
    }
    return ( 
        <div  style={{ zIndex:1, position: 'relative',display:'flex',flexDirection:'column',justifyContent:'center',margin:'15px', alignItems:'center', height:'118px', width:'40%' }}>
            <input  type="file" id="image" hidden></input>
            {item!=null?<> 
            <label style={{ borderRadius:'5px', color:'white', height:'30px', textAlign:'center', width:'100px', margin:'5px', backgroundColor:'gray' }} htmlFor="image">Cập nhật</label>
            
            <Button onClick={onDelete} style={{ width:'100px' }} variant="secondary" size="sm">Xóa</Button>
            <img  style={{ position:'absolute',zIndex:-1, height:'100%' ,width:'100%'}} src="https://vcdn-vnexpress.vnecdn.net/2022/06/28/Vinfast-Theon-Feliz-VnExpress-7626-9609-1656393014.jpg"></img></>
           
            :<div><label htmlFor="image"><img  src={AddImage}></img></label></div>}
            
        </div>
     );
}

export default SlideItem;