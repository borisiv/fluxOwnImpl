/**
 * Created by boris on 04/21/18.
 */
function updateState(state, action = {} ){
    const amount = 1;
    switch (action.type){
        case "INCREMENT":
            return state + (action.amount || amount);
        case "DECREMENT":
            return state - (action.amount || amount);
        default:
            return state;
    }
}

class Store {
    constructor(updateState, state){
        this._updateState = updateState;
        this._state = state;
    }
    get state() {
        return this._state;
    }
    update(action){
        this._state = this._updateState(this._state, action);
    }
}
const store = new Store(updateState, 0);

const incrementAction = { type: "INCREMENT", amount: 5 };
const decrementAction = { type: "DECREMENT", amount: 3 };

store.update(incrementAction);
console.log(store.state);

store.update(decrementAction);
console.log(store.state);

store.update({});
console.log(store.state);