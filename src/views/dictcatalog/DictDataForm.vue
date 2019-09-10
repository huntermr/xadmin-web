<template>
  <a-modal
    title="字典数据列表"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-card
      :bordered="false">
      <a-button type="primary" icon="plus" @click="$refs.dictDataCreateForm.add(dictType)" v-action:add>新建</a-button>
      <a-table
        ref="table"
        size="default"
        rowKey="dictDataId"
        :columns="columns"
        :dataSource="dictDatas"
      >
        <span slot="isDefault" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
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
      <dict-data-create-form ref="dictDataCreateForm" @add="handleAddOk" @edit="handleEditOk" />
    </a-card>
  </a-modal>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import DictDataCreateForm from './DictDataCreateForm'
import { getDictDataList, addDictData, editDictData, delDictData } from '@/api/dictdata'

const statusMap = {
  0: {
    status: 'default',
    text: '否'
  },
  1: {
    status: 'success',
    text: '是'
  }
}

export default {
  name: 'DictDataView',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    DictDataCreateForm
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
          title: '数据名称',
          dataIndex: 'dataName'
        },
        {
          title: '数据值',
          dataIndex: 'dataValue'
        },
        {
          title: '是否默认值',
          dataIndex: 'isDefault',
          scopedSlots: { customRender: 'isDefault' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dictDatas: [],
      visible: false,
      confirmLoading: false,
      dictType: ''
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
    config (dictType) {
      this.dictType = dictType
      this.visible = true
      this.loadData()
    },
    loadData () {
      getDictDataList({ dictType: this.dictType }).then(res => {
        const data = res.data.records
        this.dictDatas = data
      })
    },
    handleEdit (record) {
      this.$refs.dictDataCreateForm.edit(record)
    },
    handleEditOk (values) {
      editDictData({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.loadData()
      })
    },
    handleDel (record) {
      delDictData(record.dictDataId).then(res => {
        this.$message.info('删除成功')
        this.loadData()
      })
    },
    handleAddOk (values) {
      addDictData(values).then(res => {
        this.$message.info('添加成功')
        this.loadData()
      })
    },
    handleCancel () {
      this.visible = false
      this.reset()
    },
    reset () {
      this.dictType = ''
      this.dictDatas = []
    }
  }
}
</script>
