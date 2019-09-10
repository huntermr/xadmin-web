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
        <a-form-item><a-input type="hidden" v-decorator="['taskLogId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="任务全限定类名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['jobClassName', {rules: [{required: true, message: '请输入任务全限定类名'}]}]" />
        </a-form-item>

        <a-form-item
          label="任务名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input :disabled="isEdit" v-decorator="['jobName', {rules: [{required: true, message: '请输入任务名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="任务组"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select :disabled="isEdit" v-decorator="['jobGroup', {initialValue: 'default', rules: [{required: true, message: '请选择任务组'}]}]">
            <a-select-option value="default">默认分组</a-select-option>
            <a-select-option value="system">系统分组</a-select-option>
            <a-select-option value="custom">自定义</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="补偿机制"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-radio-group v-model="misfire">
            <a-radio :value="-1">补偿所有(执行所有错过的任务)</a-radio>
            <a-radio :value="1">补偿一次(错过的任务仅执行一次)</a-radio>
            <a-radio :value="2">放弃(放弃错过的任务)</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="任务描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea :rows="4" v-decorator="['jobDescription', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="表达式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['cronExpression', {rules: [{required: true, message: '请输入表达式'}]}]" />
          <a href="http://www.bejson.com/othertools/cron/" target="_blank">cron表达式生成工具</a>
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
      isEdit: false,
      title: '新建定时任务',
      misfire: 2
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.isEdit = false
      this.visible = true
      this.title = '新建定时任务'
    },
    edit (record) {
      this.isEdit = true
      this.visible = true
      this.title = '编辑定时任务'
      this.misfire = record.misfire
      setTimeout(() => {
        this.form.setFieldsValue({ ...record })
      }, 500)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.misfire = this.misfire
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (this.isEdit) {
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
      this.misfire = 2
      this.form.resetFields()
    }
  }
}
</script>
