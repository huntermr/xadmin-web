<template>
  <a-modal
    title="修改密码"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback>
          <a-input type="password" v-decorator="['password', {rules: [{required: true, min: 6, max: 12, message: '请输入6-12位字符串'}]}]" />
        </a-form-item>

        <a-form-item
          label="再次输入新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          hasFeedback>
          <a-input type="password" v-decorator="['confirmPwd', {rules: [{required: true, validator: checkPwd}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'

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
      userId: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
  },
  methods: {
    checkPwd (rule, value, callback) {
      const form = this.form
      const password = form.getFieldValue('password')
      if (value && password && value !== password) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('两次输入的密码不一致')
      }

      callback()
    },
    clearFrom () {
      this.form.resetFields()
    },
    reset (userId) {
      this.visible = true
      this.userId = userId
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('reset', { userId: this.userId, password: values.password })
            this.clearFrom()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.clearFrom()
    }
  }
}
</script>
