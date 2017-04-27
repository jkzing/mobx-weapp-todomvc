import {observer} from 'mobx-weapp';

const mapState = ({todoStore}) => {
    return {
        activated: todoStore.activeTodoCount,
        completed: todoStore.completedCount,
        todos: todoStore.todos,
    };
}

Page(observer(mapState)({
    data: {
        todoInput: '',
    },
    onUpdate() {
        console.log('update');
    },
    async onPullDownRefresh() {
        this.$store.todoStore.addTodo('fuck wechat');
        wx.showToast({title: '刷新成功'});
        wx.stopPullDownRefresh();
    },
    inputChange({detail}) {
        this.setData({
            todoInput: detail.value,
        });
    },
    addTodo({detail}) {
        if (!detail.value) return;
        this.$store.todoStore.addTodo(detail.value);
        this.setData({todoInput: ''});
    },
    toggleComplete({target}) {
        let todo = target.dataset.todo;
        this.$store.todoStore.toggleTodo(todo.id);
    }
}))