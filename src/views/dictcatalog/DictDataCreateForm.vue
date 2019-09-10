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
        <a-form-item style="display:none"><a-input type="hidden" v-decorator="['dictDataId', {rules: [{required: false}]}]" /></a-form-item>

        <a-form-item
          label="数据名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['dataName', {rules: [{required: true, message: '请输入数据名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="数据值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['dataValue', {rules: [{required: true, message: '请输入数据值'}]}]" />
        </a-form-item>

        <a-form-item
          label="字典排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['dataSort', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="是否默认值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-decorator="['isDefault', {initialValue: '0', rules: [{required: false}]}]">
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getDictDataInfo } from '@/api/dictdata'

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
      dictType: '',
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add (dictType) {
      this.title = '新建字典数据'
      this.dictType = dictType
      this.visible = true
    },
    edit (record) {
      this.title = '编辑字典数据'
      this.visible = true

      getDictDataInfo(record.dictDataId).then(res => {
        const data = res.data
        data.isDefault = data.isDefault + ''
        this.form.setFieldsValue({ ...data })
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
            if (values.dictDataId) {
              this.$emit('edit', values)
            } else {
              values.dictType = this.dictType
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
