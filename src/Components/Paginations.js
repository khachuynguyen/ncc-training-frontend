import { Pagination } from 'antd';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Paginations(props) {
    
    const [pages,setPages] = useSearchParams();
    const [current, setCurrent] = useState(props?.data?.current_page);

    const onChange = (page) => {
        // console.log(page);
        
        setCurrent(page);
        pages.set('page',page);
        setPages(pages)
        
        // console.log(pages.getAll);
        
    };
    
    let data = props.data;
    // console.log(data);
    if(data==null){
        return <></>;
    }else
    return ( 
        <Pagination defaultCurrent={current} onChange={onChange}  total={data.total} pageSize={data.per_page} current={current} />
     );
}

export default Paginations;
