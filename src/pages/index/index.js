import {observer} from 'mobx-weapp';
import { sleep } from '../../utils/utils';

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
        await sleep(500);
        console.log(this);
        // addTodo('fuck wechat');
        this.$store.todoStore.addTodo('fuck wechat');
        wx.showToast({title: '刷新成功'});
        wx.stopPullDownRefresh();
    },
    toggleComplete() {
        done = !done;
        this.$store.todoStore.toggleAll(done);
    }
}))