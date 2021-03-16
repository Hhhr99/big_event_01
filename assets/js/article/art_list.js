$(function () {
    // 时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth());
        let d = padZero(dt.getDay());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + '-' + mm + '-' + ss;

        //如果是个位数，在前面补0
        function padZero(n) {
            return n > 9 ? n : '0' + n;
        }
    }
    let q = {
        pagenum: 1, // 是	int	页码值
        pagesize: 2,// 是	int	每页显示多少条数据
        cate_id: '',// 否	string	文章分类的 Id
        state: '' // 否	string	文章的状态，可选值有：已发布、草稿
    }

    let layer = layui.layer;
    initTable();

    // 分页渲染
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                // layer.msg(res.message, {icon: 6})
                let htmlStr = template('tpl-table', {data: res.data})
                $('tbody').html(htmlStr)
                // 分页
                renderPage(res.total);
            }
        })
    }

    // 文章类别分类下拉框渲染
    initCate();

    // 封装
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tp1-cate', {data: res.data})
                $('[name="cate_id"]').html(htmlStr);
                // select需要更新渲染
                layui.form.render();
            }
        })

    }

    // 筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name="cate_id"]').val()
        let state = $('[name="state"]').val()
        // 赋值
        q.cate_id = cate_id;
        q.state = state;
        // 初始化文章列表
        initTable();
    })

    // 分页
    let laypage = layui.laypage;

    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,       //数据总数，从服务端得到
            limit: q.pagesize,  //每页显示多少数据
            curr: q.pagenum,    //当前页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function (obj, first) {
                // console.log(obj);
                // console.log(first);
                if (!first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    initTable();
                }
            }
        });
    }


    //删除文章
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('确定删除?', {icon: 3, title: '提示'},
            function (index) {
                $.ajax({
                    url: '/my/article/delete/' + Id,
                    success: (res) => {
                        // console.log(res)
                        if (res.status !== 0) {
                            return layer.msg(res.message, {icon: 5})
                        }
                        layer.msg(res.message, {icon: 6})
                        if ($('.btn-delete').length === 1 && q.pagenum > 1) q.pagenum--;
                        initTable()
                        layer.close(index);
                    }
                })
            });
    })

})