var blogList = new Vue({
    el:'#blog-list',
    data:{
        blogList:[]
    },
    computed:{

    },
    created(){
        axios({
            method:'get',
            url:'/queryAllBlog'
        }).then(resp => {
            for(let i = 0; i < resp.data.data.length; i++){
                resp.data.data[i].link = '/blog-detail.html?bid=' + resp.data.data[i].id;
            }
            this.blogList = resp.data.data;
        })
    }
})