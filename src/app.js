import {sleep} from './utils/utils';
import request, {setCredentials} from './utils/wx-request';
import {createStore, observer} from 'mobx-weapp';
import configureStore from './store';

configureStore();

App({
    async onLaunch() {
        try {
            wx.showLoading({
                title: '加载中',
                mask: true,
            });
            const {
                response,
            } = await request('api/v1/auths/xxx/customer_get_openid/', {hawk: false});
            wx.hideLoading();
        } catch (error) {
            console.error(error);
        }
    }
})
