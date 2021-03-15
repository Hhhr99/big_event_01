$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间";
            }
        }
    })
    formUserInfo()
    // 获取用户名称
    let layer = layui.layer;

    function formUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                // 成功
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置基本资料
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        formUserInfo();
    })

    // 提交基本资料
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                layer.msg('用户信息修改成功', {icon: 6});
                // 调用 index.html 里面的全局函数 重新获取用户信息
                window.parent.getUserInfo();
            }
        })

    })
})