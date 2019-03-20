import React, {Component} from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {

    state = {
        isDone: this.props.check,
        important: this.props.important
    };

    checkStatus() {
        this.setState({
            isDone: !this.state.isDone
        });
        this.props.onCheck();
        this.props.checkTask();
    };

    importantTask() {
        this.setState({
            important: !this.state.important
        });
        this.props.onCheckImp();
        this.props.checkImp();
    }

    render() {
        const {label, date, onDelete} = this.props;

        let item = 'item';

        if (this.state.isDone) {
            item += ' done';
        }

        if (this.state.important) {
            item += ' important';
        }

        return (
            <span className={item}>

            <span
                className='item-block'>
                <span className='item-date'>{date}</span>
                <span className='item-text' onClick={this.checkStatus.bind(this)}>{label}</span>
            </span>
             <div className='item-btn-block'>
               <button type="button" className="btn btn-outline-success" onClick={this.importantTask.bind(this)}><i
                   className="fas fa-star"/></button>
                <button type="button" className="btn btn-outline-danger" onClick={onDelete}><i
                    className="fas fa-trash-alt"/></button>
             </div>

        </span>
        );
    }
}

export default TodoListItem;