// $(function () {
//
// })

$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
// 1.2 配置选项
    let options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

// 1.3 创建裁剪区域
    $image.cropper(options)


    //上传图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    let layer = layui.layer;
    $('#file').on('change', function (e) {
        console.log(this.files)
        let file = e.target.files[0];
        // 非空效验
        if (file === undefined) {
            return layer.msg('请选择图片!!!');
        }
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // console.log(dataURL);
        // console.log(typeof dataURL);
        // 发送ajax
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                layer.msg('修改头像成功', {icon: 6})
                window.parent.getUserInfo()
            }
        })

    })
})