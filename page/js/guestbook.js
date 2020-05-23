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
        var bid = -2;
       
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
                var bid = -2;
              
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
