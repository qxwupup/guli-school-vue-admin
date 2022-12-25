import request from '@/utils/request'

export default {
    getSubjectList() {
        return request({
            //url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+size,
            url: `/eduservice/subject/getAllSubject`,
            method: 'get'
        })
    },

}
