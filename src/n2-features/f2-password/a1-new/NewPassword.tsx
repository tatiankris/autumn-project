import React from "react";
import {useParams} from "react-router-dom";

const NewPassword = () => {
    let {token}  = useParams();
    return (
        <div>{token}</div>
    )
}

export default NewPassword;