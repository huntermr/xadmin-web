<template>
  <a-modal
    title="新建登录日志"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['logId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="登录用户ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['loginUserId', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="登录用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['loginUserName', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="登录ip"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['loginIp', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="登录时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['loginTime', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="登录使用设备"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['device', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getLoginLogInfo } from '@/api/loginlog'

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

      getLoginLogInfo(record.logId).then(res => {
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
            if (values.logId) {
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
