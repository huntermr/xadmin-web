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
        <a-form-item><a-input type="hidden" v-decorator="['articleCategoryId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="分类标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['articleCategoryName', {rules: [{required: true, message: '请输入分类标题'}]}]" />
        </a-form-item>

        <a-form-item
          label="父级分类"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            :treeData="treeCateData"
            treeDefaultExpandAll
            placeholder="请选择父级分类"
            :value="cateIds"
            @change="onCateChange"></a-tree-select>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getArticlecategoryTree, getArticleCategoryInfo } from '@/api/articlecategory'

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
      cateIds: [],
      treeCateData: [],
      title: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    loadData () {
      getArticlecategoryTree().then(res => {
        this.treeCateData = this.getTreeCates(res.data)
        this.treeCateData.unshift({ title: '无', key: 'none', value: 'none' })
      })
    },
    getTreeCates (datas) {
      return datas.map(data => {
        return {
          title: data.articleCategoryName,
          key: data.articleCategoryId,
          value: '' + data.articleCategoryId,
          children: data.childCates ? this.getTreeCates(data.childCates) : []
        }
      })
    },
    add () {
      this.title = '新建文章分类'
      this.loadData()
      this.visible = true
    },
    edit (record) {
      this.title = '编辑文章分类'
      this.loadData()
      this.visible = true

      getArticleCategoryInfo(record.articleCategoryId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })

        this.cateIds = data.parentCategoryId
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
            if (this.cateIds !== 'none') {
              values.parentCategoryId = this.cateIds
            }
            if (values.articleCategoryId) {
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
      this.cateIds = []
    },
    onCateChange (values) {
      this.cateIds = values
    }
  }
}
</script>
