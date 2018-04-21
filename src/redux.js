export function createStore(reducer, initialState = {}){
    let state = initialState;
    let callbacks = [];
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(cb => cb());
    };
    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks = callbacks.filter(cb => cb !== callback);
    }
    dispatch({});
    return {getState, dispatch, subscribe};
}