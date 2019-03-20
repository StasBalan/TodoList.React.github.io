import React, {Component} from 'react';
import './add-task.css';

class AddTask extends Component {
    render() {
        const {onAddItem, onDeleteAll} = this.props;
        return (
            <form className="form-add">
                <div className='add-block'>
                    <span className='icon-span'><i className="fas fa-tasks"/></span>
                    <input type="date" id='inputDate'/>
                    <input type="text" placeholder='Enter task...' className="input-add"/>
                </div>

                <button type="button" className="btn-add" onClick={() => onAddItem()}>Add</button>
                <button type="button" className="btn-clear" onClick={() => onDeleteAll('')}>Clear All</button>
            </form>
        );
    }
}

export default AddTask;