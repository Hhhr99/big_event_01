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

    // 3.拦截所有响应 验证身份登录
    options.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message === '身份认证失败！') {
            // 1.清空本地token
            localStorage.removeItem('token');
            // 2.页面跳转
            location.href = '/code/login.html';
        }
    }
})