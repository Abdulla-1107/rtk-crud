import {FC, memo} from 'react'
import GrandChild from './GrandChild'
import { slow } from '../../utils';

interface Props{
  reset: () => void
}

const Child:FC<Props> = ({reset}) => {
    console.log("child render");
    slow()
  return (
    <div>
        <h3>Child</h3>
        <button onClick={reset}>reset</button>
        <GrandChild/>
        <img src="" loading='lazy' alt="" />
    </div>
  )
}

export default memo(Child)
