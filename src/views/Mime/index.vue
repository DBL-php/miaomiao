<template>
  <div>
    <Header title="我的喵喵"></Header>
    <div id="content">
      <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from  '@/components/Login'

export default {
  name: 'Mime',
  components : {
    Header,
    TabBar,
    Login
  }
}

</script>
<style scoped>
</style>