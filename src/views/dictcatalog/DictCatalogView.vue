<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="字典名称">
                <a-input v-model="queryParam.dictName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="字典类型">
                <a-input v-model="queryParam.dictType" placeholder=""/>
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

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="dictId"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <a-tag color="blue" slot="type" slot-scope="text">{{ text }}</a-tag>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleData(record)"><a-icon type="bars" />列表</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-action:edit>编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除?" @confirm="handleDel(record)" okText="删除" cancelText="取消" v-action:del>
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
      <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
      <dict-data-form ref="dictDataModal" />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import DictDataForm from './DictDataForm'
import { getDictCatalogList, addDictCatalog, editDictCatalog, delDictCatalog } from '@/api/dictcatalog'

const statusMap = {
  0: {
    status: 'success',
    text: '启用'
  },
  1: {
    status: 'default',
    text: '停用'
  }
}

export default {
  name: 'DictCatalogView',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    DictDataForm
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
          title: '字典名称',
          dataIndex: 'dictName'
        },
        {
          title: '字典类型',
          dataIndex: 'dictType',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '300px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getDictCatalogList(Object.assign(parameter, this.queryParam))
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
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    handleData (record) {
      this.$refs.dictDataModal.config(record.dictType)
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editDictCatalog({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.$refs.table.refresh()
      })
    },
    handleDel (record) {
      delDictCatalog(record.dictId).then(res => {
        this.$message.info('删除成功')
        this.$refs.table.refresh()
      })
    },
    handleAddOk (values) {
      addDictCatalog(values).then(res => {
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
