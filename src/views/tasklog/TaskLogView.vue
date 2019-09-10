<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="任务名称">
                <a-input v-model="queryParam.taskName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="任务组名">
                <a-input v-model="queryParam.taskGroup" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="起止时间">
                <a-range-picker
                  :showTime="{ format: 'HH:mm:ss' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onChange"
                />
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

    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <s-table
        ref="table"
        bordered
        size="default"
        rowKey="taskLogId"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <a-popover slot="exceptionInfo" slot-scope="text" placement="topLeft" arrowPointAtCenter v-if="text" >
          <template slot="content">
            <p style="word-wrap:break-word; width: 200px">{{ text }}</p>
          </template>
          <a>查看</a>
        </a-popover>
        <a-popover slot="jobMessage" slot-scope="text" placement="topLeft" arrowPointAtCenter v-if="text" >
          <template slot="content">
            <p style="word-wrap:break-word; width: 200px">{{ text }}</p>
          </template>
          <a>查看</a>
        </a-popover>
        <span slot="taskStatus" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
      </s-table>
      <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import { getTaskLogList, addTaskLog, editTaskLog, delTaskLog } from '@/api/tasklog'

const statusMap = {
  0: {
    status: 'success',
    text: '正常'
  },
  1: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TaskLogView',
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
          title: '任务名称',
          dataIndex: 'taskName'
        },
        {
          title: '任务组名',
          dataIndex: 'taskGroup'
        },
        {
          title: '状态',
          dataIndex: 'taskStatus',
          scopedSlots: { customRender: 'taskStatus' },
          width: 80
        },
        {
          title: '生成时间',
          dataIndex: 'ct'
        },
        {
          title: '任务描述',
          dataIndex: 'taskDesc'
        },
        {
          title: '异常信息',
          dataIndex: 'exceptionInfo',
          scopedSlots: { customRender: 'exceptionInfo' }
        },
        {
          title: '日志信息',
          dataIndex: 'jobMessage',
          scopedSlots: { customRender: 'jobMessage' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getTaskLogList(Object.assign(parameter, this.queryParam))
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
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editTaskLog({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.$refs.table.refresh()
      })
    },
    handleDel (record) {
      delTaskLog(record.taskLogId).then(res => {
        this.$message.info('删除成功')
        this.$refs.table.refresh()
      })
    },
    handleAddOk (values) {
      addTaskLog(values).then(res => {
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
    },
    onChange (dates, dateStrings) {
      this.queryParam.startTime = dateStrings[0]
      this.queryParam.endTime = dateStrings[1]
    }
  }
}
</script>
