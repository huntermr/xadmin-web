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
        <a-form-item><a-input type="hidden" v-decorator="['paramId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="参数名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['paramName', {rules: [{required: true, message: '请输入参数名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="参数键"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input :disabled="isEdit" v-decorator="['paramKey', {rules: [{required: true, message: '请输入参数键'}]}]" />
        </a-form-item>

        <a-form-item
          label="参数值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['paramValue', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="参数描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea :rows="4" v-decorator="['paramDesc', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="参数类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="!isEdit">
          <a-switch checkedChildren="系统" unCheckedChildren="普通" defaultChecked="false" :checked="checked" @change="onChange" />
          <a-alert message="系统参数不可删除" type="info" showIcon />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getParamInfo } from '@/api/param'

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
      checked: false,
      isEdit: false,
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.title = '新建参数'
      this.isEdit = false
      this.visible = true
    },
    edit (record) {
      this.title = '编辑参数信息'
      this.isEdit = true
      this.visible = true

      getParamInfo(record.paramId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })
        this.checked = data.systemFlag
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (values.paramId) {
              this.$emit('edit', values)
            } else {
              values.systemFlag = this.checked
              this.$emit('add', values)
            }
            this.reset()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    reset () {
      this.form.resetFields()
      this.checked = false
    },
    handleCancel () {
      this.visible = false
      this.reset()
    },
    onChange (checked) {
      this.checked = checked
    }
  }
}
</script>
