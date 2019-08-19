import React from 'react';
import ReactDOM from 'react-dom';

class InputButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentVal: ''
         }
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(){
        this.props.handleSubmit(this.state.currentVal);
        this.setState({
            currentVal: ''
        });
    }
    handleChange(e){
        this.setState({
            currentVal: e.target.value
        });
    }
    render(){
        return (
            <>
            <input type="text" value={this.state.currentVal} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>Add</button>
            </>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.handleComplete(e);
    }
    render() {
        return (
            <div>
            {this.props.incomplete} pending out of {this.props.listitems.length} tasks.
            <ul>
            {this.props.listitems.map(item => {
                if (item.done === true) {
                    return <li key={item.id} style={{textDecoration: 'line-through'}}>{item.name}</li>
                } else {
                    return <li key={item.id} onClick={() => this.handleClick(item.id)}>{item.name}</li>
                }
            })}    
            </ul>
            </div>
        )
    }
}

export default class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           currentList: [],
           currentId: 0,
           incomplete: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }
    handleSubmit(value){
       const newList = this.state.currentList.concat({'name':value, 'id':this.state.currentId, 'done':false});
       this.setState(state => {
           return {
               currentList: newList,
               currentId: state.currentId + 1,
               incomplete: state.incomplete + 1,
           }
       });
    }
    handleComplete(key){
        const newList = [];
        this.state.currentList.forEach(item => {
            if (item.id === key) {
                item.done = true;
                newList.push(item);
            } else {
                newList.push(item);
            }
        });
        this.setState(state => {
            return {
                currentList: newList,
                incomplete: state.incomplete - 1,
            }
        });
    }
    render() {
        return (
            <div>
                <InputButton handleSubmit={this.handleSubmit}/>
                <List 
                  listitems={this.state.currentList}
                  incomplete={this.state.incomplete}
                  handleComplete={this.handleComplete}
                />
            </div>
        )
    }
}

ReactDOM.render(<ToDoList />, document.querySelector("#root"));
