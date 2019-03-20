import React, {Component} from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor() {
        super();
        this.state = {
            taskS: '',
            dateS: ''
        };
    }

    onSearchInput = (e) => {
        const taskS = e.target.value;
        this.setState({taskS});
        this.props.onSearchInput(taskS);
    };

    onSearchDate = (e) => {
        const dateS = e.target.value;
        this.setState({dateS});
        this.props.onSearchDate(dateS);
    };

    render() {
        const {onSortTask, onSortTaskDate} = this.props;
        return (
            <form className="form-search">
                <div className='search-block'>
                    <span className='icon-span'><i className="fas fa-search"/></span>
                    <input type="text" placeholder='Search...' className="input-search" value={this.state.taskS}
                           onChange={this.onSearchInput}/>
                    <input type="date" className='input-date-search' value={this.state.dateS}
                           onChange={this.onSearchDate}/>
                </div>

                <button type="button" className="btn-sort" onClick={() => onSortTask()}>Sort ABC</button>
                <button type="button" className="btn-sort" onClick={() => onSortTaskDate()}>Sort DATE</button>
            </form>
        );
    }
}

export default SearchPanel;