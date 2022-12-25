<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="请输入关键词"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree"
      :data="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
   
    />
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
        label: "title",
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

