<template>
  <div :class="prefixCls">
    <a-upload
      name="file"
      listType="picture-card"
      class="image-uploader"
      :showUploadList="false"
      :action="uploadUrl"
      :beforeUpload="beforeUpload"
      @change="handleUpload"
    >
    </a-upload>
    <a-spin tip="上传中..." :spinning="spinning">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </a-spin>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { uploadUrl } from '@/utils/request'

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']
]

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data () {
    return {
      content: null,
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.image-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      uploadUrl: uploadUrl,
      spinning: false
    }
  },
  methods: {
    beforeUpload (file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp'
      if (!isImg) {
        this.$message.error('只能上传图片文件!')
        return false
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片必须小于3MB!')
        return false
      }
      this.spinning = true
      return true
    },
    handleUpload (callback) {
      const response = callback.file.response
      if (response) {
        this.spinning = false
        const quill = this.$refs.myQuillEditor.quill
        if (response.status === 10000) {
          this.imageUrl = response.data
          // 获取光标所在位置
          const length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', this.imageUrl)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$notification.error({
            message: '上传失败',
            description: response.message
          })
        }
      }
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.$emit('change', html)
    }
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');

/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
  .quill-editor {
    height: 300px;
  }
}
</style>
