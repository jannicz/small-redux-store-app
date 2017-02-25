/**
 * Reducer
 *
 * @param state
 * @param action
 * @returns {number}
 */
const todos = (state = [], action) => {
    console.log('reducer', state, action);

    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign(
                {},
                state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            );
        case 'TOGGLE_TODO':
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
 * Test
 */
const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };

    let act = JSON.parse(JSON.stringify(action));
    let after = JSON.parse(JSON.stringify(stateAfter));

    expect(
        todos(stateBefore, act)
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
        todos(bef, act)
    ).eql(stateAfter);
};

testAddTodo();
testToggleTodo();

console.log('All tests passed');
$('.js-body').html('All tests passed');
