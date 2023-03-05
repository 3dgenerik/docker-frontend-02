import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { rootState } from "../../app/store";
import { increment, decrement, incrementBy, decrementBy } from "./counter.slice";

interface ICounterProps{
    by: number
}

export const Counter: React.FC<ICounterProps> = ({by}) => {
    const {num} = useAppSelector((state:rootState) => state.counter)
    const dispatch = useAppDispatch()

    return(
        <>
            <p className = 'display-1'>{num}</p>
            <div className='btn-group'>
                <button onClick={()=>dispatch(increment())} className="btn btn-outline-primary">Increment</button>
                <button onClick={()=>dispatch(decrement())} className="btn btn-outline-primary">Decrement</button>
                <button onClick={()=>dispatch(incrementBy(by))} className="btn btn-outline-primary">Increment by {by}</button>
                <button onClick={()=>dispatch(decrementBy(by))} className="btn btn-outline-primary">Decrement by {by}</button>
            </div>
        </>
    )
}