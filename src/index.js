import React from 'react';
import ReactDOM from 'react-dom';
//import Store from "./store";
import {createStore} from "./redux";

const initialState = {count: 0};

function reducer(state, action){
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

//const store = new Store(updateState, initialState);
const store = createStore(reducer, initialState);


// Actors (action creators)
function increment(amount = 1){
    return { type: "INCREMENT", amount };
}
function decrement(amount = 1){
    return { type: "DECREMENT", amount };
}
function reset(){
    return { type: "RESET" };
}

// Component
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
        let amount = parseInt(this.refs.amount.value || 1);
        store.dispatch(increment(amount));
    }
    decrement(){
        let amount = parseInt(this.refs.amount.value || 1);
        store.dispatch(decrement(amount));
    }
    reset(){
        store.dispatch(reset());
    }
    render(){
        const count = store.getState().count;
        console.log(count);
        return (
            <div className="counter">
                <div className="count">{count}</div>
                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>0</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>
                <input type="text" ref="amount" defaultValue="1"/>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById("root"));