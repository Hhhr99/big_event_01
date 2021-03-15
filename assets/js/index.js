$(function () {
    // 需求1：ajax获取用户信息，渲染到页面
    // 这个功能，后面其它的页面/模块还要用，所以必须设置为全局函数
    getUserInfo();

});

//必须保证这个函数是全局的，后面其它功能要用
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        //配置头信息，设置token，身份识别认证！
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: (res) => {
            console.log(res)

            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //请求成功 渲染头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}
