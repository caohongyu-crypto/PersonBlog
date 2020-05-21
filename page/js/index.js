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

var articalList = new Vue({
    el:'#article-list',
    data:{
        articleList:[
            {
                title:'四杀幽门螺杆菌',
                content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, unde, rem quisquam vel, doloremque et vero ullam amet a assumenda suscipit. Iusto adipisci explicabo voluptatum ab dolores numquam aliquid sequi!',
                data:'2020-5-20',
                views:"520",
                tages:'幽门螺杆菌 萎缩性胃炎',
                id:'1',
                link:''
            },
            {
                title:'四杀幽门螺杆菌',
                content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, unde, rem quisquam vel, doloremque et vero ullam amet a assumenda suscipit. Iusto adipisci explicabo voluptatum ab dolores numquam aliquid sequi!',
                data:'2020-5-20',
                views:"520",
                tages:'幽门螺杆菌 萎缩性胃炎',
                id:'2',
                link:''
            }
        ]
    },
    computed:{

    },
    created(){

    }
})