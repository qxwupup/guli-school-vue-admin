import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
          })
    },
    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get'
          })
    },
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
          })
    },
    getPublishCourseInfo(courseId) {
        return request({
            url: `/eduservice/course/getPublishCourseInfo/${courseId}`,
            method: 'get'
          })
    },
    publishCourseInfo(courseId) {
        return request({
            url: `/eduservice/course/publishCourse/${courseId}`,
            method: 'post'
          })
    },
    getCoursePageList(current, size, courseQuery){
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${size}`,
            method: 'post',
            data: courseQuery
        })
    }

}
