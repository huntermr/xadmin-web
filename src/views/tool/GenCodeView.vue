<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="表名称">
                <a-input v-model="queryParam.tableName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="表注释">
                <a-input v-model="queryParam.tableComment" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="loadData(queryParam)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <div style="margin-bottom: 16px">
        <a-button
          type="primary"
          @click="start"
          :disabled="!hasSelected"
          :loading="loading"
        >
          生成
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `选择了 ${selectedRowKeys.length} 项` }}
          </template>
        </span>
      </div>
      <a-table
        ref="table"
        size="default"
        rowKey="tableName"
        :pagination="page"
        :columns="columns"
        :dataSource="data"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a-popconfirm title="确认生成该表对应的代码?" @confirm="handleCreate(record)" okText="生成" cancelText="取消">
              <a>生成</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getTableList, genCode } from '@/api/tool'

export default {
  name: 'GenCodeView',
  components: {
    STable,
    Ellipsis
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
          title: '表名称',
          dataIndex: 'tableName'
        },
        {
          title: '表描述',
          dataIndex: 'tableComment'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,

      // custom table alert & rowSelection
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },

      page: {
        defaultPageSize: 20
      }
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start () {
      // 批量生成代码
      this.loading = true
      genCode(this.selectedRowKeys.join(',')).then(res => {
        this.loading = false
        this.selectedRowKeys = []
      })
      // // ajax request after empty completing
      // setTimeout(() => {
      //   this.loading = false
      //   this.selectedRowKeys = []
      // }, 1000)
    },
    // 加载数据方法 必须为 Promise 对象
    loadData (parameter) {
      getTableList(parameter).then(res => {
        console.log(res)
        this.data = res.data
      })
    },
    handleCreate (record) {
      console.log('re', record)
      genCode(record.tableName).then(res => {
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
    },
    resetSearchForm () {
      this.queryParam = {}
      this.loadData()
    }
  }
}
</script>
