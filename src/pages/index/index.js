import {observer} from 'mobx-weapp';

let done = false;

const mapState = store => {
    return {
        completed: store.todoStore.completedCount,
        todos: store.todoStore.todos,
    };
}

Page(observer(mapState)({
    data: {
        name: 'zaihui',
    },
    onUpdate() {
        console.log('update');
    },
    async onPullDownRefresh() {
        this.$store.todoStore.addTodo('fuck wechat');
        wx.showToast({title: '刷新成功'});
        wx.stopPullDownRefresh();
    },
    addTodo(event) {
        console.log(event);
        this.$store.todoStore.addTodo(event.value);
    },
    toggleComplete() {
        done = !done;
        this.$store.todoStore.toggleAll(done);
    }
}))