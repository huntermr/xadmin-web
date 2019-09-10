<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['adsId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['title', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['sort', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="链接地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['link', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="图片地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">

          <a-upload
            name="file"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadUrl"
            :beforeUpload="beforeUpload"
            @change="handleUpload"
          >
            <img width="80" v-if="imageUrl" :src="imageUrl" alt="image" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item
          label="广告类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-decorator="['type', {rules: [{required: false}]}]" >
            <a-select-option value="1">首页轮播</a-select-option>
            <a-select-option value="2">开机动画</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getAdsInfo } from '@/api/ads'
import { uploadUrl } from '@/utils/request'

export default {
  components: { AFormItem },
  data () {
    return {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      imageUrl: '',
      uploadUrl: uploadUrl,
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
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
    },
    add () {
      this.title = '新建广告轮播'
      this.visible = true
    },
    edit (record) {
      this.title = '编辑广告轮播'
      this.visible = true

      getAdsInfo(record.adsId).then(res => {
        const data = res.data
        data.type = data.type + ''
        this.imageUrl = data.imageUrl
        this.form.setFieldsValue({ ...data })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.imageUrl = this.imageUrl
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (values.adsId) {
              this.$emit('edit', values)
            } else {
              this.$emit('add', values)
            }
            this.reset()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.reset()
    },
    reset () {
      this.form.resetFields()
      this.imageUrl = ''
    },
    handleUpload (callback) {
      const response = callback.file.response
      if (response) {
        if (response.status === 10000) {
          this.imageUrl = response.data
        } else {
          this.$notification.error({
            message: '上传失败',
            description: response.message
          })
        }
      }
    }
  }
}
</script>
