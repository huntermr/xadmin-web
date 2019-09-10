<template>
  <a-modal
    :title="title"
    width="90%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['articleId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="文章标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['articleTitle', {rules: [{required: true, message: '请输入文章标题'}]}]" />
        </a-form-item>

        <a-form-item
          label="文章分类"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            :treeData="treeCateData"
            treeDefaultExpandAll
            placeholder="请选择所属分类"
            :value="cateIds"
            @change="onCateChange"></a-tree-select>
        </a-form-item>

        <a-form-item
          label="文章类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-radio-group :defaultValue="1" v-model="type">
            <a-radio :value="1">文章</a-radio>
            <a-radio :value="2">图集</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="文章内容"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <vue-quill-editor :value="articleContent" ref="quillEditor" @change="onEditorChange" style="height: 400px;"></vue-quill-editor>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getArticleInfo } from '@/api/article'
import { getArticlecategoryTree } from '@/api/articlecategory'
import VueQuillEditor from '@/components/Editor/QuillEditor'

export default {
  components: { AFormItem, VueQuillEditor },
  data () {
    return {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 }
      },
      visible: false,
      confirmLoading: false,
      treeCateData: [],
      cateIds: [],
      type: 1,
      title: '',
      articleContent: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    getArticlecategoryTree().then(res => {
      this.treeCateData = this.getTreeCates(res.data)
    })
  },
  methods: {
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
      this.title = '发布新文章'
      this.visible = true
    },
    edit (record) {
      this.title = '编辑文章信息'
      this.visible = true

      getArticleInfo(record.articleId).then(res => {
        const data = res.data
        this.form.setFieldsValue({ ...data })
        this.type = data.type
        this.articleContent = data.articleContent
        this.cateIds = data.articleCategoryId + ''
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
            values.articleCategoryId = this.cateIds
            values.type = this.type
            values.articleContent = this.articleContent
            if (values.articleId) {
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
      this.type = 1
      this.cateIds = []
      this.articleContent = ''
    },
    onCateChange (values) {
      this.cateIds = values + ''
    },
    onEditorChange (html) {
      this.articleContent = html
    }
  }
}
</script>
