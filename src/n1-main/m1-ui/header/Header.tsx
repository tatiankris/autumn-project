import React from "react";
import {NavLink} from "react-router-dom";
import {LOGIN, NEW_PASSWORD, PASSWORD_RECOVERY, PROFILE, REGISTRATION, ROOT} from "../routing/Routing";

const Header = () => {
    return (
        <div>
            <b>Header   </b>
            <NavLink to={ROOT} >Test_Component </NavLink>
            <NavLink to={PROFILE} >Profile </NavLink>
            <NavLink to={LOGIN} >Login </NavLink>
            <NavLink to={REGISTRATION} >Registration </NavLink>
            <NavLink to={PASSWORD_RECOVERY} >Password_Recovery </NavLink>
            <NavLink to={NEW_PASSWORD} >New_Password </NavLink>
        </div>
    )
}

export default Header;