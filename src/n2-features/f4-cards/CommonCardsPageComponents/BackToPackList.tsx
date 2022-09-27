import React from 'react';
import s from "../CardsPage.module.css";
import {NavLink} from "react-router-dom";
import {PACKS} from "../../../n1-main/m1-ui/routing/Routing";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export const BackToPackList = () => {
    return (
        <div className={s.backToPacks}>
            <NavLink to={PACKS}> <KeyboardBackspaceIcon sx={{position: 'relative', top: '6px'}}/> Back to Packs
                List</NavLink>
        </div>
    );
};

