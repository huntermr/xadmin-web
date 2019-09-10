<template>
  <a-modal
    title="发布系统公告"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['noticeId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="公告标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['noticeTitle', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="公告内容"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea :rows="4" v-decorator="['noticeContent', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['sort', {rules: [{required: false}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getSystemNoticeInfo } from '@/api/systemnotice'

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
      confirmLoading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      this.visible = true

      getSystemNoticeInfo(record.noticeId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (values.noticeId) {
              this.$emit('edit', values)
            } else {
              this.$emit('add', values)
            }
            this.form.resetFields()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>
