export const getTaskList = (payload) => {
    return {
        type: 'GET_TASK_LIST',
        payload
    }   
}

export const getTaskById = (payload) => {
    return {
        type: 'GET_TASK_BY_ID',
        payload
    }   
}

export const createTask = (payload) => {
    return {
        type: 'CREATE_TASK',
        payload
    }   
}

export const updateTask = (payload) => {
    return {
        type: 'UPDATE_TASK',
        payload
    }   
}

export const deleteTask = (payload) => {
    return {
        type: 'DELETE_TASK',
        payload
    }   
}