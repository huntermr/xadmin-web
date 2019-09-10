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
        <a-form-item><a-input type="hidden" v-decorator="['roleId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="角色名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['roleName', {rules: [{required: true, message: '请输入角色名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="权限标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['roleKey', {rules: [{required: true, message: '请输入权限标识'}]}]" />
        </a-form-item>

        <a-form-item
          label="角色描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea rows="4" v-decorator="['roleDesc', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getRoleInfo } from '@/api/role'

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
      this.title = '新建角色'
      this.visible = true
    },
    edit (record) {
      this.title = '编辑角色信息'
      this.visible = true

      getRoleInfo(record.roleId).then(res => {
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
            if (values.roleId) {
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
