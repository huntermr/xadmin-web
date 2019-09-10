<template>
  <a-modal
    title="新建定时任务日志"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['taskLogId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="任务名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskName', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="任务组名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskGroup', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="任务描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskDesc', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="日志信息"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['jobMessage', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="执行状态  0 正常  1  异常"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['taskStatus', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="异常信息"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['exceptionInfo', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getTaskLogInfo } from '@/api/tasklog'

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

      getTaskLogInfo(record.taskLogId).then(res => {
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
            if (values.taskLogId) {
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
