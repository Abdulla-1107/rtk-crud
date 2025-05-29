import React from 'react'
import { slow } from '../../utils';

const GrandChild = () => {
    console.log("grandchild render");
    slow()
  return (
    <div>GrandChild</div>
  )
}

export default React.memo(GrandChild)