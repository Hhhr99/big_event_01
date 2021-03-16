$(function () {
    // 1.文件类别列表展示
    initArtCateList();

    //封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                let htmlStr = template('tp1-art-cate', {data: res.data});
                $('tbody').html(htmlStr);
            }
        })
    }

    // 2.显示添加文章类别列表
    let layer = layui.layer
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })

    // 3.提交文章分类
    let indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                layer.msg(res.message, {icon: 6});
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    })

    // 4.编辑
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })
        // 渲染修改文章分类
        let Id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message);
                form.val('form-edit', res.data)
            }
        })
    })

    // 5.修改文章分类
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                initArtCateList();
                layer.msg(res.message, {icon: 6});
                layer.close(indexEdit);
            }
        })
    })

    // 6.删除文章分类
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('确定删除?', {icon: 3, title: '提示'},
            function (index) {
                $.ajax({
                    url: '/my/article/deletecate/' + Id,
                    success: (res) => {
                        // console.log(res)
                        if (res.status !== 0) {
                            return layer.msg(res.message, {icon: 5})
                        }
                        initArtCateList();
                        layer.msg(res.message, {icon: 6});
                        layer.close(index);
                    }
                })
            })
    })
})