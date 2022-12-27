<template>
  <div class="app-container">
    课程列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getCourseList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程状态" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal' ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称"  align="center"/>
      <el-table-column label="讲师"  width="100" align="center">
          <template slot-scope="scope">
            <span :key=teacher.id v-for="teacher in teacherList" >
              <span v-if="teacher.id==scope.row.teacherId">{{teacher.name}}</span>
            </span>
          </template>
      </el-table-column>
      <!-- <el-table-column prop="subjectParentId" label="一级分类" width="160" /> -->

     <el-table-column  label="一级分类" width="100" align="center" >
        <template slot-scope="scope">
           <span :key=subjectOne.id v-for="subjectOne in subjectOneList" >
            <span v-if="subjectOne.id==scope.row.subjectParentId">{{subjectOne.title}}</span>
           </span>
        </template>
     </el-table-column>
      <el-table-column  label="二级分类" width="100" align="center" >
        <template slot-scope="scope">
           <span :key=subjectTwo.id v-for="subjectTwo in subjectTwoList" >
            <span v-if="subjectTwo.id==scope.row.subjectId">{{subjectTwo.title}}</span>
           </span>
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="总课时" width="100" align="center" />

     <el-table-column prop="price" label="售价" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.price + "元" }}
        </template>
     </el-table-column>

      <el-table-column prop="viewCount" label="浏览数量" width="100" align="center"/>

      <el-table-column prop="buyCount" label="销售数量" width="100" align="center"/>

     <el-table-column prop="gmtCreate" label="添加时间" width="200" align="center" />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>

           <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link> 

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)" >删除课程所有信息</el-button >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getCourseList"
    />
  </div>
</template>


<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import teacher from "@/api/edu/teacher";

export default {

  data() {
    return {
      list: null,
      page: 1,
      size: 3,
      total: 0,
      courseQuery: {},
      subjectOneList: [],
      subjectTwoList: [],
      teacherList:[],
    };
  },
  created() {
    this.getCourseList(1);
    this.getOneSubject()
    this.getAllTeacherList()
  },
  methods: {
    getAllTeacherList(){
      teacher.getAllTeacher().then(response=>{
        this.teacherList = response.data.items
        console.log(this.teacherList)
      })
    },
    //查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list;
        this.subjectOneList.forEach(element => {
          this.subjectTwoList=[...element.children,...this.subjectTwoList];
        });
      });
    },
    getCourseList(page = 1) {
      this.page = page;
      course.getCoursePageList(this.page, this.size, this.courseQuery)
        .then((response) => {
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {
      this.courseQuery = {};
      this.getCourseList();
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          course
            .deleteCourseById(id)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getCourseList();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>