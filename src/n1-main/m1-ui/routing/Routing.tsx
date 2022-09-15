import React from "react";
import {Route, Routes} from "react-router-dom";
import TestingComponent from "../../../n2-features/f0-first/a1-TestingComponent/TestingComponent";
import Profile from "../../../n2-features/f3-profile/a1-profile/Profile";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-registration/Registration";
import PasswordRecovery from "../../../n2-features/f2-password/a2-recovery/PasswordRecovery";
import NewPassword from "../../../n2-features/f2-password/a1-new/NewPassword";
import Error404 from "../../../n2-features/f0-first/a2-Error404/404";

const ROOT = '/'
const LOGIN = '/login'
const REGISTRATION = '/registration'

const PASSWORD_RECOVERY = '/password-recovery'
const NEW_PASSWORD = '/new-password'

const PROFILE = '/profile'

const ERROR_404 = '/404'



const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={ROOT} element={<TestingComponent/>}/>
                <Route path={PROFILE} element={<Profile/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                <Route path={PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={ERROR_404} element={<Error404/>}/>
            </Routes>
        </div>
    )
}

export default Routing;