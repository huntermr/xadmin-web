<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['postId', {rules: [{required: false}]}]" /></a-form-item>

        <a-form-item
          label="岗位名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['postName', {rules: [{required: true, message: '请输入岗位名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="岗位编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['postCode', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="显示顺序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['postSort', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea :rows="4" v-decorator="['remark', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getPostInfo } from '@/api/post'

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
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.title = '新建岗位'
      this.visible = true
    },
    edit (record) {
      this.title = '编辑岗位信息'
      this.visible = true

      getPostInfo(record.postId).then(res => {
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
            if (values.postId) {
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
