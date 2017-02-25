/**
 * Reducer
 *
 * @param state
 * @param action
 * @returns {number}
 */
const counter = (state = 0, action) => {
    console.log('reducer', state, action);

    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DECR':
            return state - 1;
        default:
            return state;
    }
}

/**
 * Redux store init
 */
const { createStore } = Redux;

const store = createStore(counter);

const render = () => {
    console.log('render', $('.js-body'));
    $('.js-body').html(store.getState());
}

store.subscribe(render);
render();

$('.js-inc-btn').on('click', (e) => {
    store.dispatch({ type: 'INC'});
});

$('.js-decr-btn').on('click', (e) => {
    store.dispatch({ type: 'DECR'});
});

console.assert(0 == 0, {"message": "unequal"});
