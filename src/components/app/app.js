import React, {Component} from 'react';

import AppHeader from '../app-header';
import AddTask from '../add-task';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            taskS: '',
            dateS: ''
        };
    }

    onCheck = (id) => {
        const index = this.state.tasks.findIndex((el) => el.id === id);
        const arrLS = JSON.parse(localStorage.getItem('content')).slice();
        arrLS[index].check = !arrLS[index].check;
        localStorage.setItem('content', JSON.stringify(arrLS));
        this.setState({
            tasks: arrLS
        });
    };

    onCheckImp = (id) => {
        const index = this.state.tasks.findIndex((el) => el.id === id);
        const arrLS = JSON.parse(localStorage.getItem('content')).slice();
        arrLS[index].important = !arrLS[index].important;
        localStorage.setItem('content', JSON.stringify(arrLS));
        this.setState({
            tasks: arrLS
        });
    };

    componentWillMount() {
        localStorage.getItem('content') && this.setState({
            tasks: JSON.parse(localStorage.getItem('content'))
        });
    }

    deleteTask(id) {
        const newArr = this.state.tasks;
        const itemId = id;
        const rez = newArr.filter((item) => {
            return item.id !== itemId;
        });
        this.setState({
            tasks: rez
        });
    }

    addItem() {
        const date = document.querySelector('#inputDate');
        const text = document.querySelector('.input-add');

        const dateValue = date.value;
        const inputValue = text.value;

        const newArr = this.state.tasks;

        if (dateValue === '' || inputValue === '') {
            alert('Введите значение!');
        } else {
            newArr.push({
                date: dateValue,
                label: inputValue,
                important: false,
                check: false,
                id: Math.random().toString(36).slice(2)
            });
        }

        this.setState({
            tasks: newArr
        });

        date.value = '';
        text.value = '';
    };

    deleteTaskAll() {
        const newArr = this.state.tasks;
        newArr.splice(0);
        this.setState({
            tasks: newArr
        });
    }

    search(items, taskS, dateS) {
        if (taskS.length === 0 && dateS.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(taskS) > -1 && item.date.indexOf(dateS) > -1;
        });
    }

    onSearchInput = (taskS) => {
        this.setState({taskS});
    };

    onSearchDate = (dateS) => {
        this.setState({dateS});
    };

    sortTaskAbc() {
        const newArr = this.state.tasks.slice();

        newArr.sort(this.abc);

        this.setState({
            tasks: newArr
        });
    };

    abc = (a, b) => {
        const textA = a.label.toLowerCase();
        const textB = b.label.toLowerCase();
        return (textA < textB) ? -1 : 1;
    };

    sortTaskDate() {
        const newArr = this.state.tasks.slice();
        newArr.sort(this.numb);
        this.setState({
            tasks: newArr
        });
    }

    numb = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    };

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('content', JSON.stringify(nextState.tasks));
    }

    render() {
        const {tasks, taskS, dateS} = this.state;
        const visibleItem = this.search(tasks, taskS, dateS);
        return (
            <div className='todo-list'>
                <AppHeader/>
                <AddTask
                    onAddItem={this.addItem.bind(this)}
                    onDeleteAll={this.deleteTaskAll.bind(this)}/>
                <SearchPanel
                    onSearchInput={this.onSearchInput}
                    onSearchDate={this.onSearchDate}
                    onSortTask={this.sortTaskAbc.bind(this)}
                    onSortTaskDate={this.sortTaskDate.bind(this)}/>
                <TodoList
                    todos={visibleItem}
                    onDelete={this.deleteTask.bind(this)}
                    onCheck={this.onCheck}
                    onCheckImp={this.onCheckImp}
                />
            </div>
        );
    }
}

export default App;
