<template>
  <div>
      <nav class="nav">
          <ul>
            <li>列表</li>
            <li class="active">日</li>
            <li>月</li>
          </ul>
      </nav>
      <div class="m-h">
        <ul class="m-header">
          <li v-for="(val,key) in week" :key="key">
            {{val}}
          </li>
        </ul>
      </div>
      <div class="m-content">
        <div 
          class="m-move" 
          @touchstart = "start"
          @touchmove = "move"
          @touchend = "end"
          :style="{transform:`translateX(${x}px)`,transition:transitionNum}"
          ref="mMove"
        >
          <div class="m-content-box">
            <div class="m-bg">{{month===0?12:month}}</div>
            <ul class="days">
              <li v-for="(val,key) in prevDays" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month-1)
                    }
                  ]"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
          <div class="m-content-box">
            <div class="m-bg">{{month+1}}</div>
            <ul class="days">
              <li v-for="(val,key) in days" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month)
                    }
                  ]"
                  @click="click(val)"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
          <div class="m-content-box">
            <div class="m-bg">{{month+2===13?1:month+2}}</div>
            <ul class="days">
              <li v-for="(val,key) in lastDays" :key="key" class="m-row">
                <span
                  :class="[
                    {
                      today:val.getDate() === day
                    },
                    {
                      past:!isCurrentMonthDay(val,month+1)
                    }
                  ]"
                >{{val | getday }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  function getYearMonthDay(year,month,day){
    let d = new Date(...arguments); //设置现在的时间
    let week = d.getDay();//今天是周几
    let startDay = d - week * 86400000;
    let ary = [];
    for(let i=0;i<42;i++){
      ary.push(new Date(startDay+i*86400000))
    }
    return ary;
  }
  export default {
    name:'calendar',
    props:{
      time:{
        default:()=>{
          return new Date();
        }
      }
    },
    data(){
      return {
        week:['周日','周一','周二','周三','周四','周五','周六'],
        days:[],
        lastDays:[],
        prevDays:[],
        day:this.time.getDate(),
        month:this.time.getMonth(),
        year:this.time.getFullYear(),
        disX:0, //按下的坐标
        x:0,//实际移动的坐标
        screenX:0,//设备尺寸
        transitionNum:0,//运动的状态
        movex:0
      }
    },
    filters:{
      //确定是否为今天
      getday(val){
        //先把数组中传过来的时间获取到年月日
        let y = val.getFullYear();
        let m = val.getMonth()+1;
        let d = val.getDate();

        //再和今天进行对比
        let now = new Date;
        if(y === now.getFullYear() && m === now.getMonth()+1 && d === now.getDate()){
          return '今';
        }
        return d;
      }
    },
    mounted(){
      console.log(this.time)
      //初始化
      this.getDays();
      this.screenX = window.screen.width;
      this.x = - this.screenX;
    },
    methods:{
      click(val){
        console.log(val);
      },
      //确定数字是否为当前年月
      isCurrentMonthDay(val,month){
        //这里可以过一会讲
        if(month === 12){
          month = 0;
        }else if(month === -1){
          month = 11;
        }
        return val.getMonth() === month;
      },
      getDays(lastYear){
        this.prevDays = getYearMonthDay(this.year,this.month-1,1);
        this.days = getYearMonthDay(this.year,this.month,1);
        this.lastDays = getYearMonthDay(this.year,this.month+1,1);
      },
      start(ev){
        this.disX = ev.changedTouches[0].pageX; 
        this.transitionNum = 'none';

        let num = Math.round(getComputedStyle(this.$refs.mMove).transform.split(',')[4] / this.screenX);

        let d = new Date(this.year,this.month,1);//设置当前月
        

        if(Math.abs(num) === 2){ //++
                  
          d.setMonth(this.month+1);  //设置一个下个月的时间
          
        }else if(Math.abs(num) === 0){ //--
         
          d.setMonth(this.month-1);  //设置一个上个月的时间
      
        }

        this.year = d.getFullYear();
        this.month = d.getMonth();

        this.getDays();

        this.x = -this.screenX;
     
      },
      move(ev){
        //页面移动的距离 = 滑动 - 手指按下的坐标 + 屏幕的距离（因为每次滑动都是从中间开始）
        this.movex = ev.changedTouches[0].pageX - this.disX;
        this.x = - this.screenX + this.movex;
      },
      end(){
        
        this.transitionNum = '.5s';
        //最终的位置，四舍五入
        let num = Math.round(getComputedStyle(this.$refs.mMove).transform.split(',')[4] / this.screenX)
        this.x = num * this.screenX; //计算最终页面的位置
      }
    }
  }
</script>

<style scoped>
.nav ul{
  width:60%;
  margin: 0 auto;
  display: flex;
  border: 1px solid cornflowerblue;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.nav ul li{
 flex: 1;
 text-align: center;
 color:cornflowerblue;
 height: 30px;
 line-height: 30px;
 font-size:14px;
}
.nav ul li.active{
  color: #fff;
  background: cornflowerblue;
}




.m-header{
  width: 90%;
  margin: 0 auto;
  display: flex;
  font-size:11px;
}
.m-header li{
  flex: 1;
  text-align: center;
  line-height: 18px;
}
.m-content{
  height:240px;
}

.days{
  width:90%;
  margin: 0 auto;
}

.m-move{
  width:300%;
}

.m-content-box{
  width:100vw;
  position:relative;
  height: 240px;
  float: left;
}

.m-bg{
  position: absolute;
  left:0;
  top:0;
  height:240px;
  width:100%;
  text-align: center;
  line-height: 240px;
  font-size:200px;
  color:cornflowerblue;
  opacity: .1;
}

.m-row{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: calc(100% / 7);
    text-align: center;
    cursor: pointer;
    position: relative;
    float: left;
}
.m-row ::before{
    content: '';
    position: absolute;
    background-color: #ccc;
    display: block;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
}
.m-row span{
  width:30px;
  height:30px;
  display:inline-block;
  line-height: 30px;
  border-radius: 100%;
}

.today{
  background: cornflowerblue;
  color:#fff;
}

.past{
  color:#ccc;
}
</style>