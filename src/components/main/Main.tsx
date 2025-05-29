import React, { useState, useMemo, useCallback } from 'react'
import Child from './Child'
import { slow } from '../../utils'

const salaries = [100,500,650,155,330]

const Main = () => {
    const [count, setCount] = useState(0)
    
    const getTotalSalary = () => {
        slow()
        console.log("getTotalSalary render");
        return salaries.reduce((sum, item) => sum + item, 0)
    }

    const memoTotalSalary = useMemo(()=>{
        return getTotalSalary()
    }, [])

    const reset = useCallback(()=>{
        // code...
        // code...
        // code...
        setCount(0)
    }, [])

  return (
    <div>
        <h2>Main {count}</h2>
        <h3>Total: {memoTotalSalary}</h3>
        <button onClick={()=> setCount(p => p + 1)}>increment</button>
        <Child reset={reset}/>
    </div>
  )
}

export default React.memo(Main)