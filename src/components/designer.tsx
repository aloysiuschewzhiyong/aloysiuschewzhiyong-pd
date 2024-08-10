import React from 'react';
import {MousePointer2} from 'lucide-react'

type Props = {};

const Designer: React.FC<Props> = (props) => {
  return (
    <div className='text-primary'>
        <div>designer</div>
        <MousePointer2/>
    </div>
  );
};

export default Designer;
