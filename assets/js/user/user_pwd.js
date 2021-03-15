$(function () {
    //定义密码规则
    let form = layui.form;
    form.verify({
        // 原密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新密码和旧密码不能相同
        // 新密码
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '原密码和新密码不能相同！！'
            }
        },
        // 两次新密码必须一致
        // 确认密码
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码不一致！！'
            }
        }
    })

    // 重置密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {icon: 5})
                }
                return layui.layer.msg('密码修改成功！', {icon: 6})
                $('.layui-form')[0].reset();
            }
        })

    })
})