<template>
  <div>
    <div id="login_bac">
      <div id="login">
        <div id="login_top">后台管理系统</div>
        <el-form
          :model="ruleForm" 
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div id="login_buttom">
            <el-form-item prop="user">
              <el-input
                prefix-icon="el-icon-s-custom"
                clearable
                v-model="ruleForm.user"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input prefix-icon="el-icon-lock" 
              show-password 
              v-model="ruleForm.pass" 
              placeholder="请输入密码"
            ></el-input>
            </el-form-item>
            <p id="login_md">
              <span>注册账号</span>
              <span>忘记密码？</span>
            </p>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="goin">登录</el-button>
            </el-form-item>
            <p id="login_msg"></p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import {loginAPI} from '../api/api';
export default {
  data() {
    return {
      ruleForm: {
        user: '',
        pass: '',
      },
      rules: {
        user: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6,message: '至少6个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    goin() {
      //element方法，valid为一个布尔值，能够知道表单的内容是否都符合验证规则
      this.$refs.ruleForm.validate(async (valid)=>{
        if(valid){
          // {account:this.ruleForm.user,password:this.ruleForm.pass}
          // let data = await loginAPI({user:this.ruleForm.user,pass:this.ruleForm.pass})
          // console.log(data);
          
          if(data.data.code === 0){
            this.$message.success('登录成功'); 
            setTimeout(()=>{
              this.$router.push("/home");
            },1000) 
          }else{
            this.$message.error('登录失败');
          }
        }else{
          this.$message.error('请正确输入用户名或密码');
        }
      })
    }
  }
};
</script>

<style scoped>
#login_bac {
  width: 100vw;
  height: 100vh;
  /* background: url("../assets/img/login-bg.jpg") center center no-repeat; */
  background-size: cover;
}
#login {
  width: 350px;
  height: 300px;
  color: rgb(255, 255, 255);
  background-color: rgba(226, 225, 225, 0.3);
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
}
#login_top {
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #fff;
}
#login_buttom {
  height: 200px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#login_buttom div:nth-of-type(2){
    margin-bottom: 18px;
}
.el-input {
  font-size: 15px;
}
#login_md {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
#login_md span {
  cursor: pointer;
}
#login_go {
  width: 290px;
  height: 38px;
  line-height: 38px;
  font-size: 15px;
  text-align: center;
  letter-spacing: 8px;
  border-radius: 4px;
  background-color: #409eff;
  cursor: pointer;
}
</style>