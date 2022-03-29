<template>
  <fragment>
    <!--没有子导航-->
    <el-menu-item v-if="!item.child" :index="item.path">
      <i v-if="item.icon" :class="item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    <!--有子导航-->
    <el-submenu v-else :index="String(index + 1)+item.title">
      <template slot="title">
        <!--如果item有icon才添加icon图标-->
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <!--判断子导航是否存在下一级的子导航，如果没有则渲染自己，如果有则递归组件-->
      <!--如果子导航中没有存在下一级的子导航 则是<el-menu-item> 否则为<el-submenu>-->
      <template v-for="(cItem, cIndex) in item.child" :index="String(index + 1 + '-' + cIndex + 1)">
        <el-menu-item v-if="!cItem.child" :index="cItem.path" :key="cItem.path">{{ cItem.title }}</el-menu-item>
        <el-submenu
          v-else
          :index="String(index + 1 + '-' + cIndex + 1)"
          :key="String(index + 1 + '-' + cIndex + 1)"
        >
          <i v-if="item.icon" :class="cItem.icon"></i>
          <span slot="title">{{ cItem.title }}</span>
          <!--递归自己 遍历子..导航-->
          <template v-for="(item, parentIndex) in cItem.child">
            <SideNav :item="item" :index="parentIndex+1" :key="parentIndex"></SideNav>
          </template>
        </el-submenu>
      </template>
    </el-submenu>
  </fragment>
</template>

<script>
export default {
  name: "SideNav",
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>
