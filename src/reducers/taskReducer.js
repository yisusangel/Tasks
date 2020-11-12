const taskReducer = (state = [], {type, payload}) => {
    let list = JSON.parse(localStorage.getItem('fullTaskList')) || [];
    let res =  {
        count: list.length,
        list
    };
    switch (type) {
        case 'GET_TASK_LIST':
            if(payload && payload.find) {
                const regex = new RegExp(`^${payload.find}`, 'i')
                list = list.filter(t => regex.test(t.description));
                res.count = list.length;
            }
            if(payload && payload.page) {
                list = list.slice((payload.page-1)*10, payload.page*10);
            }
            res.list = list;
            return res;

        case 'GET_TASK_BY_ID':
            let task = list.find((t) => (Number(t.id) === Number(payload)));
            res.list = [task];
            return res;

        case 'CREATE_TASK':
            let maxId = Math.max(...list.map(task => task.id));
            payload.id = ++maxId;
            list.push(payload);
            localStorage.setItem('fullTaskList', JSON.stringify(list));
            res.list = [payload];
            return res;

        case 'UPDATE_TASK':
            for (let i = 0; i < list.length; i++) {
                if(Number(list[i].id) === Number(payload.id)) {
                    list[i] = payload;
                    break;
                }
            }
            localStorage.setItem('fullTaskList', JSON.stringify(list));
            res.list = [payload];
            return res;

        case 'DELETE_TASK':
            for (let i = 0; i < list.length; i++) {
                if(Number(list[i].id) === Number(payload)) {
                    list.splice(i,1);
                    break;
                }
            }
            localStorage.setItem('fullTaskList', JSON.stringify(list));
            res.count = list.length;
            res.list = list.slice(0, 10);
            return res;
        default:
            return state;
    }
}

export default taskReducer;