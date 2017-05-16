import React, { Component } from 'react';
import './style.css';


class TodoList extends Component {

  render() {
    // map over the todo items in the global state
    // provide a mechanism to remove specific items from the list
    return (
      <ul className="left">
      {
        this.props.todos.map(todo => (

          <li key={todo.key}>
            <button id={todo.key} onClick={this.props.removeItem}>X</button>
            {todo.item}
          </li>
        ))
      }
      </ul>
    );
  }
}


class TodoInput extends Component {

  render() {
    return (
      <div>
      <input id='todoVal' type='text' placeholder='Enter Todo' onKeyPress={this.props.handleKeyPress}/> &nbsp;
      <button onClick={this.props.addItem}> Add </button>
      </div>
    );
  }
}

// example of a stateless component
const Text = (props) => <h2>{props.children}</h2>


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

  }

  handleKeyPress = (e) => {
     if (e.key === 'Enter') {
       this.addItem();
     }
  }

  addItem() {
    let el = document.getElementById('todoVal');

    if(el.value !== undefined && el.value !== "") {
        let todo = {key: Math.random(), item: el.value}
        // clear input after add...
        el.value = "";

        this.setState({
          todos: [...this.state.todos, todo]
        });
        return false;
    } else {
      alert("Todo is required!");
    }
  }

  removeItem(e) {
    // find and remove by key
    // set new state to updated list

    // e.target.id is a string, so multiply it by 1 to convert it to an int.
    // tried using parseInt, and no love... why?
    let todos = this.state.todos.filter(item => item.key !== e.target.id * 1);

    this.setState({
      todos: todos
    });

    return false;
  }

  render() {
    return (
      <div className="App">
        <Text>Todo List</Text>
        <TodoInput addItem={this.addItem} handleKeyPress={this.handleKeyPress}/>
        <TodoList todos={this.state.todos} removeItem={this.removeItem}/>
      </div>
    );
  }
}

export default App;
