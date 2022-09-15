import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../m2-bll/store';
import Main from "./main/Main";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Provider store={store}>
             <Main/>
          </Provider>
        </BrowserRouter>
      </div>

  );
}

export default App;
