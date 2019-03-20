import React, {Component} from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

import FlipMove from 'react-flip-move';

class TodoList extends Component {

    state = {
        check: false,
        important: false
    };

    checkTask = () => {
        this.setState((state) => {
            return {
                check: !state.check
            }
        });
    };

    checkImp = () => {
        this.setState((state) => {
            return {
                important: !state.important
            }
        });
    };

    render() {
        const {todos, onDelete} = this.props;

        const elementsTodos = todos.map((task) => {
            const {id, ...itemTodos} = task;
            return (
                <li key={id} className='list-group-item'>
                    <TodoListItem {...itemTodos}
                                  onDelete={() => onDelete(id)}
                                  onCheck={() => this.props.onCheck(id)}
                                  onCheckImp={() => this.props.onCheckImp(id)}
                                  checkTask={this.checkTask}
                                  checkImp={this.checkImp}
                    />
                </li>
            );
        });

        return (
            <ul className='list-group'>
                <FlipMove>
                    {elementsTodos}
                </FlipMove>
            </ul>
        );
    }
}

export default TodoList;

//стр.6: деструктуризация
//стр. 9: будут все свойства кроме id