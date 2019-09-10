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
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <a-table
        ref="table"
        size="default"
        rowKey="jobId"
        :columns="columns"
        :dataSource="taskData"
      >
        <span slot="group" slot-scope="text">
          {{ text | groupFilter }}
        </span>
        <span slot="misfire" slot-scope="text">
          {{ text | misfireFilter }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handlePause(record)" v-if="record.jobStatus === 'NORMAL'">暂停</a>
            <a @click="handleResume(record)" v-if="record.jobStatus === 'PAUSED'">恢复</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除?" @confirm="handleDel(record)" okText="删除" cancelText="取消">
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
import { getTaskList, addTask, editTask, delTask, pauseTask, resumeTask } from '@/api/task'

const statusMap = {
  'NONE': {
    status: 'default',
    text: '不存在'
  },
  'NORMAL': {
    status: 'success',
    text: '正常'
  },
  'PAUSED': {
    status: 'warning',
    text: '暂停'
  },
  'COMPLETE': {
    status: 'success',
    text: '完成'
  },
  'ERROR': {
    status: 'error',
    text: '异常'
  },
  'BLOCKED': {
    status: 'processing',
    text: '阻塞'
  }
}

const misfireMap = {
  '-1': {
    text: '补偿所有'
  },
  '1': {
    text: '补偿一次'
  },
  '2': {
    text: '放弃'
  }
}

const groupMap = {
  'default': {
    text: '默认分组'
  },
  'system': {
    text: '系统分组'
  },
  'custom': {
    text: '自定义'
  }
}

export default {
  name: 'TaskView',
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
          title: '任务类名',
          dataIndex: 'jobClassName'
        },
        {
          title: '任务名称',
          dataIndex: 'jobName'
        },
        {
          title: '任务组',
          dataIndex: 'jobGroup',
          scopedSlots: { customRender: 'group' }
        },
        {
          title: '任务状态',
          dataIndex: 'jobStatus',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '补偿机制',
          dataIndex: 'misfire',
          scopedSlots: { customRender: 'misfire' }
        },
        {
          title: '表达式',
          dataIndex: 'cronExpression'
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
      taskData: [],
      optionName: '暂停'
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    misfireFilter (misfire) {
      return misfireMap[misfire].text
    },
    groupFilter (group) {
      return groupMap[group].text
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      const parameter = {}
      getTaskList(Object.assign(parameter, this.queryParam)).then(res => {
        const data = res.data
        data.map(task => {
          task.jobId = task.jobName + task.jobGroup
        })
        this.taskData = data
      })
    },
    handlePause (record) {
      pauseTask(record.jobGroup, record.jobName).then(res => {
        this.$message.info('暂停成功')
        this.loadData()
      })
    },
    handleResume (record) {
      resumeTask(record.jobGroup, record.jobName).then(res => {
        this.$message.info('恢复成功')
        this.loadData()
      })
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editTask({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.loadData()
      })
    },
    handleDel (record) {
      delTask(record.jobGroup, record.jobName).then(res => {
        this.$message.info('删除成功')
        this.loadData()
      })
    },
    handleAddOk (values) {
      addTask(values).then(res => {
        this.$message.info('添加成功')
        this.loadData()
      })
    },
    resetSearchForm () {
      this.queryParam = {}
    }
  }
}
</script>
