<template>
  <a-modal
    title="新建操作日志"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['logId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="操作用户ID"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['userId', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['username', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作内容"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationContent', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationTime', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作ip"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationIp', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作请求地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationUri', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作请求方式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationMethod', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationType', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作请求参数json"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationParams', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="操作设备"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationDevice', {rules: [{required: false}]}]" />
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
      confirmLoading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    detail (record) {
      this.visible = true

      setTimeout(() => {
        this.form.setFieldsValue({ ...record })
      }, 500)
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>
