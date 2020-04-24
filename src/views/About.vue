<template>
  <div class="about">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="cost_type_name" label="费用" width="180"></el-table-column>
      <el-table-column prop="cost_type_default_amount" label="价格" width="180"></el-table-column>
      <el-table-column prop="cost_type_remark" label="类型"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
// axios.defaults.headers.common['authorization'] = 1; // 设置token
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let data = await axios
        .get("http://api.jimaotong.cn/v1/base-cost-type")
        .then(res => res.data);
      if (data.code === 200) {
        this.list = data.data.items;
      } else {
        this.$message({
          type: "error",
          message: "请求失败!"
        });
      }
    }
  }
};
</script>