<template>
  <div>
    <Loading v-if="isLoading" />
    <el-table v-else :data="nowTableData" border stripe style="width: 100%">
      <el-table-column prop="" label="头像" width="70px"> 
        <template slot-scope="scope" >
            <img class="userHead" :src="scope.row.userHead" >
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleToFreeze(scope.$index ,scope.row.email, scope.row.isFreeze)"
          >{{ scope.row.isFreeze ? "已冻结" : "未冻结" }}</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleToDelete(scope.$index, scope.row.email)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      isLoading: true
    };
  },
  mounted() {
    this.axios.get("/api2/admin/userlist").then(res => {
      var status = res.data.status;
      if (status === 0) {
        this.tableData = res.data.data.userlist;
        this.isLoading = false
      }
    });
  },
  computed: {
    nowTableData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize,this.currentPage*this.pageSize) || [];
    }
  },
  methods: {
    handleToFreeze(index, email, isFreeze) {
      this.axios
        .post("/api2/admin/updatefreeze", {
          email: email,
          isFreeze: !isFreeze
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$alert("更改用户信息成功", "冻结提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.tableData[index].isFreeze = !isFreeze;
              }
            });
          } else {
            this.$alert("更改用户信息失败", "冻结提示", {
              confirmButtonText: "确定"
            });
          }
        });
    },
    handleToDelete(index, email) {
      this.axios
        .post("/api2/admin/deleteuser", {
          email: email
        })
        .then(res => {
          var status = res.data.status;
          console.log(res.data);
          if (status === 0) {
            this.$alert("删除成功", "删除提示", {
              confirmButtonText: "确定",
              callback: action => this.tableData.splice(index, 1)
            });
          } else {
            this.$alert("删除失败", "删除提示", {
              confirmButtonText: "确定"
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.page {
  margin-top: 20px;
}
.userHead{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
</style>