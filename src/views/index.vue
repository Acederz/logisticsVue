<template>   
    <el-container :style="{minHeight :minHeight +'px'}">
        <el-header><h1>脱普数据导入系统</h1></el-header>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">
               <el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
             ref="menu" router>
                  <!--动态生成sideItem-->
                  <template v-for="(item, parentIndex) in nav">
                    <SideNav :item="item" :index="parentIndex"  :key="parentIndex"></SideNav>
                  </template>
                </el-menu>
          </el-col>
          <el-col :span="20">
                <el-main>
                    <router-view/>
                </el-main>
          </el-col>
        </el-row>
    </el-container>
</template>
<style>
  .el-header {
    text-align: left;
    padding: 0;
    width: 100%;
  }

  .el-header h1 {
    margin: 0.3% 0.3%;
  }

  .el-divider{
    margin-top: 0px;
  }

  .el-main {
    overflow: visible;
  }
</style>

<script>
import SideNav from "../components/SideNav";
 
export default {
  components: { SideNav},
  data() {
    return {
      nav:[
        {
         
          title: "首页",
          path: "/index"
        }
      ]
    }
  },
  created: function() {
    let account = localStorage.getItem('account');
    this.$axios.get('/USER_AUTHORITY/'+account,).then(res=>{
        this.nav=res.data;
         console.log(res.data.code);
        if(res.data.code == 50000) {
          this.$router.push({path:'/login'});
        }
    })
  }, 
  mounted() {
    this.minHeight = document.documentElement.clientHeight - 0;
    this.marginLeft = (document.documentElement.clientWidth - 1920) / 2;
    const that = this;
    window.onresize = function () {
      that.minHeight = document.documentElement.clientHeight - 0;
      that.marginLeft = (document.documentElement.clientWidth - 1920) / 2
    };
  }
}
      
</script>