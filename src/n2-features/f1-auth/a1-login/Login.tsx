import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {registrationAC} from "../../../n1-main/m2-bll/reducers/registration-reducer";

const Login = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(registrationAC(false));
    }, [])

    return (
        <div>Login</div>
    )
}

export default Login;