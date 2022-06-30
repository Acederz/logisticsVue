<template> 
    <div id="login" class="login">
        
    
        <el-form ref='AccountFrom' :model='account' :rules='rules' lable-position='left' lable-width='0px' class='demo-ruleForm login-container'>
            
            <h3 class="title">登录系统首页</h3>
            
            <el-form-item prop="username">
                <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            
            <el-form-item prop="password">
                <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent='handleLogin' :loading= 'logining'>登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                logining: false,
                account: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                },
                checked: true
            }
        },
        methods:{
            handleLogin(){
                this.$refs.AccountFrom.validate((valid)=>{
                    
                    if(valid){
                        //验证通过 可以提交
                        this.logining = true;
                        //将提交的数据进行封装
                        var loginParams = {username : this.account.username,password:this.account.password};
                        
                        //调用函数  传递参数 获取结果
                        this.$axios.post('/login',this.$qs.stringify(loginParams),).then(res=>{
                            
                            this.logining = false;
                            console.log(res.data);
                            if(res.data.code == 200){
                                //将token和user保存到localStorage中
                                this.$store.commit('setToken',res.data.token);
                                this.$store.commit('setAccount',res.data.account);
                                //跳转到登录成功后的页面
                                this.$router.push({path:'/index'});
                            }else{
                                this.$message({
                                    message:res.data.msg,
                                    type:'error'
                                });
                            }
                        })
                        
                    }else{
                        console.log('error submit');
                        return false;
                    }
                });
            }
        }
    }
</script>
   
<style>
 div.login {
        width:400px;
        margin: 100px auto;
    }
</style>