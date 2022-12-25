import request from '@/utils/request'
export default {
    
    getAllChapterInfo(courseId) {
        return request({
            url: `/eduservice/chapter/getChapterVideo/${courseId}`,
            method: 'get'
          })
    }
}