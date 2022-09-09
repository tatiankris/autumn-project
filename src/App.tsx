import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './bll/store';
import TestingComponent from "./components/TestingComponent";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Registration from './components/Registration';
import PasswordRecovery from './components/PasswordRecovery';
import NewPassword from "./components/NewPassword";
import Error404 from "./components/404";

function App() {
  return (
      <div>
        {/*<TestingComponent/>*/}
        {/*<Profile/>*/}
        {/*<Login/>*/}
        {/*<Registration/>*/}
        {/*<PasswordRecovery/>*/}
        {/*<NewPassword/>*/}
        {/*<Error404/>*/}
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path={'/'} element={<TestingComponent/>}/>
              <Route path={'/profile'} element={<Profile/>}/>
              <Route path={'/login'} element={<Login/>}/>
              <Route path={'/registration'} element={<Registration/>}/>
              <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
              <Route path={'/new-password'} element={<NewPassword/>}/>
              <Route path={'/404'} element={<Error404/>}/>
            </Routes>
          </Provider>
        </BrowserRouter>
      </div>

  );
}

export default App;
