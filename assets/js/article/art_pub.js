$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initCate();

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-cate', {data: res.data})
                $('[name="cate_id"]').html(htmlStr);
                // select需要更新渲染
                form.render();
            }
        })
    }

    // 2.初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击选择封面 选择图片
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        // 拿到用户的图片
        let file = e.target.files[0];
        // console.log(file);
        if (file === undefined) {
            $image.cropper('destroy')
            return layer.msg('您可以选择一张图片，当做文章封面')
        }
        let newImgURL = URL.createObjectURL(file);

        $image.cropper('destroy')       //销毁旧的裁剪区
            .attr('src', newImgURL)     //重新设置路径
            .cropper(options);          //重新初始化裁剪
    })

    // 设置状态
    let state = '已发布'
    // $('#btnSave1').on('click',function () {
    //     state='已发布';
    // })
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })

    // 发布文章
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData(this);
        // console.log(...fd);
        // 放入状态
        fd.append('state', state)
        // 放入图片
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {
                fd.append('cover_img', blob)
                // console.log(...fd);
                publishArticle(fd);
            })
    })

    // 封装
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，发布成功！！')
                // location.href = 'art_list.html'
                setTimeout(function () {
                    window.parent.document.getElementById('art_list').click()
                }, 1000)
            }
        })

    }

})