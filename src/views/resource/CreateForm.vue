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
        <a-form-item><a-input type="hidden" v-decorator="['resourceId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="权限名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourceName', {rules: [{required: true, message: '请输入权限名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-decorator="['resourceType', {initialValue: 'G', rules: [{required: true}]}]">
            <a-select-option value="G">菜单组</a-select-option>
            <a-select-option value="M">菜单</a-select-option>
            <a-select-option value="O">按钮</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="父级权限"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            :treeData="treeResData"
            placeholder="请选择父级分类"
            :value="parentResourceId"
            @change="onResChange"></a-tree-select>
        </a-form-item>

        <a-form-item
          label="唯一标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourceKey', {rules: [{required: true, message: '请输入唯一标识'}]}]" />
        </a-form-item>

        <a-form-item
          label="跳转路径"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourceUri', {rules: [{required: true, message: '请输入跳转路径'}]}]" />
        </a-form-item>

        <a-form-item
          label="重定向"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourceRedirect', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="权限视图"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourceView', {rules: [{required: true, message: '请输入权限视图'}]}]" />
        </a-form-item>

        <a-form-item
          label="权限图标"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-button type="primary" shape="circle" :icon="icon" @click="showIconSelector" />
          <a-modal
            title="选择图标"
            :visible="iconVisible"
            @cancel="hideIconSelector"
            :footer="null"
          >
            <icon-selector @change="handleIconChange"></icon-selector>
          </a-modal>
        </a-form-item>

        <a-form-item
          label="权限标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['resourcePerms', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['sort', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getResourceInfo, getResourceList } from '@/api/resource'
import { convertTreeData } from '@/utils/permissions'
import IconSelector from '@/components/IconSelector'

export default {
  components: { AFormItem, IconSelector },
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
      parentResourceId: '',
      treeResData: [],
      iconVisible: false,
      icon: '',
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    loadData () {
      getResourceList().then(res => {
        const data = res.data[0].childResources
        this.treeResData = convertTreeData(data)
        this.treeResData.unshift({ title: '无', key: 'none', value: 'none' })
      })
    },
    add () {
      this.title = '新建资源'
      this.loadData()
      this.visible = true
    },
    edit (record) {
      this.title = '编辑资源信息'
      this.loadData()
      this.visible = true

      getResourceInfo(record.resourceId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })
        this.icon = data.resourceIcon
        if (data.parentResourceId !== 1) {
          this.parentResourceId = data.parentResourceId + ''
        }
      })
    },
    showIconSelector () {
      this.iconVisible = true
    },
    hideIconSelector () {
      this.iconVisible = false
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (this.parentResourceId !== 'none') {
            values.parentResourceId = this.parentResourceId
          }
          values.resourceIcon = this.icon
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (values.resourceId) {
              this.$emit('edit', values)
            } else {
              this.$emit('add', values)
            }
            this.reset()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.reset()
    },
    reset () {
      this.form.resetFields()
      this.icon = ''
      this.parentResourceId = ''
    },
    onResChange (resourceId) {
      this.parentResourceId = resourceId + ''
    },
    handleIconChange (icon) {
      this.iconVisible = false
      this.icon = icon
    }
  }
}
</script>
