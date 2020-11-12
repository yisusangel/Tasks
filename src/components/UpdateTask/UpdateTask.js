import React, { Component } from 'react';
import {Link} from'react-router-dom';
import { connect } from 'react-redux';
import { getTaskById, createTask, updateTask } from '../../actions/taskActions';
class UpdateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {
                id: null,
                description: '',
                creationDate: new Date(),
                active: true
            }
        }
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
        if(id){
            this.getTask(id);
        }
    }

    async getTask(id) {
        await this.props.getTaskById(id);
        this.setState({task: this.props.taskList.list[0]});
    }

    changeValue(e, type) {
        const task = this.state.task;
        switch(type) {
            case 'description':
                task.description = e.target.value;
                break;
            case 'active':
                task.active = e.target.value === 'true';
                break;
            default:
                return;

        }
        this.setState({task});
    }

    async saveTask(e) {
        e.preventDefault();
        if(this.state.task.id) {
            await this.props.updateTask(this.state.task);
        } else {
            const task = this.state.task;
            task.creationDate = new Date();
            this.setState({task});
            await this.props.createTask(this.state.task);
            this.props.history.push(`/updateTask/${this.props.taskList.list[0].id}`);
        }
        window.alert("Guardado Exitosamente")
    }

    render() {
        const { task } = this.state;
        return (
            <div className="container">
                <div className="card">
                    <form onSubmit={(e) => this.saveTask(e)}>
                        <div className="card-header">
                            <h5>Edición de Tarea</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <div className="form-group">
                                        <label htmlFor="description">Descripción</label>
                                        <input
                                            className="form-control"
                                            id="description"
                                            onChange={(e) => this.changeValue(e, 'description')}
                                            value={task.description}
                                            required/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <label>Vigente</label><br/>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="active" 
                                            id="active1" 
                                            value="true" 
                                            checked={task.active} 
                                            onChange={(e) => this.changeValue(e, 'active')}/>
                                        <label className="form-check-label" htmlFor="active1">
                                            Si
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="active" 
                                            id="active2" 
                                            value="false" 
                                            checked={!task.active} 
                                            onChange={(e) => this.changeValue(e, 'active')}/>
                                        <label className="form-check-label" htmlFor="active2">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-12 text-right">
                                    <Link to={`/`} className="btn btn-secondary ml-3">Volver a Lista</Link>
                                    <button className="btn btn-primary ml-2" type="submit">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({taskList}) => {
    return { taskList }
}

const mapDispatchToProps = {
    getTaskById, 
    createTask, 
    updateTask
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateTask);