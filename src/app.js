import {sleep} from './utils/utils';
import request, {setCredentials} from './utils/wx-request';
import {createStore, observer} from 'mobx-weapp';
import configureStore from './store';

configureStore();

App({
    async onLaunch() {
        // try {
        //     wx.showLoading({
        //         title: '加载中',
        //         mask: true,
        //     });
        //     wx.hideLoading();
        // } catch (error) {
        //     console.error(error);
        // }
    }
})
