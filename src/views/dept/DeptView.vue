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
        rowKey="deptId"
        :columns="columns"
        :dataSource="treeDepts"
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
import { getDeptTreeList, addDept, editDept, delDept } from '@/api/dept'

export default {
  name: 'DeptView',
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
          title: '部门名称',
          dataIndex: 'deptName'
        },
        {
          title: '负责人',
          dataIndex: 'leader'
        },
        {
          title: '联系电话',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      treeDepts: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      const parameter = {}
      getDeptTreeList(Object.assign(parameter, this.queryParam)).then(res => {
        const data = res.data
        this.treeDepts = this.getTreeDept(data)
      })
    },
    getTreeDept (datas) {
      return datas.map(data => {
        if (data.childDepts && data.childDepts.length > 0) {
          data.children = this.getTreeDept(data.childDepts)
        }

        return data
      })
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editDept({ ...values }).then(res => {
        this.$message.info('修改成功')
        this.loadData()
      })
    },
    handleDel (record) {
      delDept(record.deptId).then(res => {
        this.$message.info('删除成功')
        this.loadData()
      })
    },
    handleAddOk (values) {
      addDept(values).then(res => {
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
      this.$refs.table.refresh(true)
    }
  }
}
</script>
