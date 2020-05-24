var everyDay = new Vue({
    el:'#every-day',
    data:{
        content:'sasasasa'
    },
    computed:{
        getContent(){
            return this.content
        }
    },
    created(){
        //向后端请求数据,给content赋值
        axios({
            method:"get",
            url:"/queryEveryDay"
        }).then(resp => {
            this.content = resp.data.data[0].content;
        }).catch(err => {
            console.log('请求失败');
        })
    }
})

var articleList = new Vue({
    el:'#article-list',
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[]
    },
    computed:{
        jumpTo(){//跳转页面
            return function(page){
                this.getPage(page, this.pageSize);
            }
        },
        getPage(){
            return function(page, pageSize){
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                var tag = '';
                for(var i = 0; i < searchUrlParams.length; i++){
                    var newArr = searchUrlParams[i].split('=');
                    if(newArr[0] == 'tag'){
                        try{
                            tag = newArr[1];
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                if(tag == ''){//不是查询的情况
                    axios({
                        method:'get',
                        url:'/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(resp => {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.data = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tages = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog-detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(resp => {
                        console.log('请求错误');
                    })
                    axios({
                        method:'get',
                        url:'/queryBlogCount'
                    }).then(resp => {
                        this.count = resp.data.data[0].count;
                        this.gengeratePageTool;//生成翻页插件
                    })
                }else{//根据tag查询
                    console.log(tag);
                    axios({
                        method:'get',
                        url:'/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(resp => {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.data = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tages = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog-detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        this.articleList = list;
                        this.page = page;
                    }).catch(resp => {
                        console.log('请求错误');
                    })
                    axios({
                        method:'get',
                        url:'/queryByTagCount?tag=' + tag
                    }).then(resp => {
                        this.count = resp.data.data[0].count;
                        this.gengeratePageTool;//生成翻页插件
                    })
                }
                
            }
        },
        gengeratePageTool(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:'首页', page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2, page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1, page:nowPage - 1});
            }
            result.push({text:nowPage, page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 1, page:nowPage + 1});
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 2, page:nowPage + 2});
            }
            result.push({text:'尾页', page:parseInt((totalCount + pageSize - 1) / pageSize)})
            this.pageNumList = result;
            return result;
        }
    },
    created(){
        this.getPage(this.page, this.pageSize);
    }
})

