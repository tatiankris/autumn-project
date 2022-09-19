import React from "react";
import Header from "../header/Header";
import Routing from "../routing/Routing";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {RequestStatusType} from "../../m2-bll/reducers/app-reducer";

const Main = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div>
            <ErrorSnackbar/>
            <Header/>
            {status === 'loading' && <LinearProgress/>}
            <Routing/>
        </div>
    )
}

export default Main;