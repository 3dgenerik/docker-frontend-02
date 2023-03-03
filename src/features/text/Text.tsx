import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { rootState } from "../../app/store";
import { addText, clearText } from "./text.slice";

export const Text: React.FC = () => {
    const {text} = useAppSelector((state:rootState) => state.text)
    const dispatch = useAppDispatch()

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch(addText(e.currentTarget.value))
    }

    const onTextClear = () => {
        dispatch(clearText())
    }



    return (
        <>
            <br></br>
            <div className="m-3">
                <div className="input-group">
                    <input onChange={(e) => onTextChange(e)} type="text" value = {text} className="form-control" placeholder="...type username" aria-label="username" aria-describedby="basic-addon2"/>
                    <button onClick={onTextClear} className="btn btn-primary px-5" type="button">Clear text</button>
                </div>
            </div>

        </>
    )
}