<template>   
    <el-container id="a">
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
  }

  .el-header h1 {
    margin: 5px 0px;
  }

  .el-divider{
    margin-top: 0px;
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
        },
        {
          title: "T_WL_ITEMSIZE",
          path: "/T_WL_ITEMSIZE"
        },
        {
         
          title: "admin",
          child: [
             {
              title: "testadmin",
              path: "/a"
            },
            {
              title: "testadmin",
              path: "/b"
            }
          ]
        }
      ]
    }
  },
  created: function() {
    let token = window.sessionStorage.getItem('access-token');
    this.$axios.get('/USER_AUTHORITY/'+token,).then(res=>{
      console.log(res.data);
      this.nav=res.data;
    })
  }
}
      

  // export default {
  //   data() {
  //     const item = {
  //       date: '2016-05-02',
  //       name: '王小虎',
  //       address: '上海市普陀区金沙江路 1518 弄'
  //     };
  //     return {
  //       tableData: Array(5).fill(item)
  //     }
  //   }
  // };
</script>