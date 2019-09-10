<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="参数名称">
                <a-input v-model="queryParam.paramName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="参数键">
                <a-input v-model="queryParam.paramKey" placeholder=""/>
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
        rowKey="paramId"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <a-tag color="blue" slot="key" slot-scope="text">{{ text }}</a-tag>
        <a-tag :color="formatTypeColor(text)" slot="type" slot-scope="text">{{ formatType(text) }}</a-tag>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-action:edit>编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确认删除?"
              v-if="!record.systemFlag"
              @confirm="handleDel(record)"
              okText="删除"
              cancelText="取消"
              v-action:del>
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
      <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import { getParamList, addParam, editParam, delParam } from '@/api/param'

export default {
  name: 'ParamView',
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
          title: '参数名称',
          dataIndex: 'paramName'
        },
        {
          title: '参数键',
          dataIndex: 'paramKey',
          scopedSlots: { customRender: 'key' }
        },
        {
          title: '参数值',
          dataIndex: 'paramValue'
        },
        {
          title: '参数描述',
          dataIndex: 'paramDesc'
        },
        {
          title: '参数类型',
          dataIndex: 'systemFlag',
          scopedSlots: { customRender: 'type' }
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
        return getParamList(Object.assign(parameter, this.queryParam))
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
  methods: {
    formatTypeColor (type) {
      if (type) {
        return '#f50'
      } else {
        return '#2db7f5'
      }
    },
    formatType (type) {
      if (type) {
        return '系统参数'
      } else {
        return '普通参数'
      }
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editParam({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.$refs.table.refresh()
      })
    },
    handleDel (record) {
      delParam(record.paramId).then(res => {
        this.$message.info('删除成功')
        this.$refs.table.refresh()
      })
    },
    handleAddOk (values) {
      addParam(values).then(res => {
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
