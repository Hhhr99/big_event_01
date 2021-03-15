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
})