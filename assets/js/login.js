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

    // 3.自定义验证规则
    const form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须为6-16位，且不能输入空格"
        ],
        // 确认密码规则
        repwd: function (value) {
            // 选择器必须带空格，选择的是后代中的input,name属性值为password的哪一个标签
            const pwd = $('.reg-box input[name=password]').val();
            // 比较
            if (value !== pwd) {
                return "两次输入的密码不一样";
            }
        }
    });
})