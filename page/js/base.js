var randomTags = new Vue({
    el:'#random-tags',
    data:{
        tags:[]
    },
    computed:{
        randomColor(){
            return function (){
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red}, ${green}, ${blue})`;
            }
        },
        randomSize(){
            return function(){
                var size = Math.random() * (20 - 15) + 15 + 'px';
                return size;
            }
        }
    },
    created(){
        axios({
            method:'get',
            url:'/queryRandomTags'
        }).then(resp => {
            for(let i = 0; i < resp.data.data.length; i++){
                resp.data.data[i].link = '/?tag=' + resp.data.data[i].tag;
            }
            this.tags = resp.data.data;
        })
    }
})

var newHot = new Vue({
    el:'#new-hot',
    data:{
        titleList:[]
    },
    created(){
        axios({
            method:'get',
            url:'/queryHotBlog'
        }).then(resp => {
            for(let i = 0; i < resp.data.data.length; i++){
                resp.data.data[i].link = '/blog-detail.html?bid=' + resp.data.data[i].id;
            }
            this.titleList = resp.data.data;
        })
    }
})

var newComment = new Vue({
    el:'#new-comment',
    data:{
        commentList:[]
    },
    created(){
        axios({
            method:'get',
            url:'/queryNewComment'
        }).then(resp => {
            this.commentList = resp.data.data;
        })
    }
})


var hanbor = document.getElementsByClassName('hanbor')[0];
var menu = document.getElementsByClassName('menu')[0];
hanbor.onclick = function(){
    var attr = menu.getAttribute('style');
    if(attr){
        var arr = attr.split(': ');
        if(arr[1] == 'block;'){
            menu.style.display = 'none';
        }else{
            console.log('aa');
            menu.style.display = 'block';
        }
    }else{
        menu.style.display = 'block';
    }
}