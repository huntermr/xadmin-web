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
        <a-form-item><a-input type="hidden" v-decorator="['deptId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="部门名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['deptName', {rules: [{required: true, message: '请输入部门名称'}]}]" />
        </a-form-item>

        <a-form-item
          label="父级部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            :treeData="treeDeptData"
            placeholder="请选择父级分类"
            :value="parentId"
            @change="onDeptChange"></a-tree-select>
        </a-form-item>

        <a-form-item
          label="显示顺序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['orderNum', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="负责人"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['leader', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="联系电话"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['phone', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['email', {rules: [{required: false}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getDeptInfo, getDeptTreeList } from '@/api/dept'

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
      treeDeptData: [],
      parentId: '',
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    loadData () {
      getDeptTreeList().then(res => {
        const data = res.data
        this.treeDeptData = this.convertTreeData(data)
        this.treeDeptData.unshift({ title: '无', key: 'none', value: 'none' })
      })
    },
    convertTreeData (depts, selectable) {
      return depts.map(d => {
        return {
          title: d.deptName,
          key: d.deptId + '',
          value: d.deptId + '',
          children: d.childDepts ? this.convertTreeData(d.childDepts) : [],
          selectable: selectable
        }
      })
    },
    add () {
      this.title = '新建部门'
      this.loadData()
      this.visible = true
    },
    edit (record) {
      this.title = '编辑部门信息'
      this.loadData()
      this.visible = true

      getDeptInfo(record.deptId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })
        this.parentId = data.parentId
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (this.parentId !== 'none') {
            values.parentId = this.parentId
          }
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (values.deptId) {
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
    },
    onDeptChange (values) {
      this.parentId = values
    }
  }
}
</script>
