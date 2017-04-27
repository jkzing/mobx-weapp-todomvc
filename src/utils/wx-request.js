import {createHawkHeader} from 'h-rest/lib/hawkAuth';
import {camelizeKeys, decamelizeKeys} from 'humps';

const credentials = {};

const BODY_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const API_ROOT = 'http://127.0.0.1:8000/';

const CACHE = {};

export function setCredentials(id, key) {
    credentials.id = id;
    credentials.key = key;
}

export default function request(url, {
    method = 'GET',
    body,
    hawk = true,
    noCache = false
}) {
    const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url: url;

    let options = {
        method: method,
        headers: {}
    };

    if (body) {
        let decamelized = decamelizeKeys(body)
        options.body = JSON.stringify(decamelized);
        options.headers = Object.assign({}, options.headers, BODY_HEADERS);
    }
    if (hawk) {
        if (!credentials.id || !credentials.key) {
            throw new Error('Not logged in user can not access this API.');
        }

        let authorization = createHawkHeader({
            url: fullUrl,
            ...options
        }, credentials);
        options.headers.Authorization = `${authorization}`;
    }
    // only allow cache for GET requests
    if (!noCache
        && method === 'GET'
        && CACHE[url]) return {response: CACHE[url]};
    return new Promise(function(resolve, reject) {
        wx.request({
            url: fullUrl,
            data: options.body,
            method: options.method,
            header: options.headers, 
            success: function(res){
                console.log(res);
                resolve({response: res.data});
            },
            fail: function(err) {
                // fail
                console.log(err);
                reject(err);
            },
            complete: function() {
                // complete
            }
        });
        
        // return fetch(fullUrl, options)
        //     .then(response => {
        //         let contentType = response.headers.get('content-type');
        //         if (contentType === 'application/json') {
        //             return response.json()
        //                 .then(json => ({
        //                     json: camelizeKeys(json),
        //                     response
        //                 }));
        //         } else if (contentType === 'application/vnd.ms-excel') {
        //             // 返回的是excel文件，直接下载
        //             return this.downloadBlob(response);
        //         }
        //         return {response};

        //     }).then(({json, response}) => {
        //         if (response.ok) {
        //             this.retryCount = 0;
        //             this.cache[endpoint] = json;
        //             return {response: json};
        //         }
        //         // 如果是timestamp不匹配，根据返回的timestamp重新尝试hawk验证
        //         if (retryHawk({json, response}, this.credentials) && this.retryCount < 1) {
        //             this.retryCount++;
        //             return this.callApi(endpoint, this.credentials, {method, body, hawk});
        //         } else {
        //             this.retryCount = 0;

        //             let err = json;
        //             if (response.status >= 500) {
        //                 err = {
        //                     message: '服务器出错了',
        //                     status: 500,
        //                 };
        //             } else if (response.status === 404) {
        //                 err = {
        //                     message: '未找到访问的资源',
        //                     status: 404,
        //                 };
        //             }
        //             return Promise.reject(err);
        //         }
        //     }).catch((e={}) => {
        //         this.captureError(endpoint, e.status, e, options);
        //         return Promise.reject(e);
        //     });
    })
}

/**
     * 主要发起请求方法，包含hawk验证，自动下载excel
     * @param {string} endpoint 
     * @param {object} options
     */
    // callApi(endpoint, {method='GET', body, hawk=true, noCache=false}={}) {
 
    // }
