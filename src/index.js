import "babel-polyfill"
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createStore,combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, Switch } from "react-router-dom";
import  AssemblyProcPage  from "./components/pages/AssemblyProcPage/js/main"
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import {watchGetUsers } from './sagas/sagas'
import './css/main.css'


const initialState = {
  processes: []
}



function reducer(state = initialState, action) {
  switch (action.type) {
      case "PROCESSES":

      return { ...state, processes: state.processes};
      case "REF_PROCESSES":
          // =[...action.data];
          console.log('REF_PROCESSES');
          console.log(action.data);
          state.processes = [...action.data];
          console.log(state.processes);
      return { ...state, processes: [...state.processes]};
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    reducer: reducer,
    routing: routerReducer,
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchGetUsers);

const history = syncHistoryWithStore(createHistory(), store);

ReactDOM.render((    
    <Provider store={store}>
      <AssemblyProcPage/>
    </Provider>

    ), document.getElementById('root'))