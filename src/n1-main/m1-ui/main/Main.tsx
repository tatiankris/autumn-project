import React from "react";
import Header from "../header/Header";
import Routing from "../routing/Routing";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "../hooks";

const Main = () => {
    const status = useAppSelector((state) => state.app.status)
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