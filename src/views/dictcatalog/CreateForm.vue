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
        <a-form-item><a-input type="hidden" v-decorator="['dictId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="字典名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictName', {rules: [{required: true, message: '请输入字典名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="字典类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input :disabled="isEdit" v-decorator="['dictType', {rules: [{required: true, message: '请输入字典类型'}]}]" />
          <a-alert v-if="!isEdit" message="请仔细确认,一旦添加不可修改" type="info" showIcon />
        </a-form-item>

        <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-decorator="['status', {initialValue: '0', rules: [{required: false}]}]">
            <a-select-option value="0">启用</a-select-option>
            <a-select-option value="1">停用</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getDictCatalogInfo } from '@/api/dictcatalog'

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
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.title = '新建字典类型'
      this.isEdit = false
      this.visible = true
    },
    edit (record) {
      this.title = '编辑字典类型'
      this.isEdit = true
      this.visible = true

      getDictCatalogInfo(record.dictId).then(res => {
        const data = res.data
        data.status = data.status + ''
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
            if (values.dictId) {
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
