<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="操作用户ID">
                <a-input v-model="queryParam.userId" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="操作用户名">
                <a-input v-model="queryParam.username" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="loadData()">查询</a-button>
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
        size="default"
        rowKey="logId"
        :columns="columns"
        :data="loadData"
      >
        <a-popover slot="url" slot-scope="text" placement="topLeft" arrowPointAtCenter v-if="text" >
          <template slot="content">
            {{ text }}
          </template>
          <a>查看</a>
        </a-popover>
        <span slot="type" slot-scope="text">
          {{ text | statusFilter }}
        </span>
        <a-popover slot="params" slot-scope="text" placement="topLeft" arrowPointAtCenter v-if="text" >
          <template slot="content">
            <p style="word-wrap:break-word; width: 200px">{{ text }}</p>
          </template>
          <a>查看</a>
        </a-popover>
      </s-table>
      <create-form ref="createModal" />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import { getOperationLogList } from '@/api/operationlog'

const statusMap = {
  0: {
    status: '新增'
  },
  1: {
    status: '编辑'
  },
  2: {
    status: '删除'
  },
  3: {
    status: '导出'
  },
  4: {
    status: '导入'
  },
  5: {
    status: '其他'
  }
}

export default {
  name: 'OperationLogView',
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
          title: '操作人',
          dataIndex: 'username'
        },
        {
          title: '操作类型',
          dataIndex: 'operationType',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '日志内容',
          dataIndex: 'operationContent'
        },
        {
          title: 'IP',
          dataIndex: 'operationIp'
        },
        {
          title: '设备类型',
          dataIndex: 'operationDevice'
        },
        {
          title: '操作时间',
          dataIndex: 'operationTime'
        },
        {
          title: '请求地址',
          dataIndex: 'operationUri',
          scopedSlots: { customRender: 'url' }
        },
        {
          title: '操作参数',
          dataIndex: 'operationParams',
          width: 100,
          scopedSlots: { customRender: 'params' }
        }
      ],
      loadData: parameter => {
        return getOperationLogList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    resetSearchForm () {
      this.queryParam = {}
    }
  }
}
</script>
