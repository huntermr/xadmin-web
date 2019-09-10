<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="文章标题">
                <a-input v-model="queryParam.articleTitle" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="文章分类ID">
                <a-input v-model="queryParam.articleCategoryId" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-button type="primary" icon="plus" @click="$refs.createModal.add()" v-action:add>新建</a-button>
    </a-card>

    <a-row :gutter="10">
      <a-col :md="4">
        <a-card
          style="margin-top: 10px"
          :bordered="false">
          <a-tooltip style="font-size: 16px; font-weight: bold">
            <template slot="title">
              文章分类
            </template>
            文章分类
          </a-tooltip>
          <a-tree
            :defaultExpandAll="true"
            @select="onSelect"
            :multiple="false"
            :treeData="treeCateData"
            :selectedKeys="selectedKeys"
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :md="20">
        <a-card
          style="margin-top: 10px"
          :bordered="false">
          <s-table
            ref="table"
            size="default"
            rowKey="articleId"
            :columns="columns"
            :data="loadData"
            :alert="options.alert"
            :rowSelection="options.rowSelection"
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
          </s-table>
          <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import { getArticleList, addArticle, editArticle, delArticle } from '@/api/article'
import { getArticlecategoryTree } from '@/api/articlecategory'

export default {
  name: 'ArticleView',
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
          title: '文章标题',
          dataIndex: 'articleTitle'
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          width: '150px'
        },
        {
          title: '作者',
          dataIndex: 'authorName',
          width: '80px'
        },
        {
          title: '阅读量',
          width: '80px',
          dataIndex: 'readCount'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getArticleList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      treeCateData: [],
      selectedKeys: []
    }
  },
  created () {
    getArticlecategoryTree().then(res => {
      this.treeCateData = this.getTreeCates(res.data)
      this.treeCateData.unshift({
        key: 'all',
        title: '所有分类' })
    })
  },
  methods: {
    getTreeCates (datas) {
      return datas.map(data => {
        return {
          title: data.articleCategoryName,
          key: data.articleCategoryId,
          children: data.childCates ? this.getTreeCates(data.childCates) : []
        }
      })
    },
    onSelect (selectedKeys) {
      this.selectedKeys = selectedKeys
      if (selectedKeys.includes('all')) {
        this.queryParam.cateId = null
      } else {
        this.queryParam.cateId = selectedKeys[0]
      }
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editArticle({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.$refs.table.refresh()
      })
    },
    handleDel (record) {
      delArticle(record.articleId).then(res => {
        this.$message.info('删除成功')
        this.$refs.table.refresh()
      })
    },
    handleAddOk (values) {
      addArticle(values).then(res => {
        this.$message.info('添加成功')
        this.$refs.table.refresh(true)
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    }
  }
}
</script>
