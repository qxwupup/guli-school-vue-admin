<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="请输入关键词"
      style="margin-bottom: 30px"
    />

    <!-- <el-tree
      ref="tree"
      :data="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
   
    /> -->

    <el-tree
      ref="tree"
      :data="tree"
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
       >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span >{{ node.label }}</span>
        <span >
          <el-button type="primary" size="mini"  icon="el-icon-circle-plus-outline" >新增</el-button>
          <el-button type="danger"  size="mini"  icon="el-icon-remove-outline">删除</el-button>
        </span>
      </span>
    </el-tree> <!--show-checkbox-->

    
  </div>
</template>

<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      tree: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getAllSubject();
  },

  methods: {
    getAllSubject() {
      subject
        .getSubjectList()
        .then((response) => {
          this.tree = response.data.list;
        })
        .catch();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>

<style >
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 10px;
  }
  .el-tree-node__content {
     height: 40px;
  }
 
</style>

