import React, { Component } from 'react';
import {Link} from'react-router-dom';
import { connect } from 'react-redux';
import { getTaskList, deleteTask } from '../../actions/taskActions';
import Pager from '../Pager/Pager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TaskList.css';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                find: '',
                page: 1,
                pagesTotal: 0
            }
        }
        this.props.getTaskList(this.state.filter);        
    }

    changeFilter(e) {
        let filter = this.state.filter;
        filter.find = e.target.value;
        this.setState({filter});
    }

    filterList(page) {
        let filter = this.state.filter;
        filter.page = page;
        this.setState({filter});
        this.props.getTaskList(filter);
    }

    deleteTask(id) {
        var r = window.confirm("Esta seguro que desea borrar la tarea?");
        if (r == true) {
            this.props.deleteTask(id);
        }
    }

    dateString(date) {
        const newDate = new Date(date).toLocaleString('es-CL');
        return newDate;
    }

    render() {
        const { taskList } = this.props;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h5>Lista de Tareas</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-5">
                                <div className="form-group">
                                    <input
                                        placeholder="Buscar Por Descripción"
                                        className="form-control"
                                        id="taskFilter"
                                        onKeyUp={(e) => this.changeFilter(e)}
                                    />
                                </div>

                            </div>
                            <div className="col-2">
                                <button className="btn btn-secondary" onClick={() => this.filterList(1)}>Buscar</button>
                            </div>
                            <div className="col-5 text-right">
                                <Link to={`/updateTask`} className="btn btn-primary">Nueva Tarea</Link>
                            </div>
                        </div>
                        <div className="table-cont">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Fecha de Creación</th>
                                        <th>Vigencia</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {taskList.list && taskList.list.map((key, i) => (
                                    <tr key={i}>
                                        <td>{key.description}</td>
                                        <td>{this.dateString(key.creationDate)}</td>
                                        <td>
                                            {key.active &&
                                                <span className="badge badge-success">Vigente</span>
                                            }{!key.active &&
                                                <span className="badge badge-danger">Inactivo</span>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/updateTask/${key.id}`}><FontAwesomeIcon icon="pencil-alt"/></Link>
                                            <span aria-hidden="true" className="delete-button ml-4" onClick={() => this.deleteTask(key.id)}><FontAwesomeIcon icon="trash-alt"/></span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pager"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Numero de páginas"
                        >
                            <Pager 
                                currentPage={this.state.filter.page}
                                totalPages={Math.ceil(taskList.count/10)}
                                updatePage={(page) => {this.filterList(page)}}>
                            </Pager>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({taskList}) => {
    return { taskList }
}

const mapDispatchToProps = {
    getTaskList,
    deleteTask
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);