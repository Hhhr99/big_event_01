// 1.开发环境的服务器地址
let baseURL = 'http://ajax.frontend.itheima.net'


$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
})