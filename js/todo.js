/**
 * Reducer for creating and editing todos
 *
 * @param state
 * @param action
 * @returns {number}
 *
 * @example spread-operator
 * var parts = ['shoulders', 'knees'];
 * var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
 */
const todosReducer = (state = [], action) => {
    console.log('%creducer', 'color: orange', action.type, '- new state', action);

    switch (action.type) {
        case 'ADD_TODO':
            // Reducer ADD
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            // Reducer Toggle
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }

                return Object.assign({}, todo, { completed: !todo.completed });
            });
        default:
            return state;
    }
};

/**
 * Reducer for changing visibility independent from todos
 *
 * @param state
 * @param action
 */
const visibilityReducer = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

/**
 * Test
 */
const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];

    let act = JSON.parse(JSON.stringify(action));
    let after = JSON.parse(JSON.stringify(stateAfter));

    expect(
        todosReducer(stateBefore, act)
    ).eql(after);
};

/**
 * Test
 */
const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];
    let bef = JSON.parse(JSON.stringify(stateBefore));
    let act = JSON.parse(JSON.stringify(action));

    expect(
        todosReducer(bef, act)
    ).eql(stateAfter);
};

/**
 * Redux store init
 */
const { createStore } = Redux;
const store = createStore(
    Redux.combineReducers({todo: todosReducer, visibility: visibilityReducer}
    ), []
);

/**
 * Run reducer tests
 */
testAddTodo();
testToggleTodo();

console.log('All tests passed');
$('.js-body').html('All tests passed');


console.log('Store initial State', store.getState());

store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Learn Redux'
});
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_FIRST'
});

console.log('dispatch first...', store.getState());
store.dispatch({
    type: 'ADD_TODO',
    id: 2,
    text: 'Go shopping'
});
console.log('dispatch first...', store.getState());
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1
});
store.dispatch({
    type: 'ADD_TODO',
    id: 3,
    text: 'Go swimming'
});
console.log('dispatch second...', store.getState());
