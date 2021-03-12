// 入口函数
$(function () {
    // 1.点击去账册章好，隐藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 2.点击去登录，显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})