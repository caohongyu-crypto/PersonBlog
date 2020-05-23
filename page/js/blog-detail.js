var blogDetail = new Vue({
    el:'#blog-detail',
    data:{
        title:'',
        content:'',
        ctime:'',
        tags:'',
        views:''
    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if(searchUrlParams == ''){//不存在就直接返回
            return;
        }
        var bid = -10;
        for(var i = 0; i < searchUrlParams.length; i++){
            var newArr = searchUrlParams[i].split('=');
            if(newArr[0] == 'bid'){
                try{
                    bid = newArr[1];
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            method:'get',
            url:'/queryBlogById?bid=' + bid
        }).then(resp => {
            var result = resp.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.ctime = result.ctime;
            this.tags = result.tags;
            this.views = result.views;
        }).catch(resp => {
            console.log("请求失败");
        })
    }
})

//发表评论区
var sendComment = new Vue({
    el:'#send-comments',
    data:{
        vcode:'',
        rightCode:''
    },
    computed:{
        sendComment(){
            return function(){
                var code = document.getElementById('comment-code').value;
                if(code != this.rightCode){
                    alert('验证码有误,请重新输入')
                    this.changeCode();
                    return;
                }
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                var bid = -10;
                for(var i = 0; i < searchUrlParams.length; i++){
                    var newArr = searchUrlParams[i].split('=');
                    if(newArr[0] == 'bid'){
                        try{
                            bid = newArr[1];
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById('comment-reply').value;
                var replyName = document.getElementById('comment-reply-name').value;
                var name = document.getElementById('comment-name').value;
                var email = document.getElementById('comment-email').value;
                var content = document.getElementById('comment-content').value;
                axios({
                    method:'get',
                    url:'/addComment?bid=' + bid + '&parent=' + reply + '&userName=' + name + '&email=' + email + '&content=' + content + '&parentName=' + replyName
                }).then(resp => {
                    alert(resp.data.msg);
                })
            }
        }
    },
    methods:{
        changeCode(){
            axios({
                method:'get',
                url:'/queryRandomCode'
            }).then(resp => {
                this.vcode = resp.data.data.data;
                this.rightCode = resp.data.data.text;
            })
        }
    },
    created(){
        this.changeCode();
    }
})

var blogComments = new Vue({
    el:'#blog-comments',
    data:{
        total:100,
        comments:[]
    },
    computed:{
        reply(){
            return function(id, userName){
                document.getElementById('comment-reply').value = id;
                document.getElementById('comment-reply-name').value = userName;
                location.href = '#send-comments';
            }
        }
    },
    created(){
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        var bid = -10;
        for(var i = 0; i < searchUrlParams.length; i++){
            var newArr = searchUrlParams[i].split('=');
            if(newArr[0] == 'bid'){
                try{
                    bid = newArr[1];
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            method:'get',
            url:'/queryCommentByBlogId?bid=' + bid
        }).then(resp => {
            this.comments = resp.data.data;
            for(let i = 0; i < this.comments.length; i++){
                if(this.comments[i].parent > -1){
                    this.comments[i].options = '回复@' + this.comments[i].parent_name;
                }
            }
        });
        axios({
            method:'get',
            url:'/queryCommentsCountByBolgId?bid=' + bid
        }).then(resp => {
            this.total = resp.data.data[0].count;
        })
    }
})