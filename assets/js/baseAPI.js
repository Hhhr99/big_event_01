// 1.开发环境路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 2.测试环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// 3.生产环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';


$.ajaxPrefilter(function (options) {
    // console.log(options);
    // 1.添加根路径
    options.url = baseURL + options.url;


    // 2.身份认证
    if (options.url.indexOf('/my/') > -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})