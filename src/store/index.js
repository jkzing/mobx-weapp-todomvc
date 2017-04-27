import {observable} from 'mobx';
import {createStore} from 'mobx-weapp';
import todoStore from './todo';

export default function configureStore() {
    createStore({
        todoStore,
    });
}