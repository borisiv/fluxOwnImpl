import React from 'react';
import ReactDOM from 'react-dom';
import Store from "./store";

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
        storage.subscribe( () => this.forceUpdate() );
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
                <span className="count">{count}</span>
                <div className="buttons">
                    <button classNAme="decrement" onClick={this.decrement}>-</button>
                    <button classNAme="reset" onClick={this.reset}>0</button>
                    <button classNAme="increment" onClick={this.increment}>+</button>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById("root"));