<template>
  <div>
    <a-card :bordered="false">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()" v-action:add>新建</a-button>
    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <a-table
        ref="table"
        size="default"
        rowKey="articleCategoryId"
        :columns="columns"
        :dataSource="treeCates"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-action:edit>编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除?" @confirm="handleDel(record)" okText="删除" cancelText="取消" v-action:del>
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
      <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import { getArticlecategoryTree, addArticleCategory, editArticleCategory, delArticleCategory } from '@/api/articlecategory'

export default {
  name: 'ArticleCategoryView',
  components: {
    STable,
    Ellipsis,
    CreateForm
    // StepByStepModal
  },
  data () {
    return {
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '分类标题',
          dataIndex: 'articleCategoryName'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      treeCates: [],
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      const parameter = {}
      getArticlecategoryTree(Object.assign(parameter, this.queryParam))
        .then(res => {
          this.treeCates = this.getTreeCates(res.data)
        })
    },
    getTreeCates (datas) {
      return datas.map(data => {
        const cates = {
          articleCategoryName: data.articleCategoryName,
          articleCategoryId: data.articleCategoryId
        }

        if (data.childCates && data.childCates.length > 0) {
          cates.children = this.getTreeCates(data.childCates)
        }

        return cates
      })
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editArticleCategory({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.loadData()
      })
    },
    handleDel (record) {
      delArticleCategory(record.articleCategoryId).then(res => {
        this.$message.info('删除成功')
        this.loadData()
      })
    },
    handleAddOk (values) {
      addArticleCategory(values).then(res => {
        this.$message.info('添加成功')
        this.loadData()
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {}
      this.loadData()
    }
  }
}
</script>
