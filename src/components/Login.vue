<!--模板区-->
<template>
   <div class="login_container">
     <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png">
        </div>
       <!--:model数据绑定，指向一个数据对象   ref为表单引用对象-->
       <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
         <el-form-item prop="username">
           <!--v-model绑定到数据对象上-->
           <el-input v-model="loginForm.username" ref="ruleForm" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
         </el-form-item>
         <el-form-item prop="password">
           <el-input v-model="loginForm.password" prefix-icon="el-icon-s-goods" type="password" placeholder="密码"></el-input>
         </el-form-item>
         <el-form-item class="btns">
           <el-button type="primary" @click="login">登录</el-button>
           <el-button type="info" @click="resetLoginForm">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>
<!--行为区-->
<script>
    export default {
        name: "Login.vue",
        data(){
          return {
            //这是登录表单的数据绑定对象
            loginForm:{
              username:'admin',
              password:'111111'
            },
            loginFormRules:{
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
              ]
            }
          }
        },
        methods:{
          login() {
            this.$refs.loginFormRef.validate(async (valid) => {
              if (valid) {
                //await简化promise返回结果   await只能在async修饰的方法中生效
               const {data:res} = await this.$http.post('admin/login',this.loginForm);
               console.log(res)
                if(res.code != 200)
                {
                  return this.$message.error(res.message);
                }
                window.sessionStorage.setItem("token",res.data.token);
                //跳转
                this.$router.push("/home");
                this.$message.success(res.message);
                // 1.将登录成功后的token保存到客户端的sessionStorage中
                //   1.1项目中除了登录之外的其他api接口，必须在登录之后才能访问
                //   1.2token只应在当前网站打开期间生效，所以将token保存到sessionStorage中
                // 2.通过编程式导航跳转到后台主页，路由地址是/houme

              }
            });
          },
          resetLoginForm(){
           // console.log(this)
            this.$refs.loginFormRef.resetFields();
          }
        }
    }
</script>
<!--支持less语法   scoped是vue指令，控制样式生效区间，表示只在当前组件内生效-->
<!--安装less-loader  以及less   less-loader依赖于less  -->
<style lang="less" scoped>
.login_container{background-color: #2b4b6b;height:100%;}
.login_box{
  background-color: #fff;
  width: 40%;
  height: 50%;
  position: absolute;
  left: 30%;
  top: 25%;
  border-radius: 3px;
}
  .avatar_box{
    width: 20%;
    height: 30%;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 40%;
    transform: translate(0,-50%);
    background-color: #fff;
    >img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
  }
</style>

