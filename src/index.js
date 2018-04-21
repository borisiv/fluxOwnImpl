import React from 'react';
import ReactDOM from 'react-dom';
import Store from "./store";

//class Store {
//    constructor(updateState, state){
//        this._updateState = updateState;
//        this._state = state;
//        this._callbacks = [];
//    }
//    get state() {
//        return this._state;
//    }
//    update(action){
//        this._state = this._updateState(this._state, action);
//        this._callbacks.forEach(cb => cb());
//    }
//    subscribe(callback){
//        this._callbacks.push(callback);
//        return () =>  this._callbacks = this._callbacks.filter(cb => cb !== callback);
//    }
//}

const initialState = {count: 0};

function updateState(state, action){
    const amount = 1;
    switch (action.type){
        case "INCREMENT":
            return Object.assign({}, state, { count: state.count + (action.amount || amount)});
        case "DECREMENT":
            return Object.assign({}, state, { count: state.count - (action.amount || amount)});
        case "RESET":
            return Object.assign({}, initialState);
        default:
            return state;
    }
}

const incrementAction = { type: "INCREMENT", amount: 1 };
const decrementAction = { type: "DECREMENT", amount: 1 };
const resetAction = { type: "RESET" };

const store = new Store(updateState, initialState);

class Counter extends React.Component{
    constructor(props){
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount(){
        store.subscribe( () => this.forceUpdate() );
    }
    increment(){
        store.update(incrementAction);
    }
    decrement(){
        store.update(decrementAction);
    }
    reset(){
        store.update(resetAction);
    }
    render(){
        const count = store.state.count;
        return (
            <div className="counter">
                <div className="count">{count}</div>
                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>0</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById("root"));