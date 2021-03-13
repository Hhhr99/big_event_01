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

    // 4.注册功能
    $('#form_reg').on('submit', function (e) {
        //阻止跳转
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5});
                }
                layer.msg('恭喜,您注册成功！', {icon: 6});
                //跳转登录页
                $('#link_login').click();
                //清空注册输入框
                $('#form_reg')[0].reset();
            }
        })

    })

    // 5.登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5});
                }
                layer.msg('恭喜,登录成功！', {icon: 6});
                //储存本地 以后用
                localStorage.setItem('token', res.token);
                //跳转页面
                location.href = '/code/index.html';
            }
        })

    })
})