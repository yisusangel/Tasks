import React, { Component } from 'react';
import { Link, Route } from'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import UpdateTask from './components/UpdateTask/UpdateTask';
import './App.css';
class App extends Component {

    constructor(props) {
        super(props);
        if(!localStorage.getItem('fullTaskList')) {   
            const initList = [
                {
                    id: 1,
                    description: 'tarea 1',
                    creationDate: new Date(),
                    active: true
                },
                {
                    id: 2,
                    description: 'tarea 2',
                    creationDate: new Date(),
                    active: false
                },
            ];
            localStorage.setItem('fullTaskList', JSON.stringify(initList));
        }
    }

    render() {
        return (
            <div className="App pages">
                <header className="app-header">
                    <nav className="navbar navbar-dark bg-dark">
                        <span className="navbar-text">
                            <Link to={`/`}>Tareas</Link>
                        </span>
                    </nav>
                </header>
                <section>
                    <Route path="/" exact={true} component={TaskList}/>
                    <Route path="/updateTask" exact={true} component={UpdateTask}/>
                    <Route path="/updateTask/:id" component={UpdateTask}/>
                </section>
            </div>
        );
    }
}

export default App;
