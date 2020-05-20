var randomTags = new Vue({
    el:'#random-tags',
    data:{
        tags:['asd', 'qwe', 'fwe', 'zxc', 'sasa', 'wres', 'canvas','asd', 'qwe', 'fwe', 'zxc', 'sasa', 'wres', 'canvas', 'canvas','asd', 'qwe', 'fwe', 'zxc', 'sasa', 'wres', 'canvas']
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

    }
})

var newHot = new Vue({
    el:'#new-hot',
    data:{
        titleList:[
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'},
            {title:'这是一个连接', link:'https://www.baidu.com'}
        ]
    }
})

var newComment = new Vue({
    el:'#new-comment',
    data:{
        commentList:[
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'},
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'},
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'},
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'},
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'},
            {name:'用户名', data:'2020-5-20', comment:'这里是一大串评论'}
        ]
    }
})