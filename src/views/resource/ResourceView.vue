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
        rowKey="resourceId"
        :columns="columns"
        :dataSource="treeResources"
      >
        <a-tag :color="formatTypeColor(text)" slot="type" slot-scope="text">{{ formatType(text) }}</a-tag>
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
import { getResourceList, addResource, editResource, delResource } from '@/api/resource'

export default {
  name: 'ResourceView',
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
          title: '权限名称',
          width: '300px',
          dataIndex: 'resourceName'
        },
        {
          title: '类型',
          dataIndex: 'resourceType',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '唯一标识',
          dataIndex: 'resourceKey'
        },
        {
          title: '路径',
          dataIndex: 'resourceUri'
        },
        {
          title: '重定向',
          dataIndex: 'resourceRedirect'
        },
        {
          title: '权限标识',
          dataIndex: 'resourcePerms'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      treeResources: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      const parameter = {}
      getResourceList(Object.assign(parameter, this.queryParam)).then(res => {
        const data = res.data[0].childResources
        this.treeResources = this.getTreeRes(data)
        console.log('treeResources', this.treeResources)
      })
    },
    getTreeRes (datas) {
      return datas.map(data => {
        if (data.childResources && data.childResources.length > 0) {
          data.children = this.getTreeRes(data.childResources)
        }

        return data
      })
    },
    formatType (type) {
      if (type === 'G') {
        return '菜单组'
      } else if (type === 'M') {
        return '菜单'
      } else if (type === 'O') {
        return '按钮'
      }
    },
    formatTypeColor (type) {
      if (type === 'G') {
        return '#001529'
      } else if (type === 'M') {
        return '#2db7f5'
      } else if (type === 'O') {
        return 'blue'
      }
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleEditOk (values) {
      editResource(values.resourceId, { ...values }).then(res => {
        this.$message.info('修改成功')
        this.loadData()
      })
    },
    handleDel (record) {
      delResource(record.resourceId).then(res => {
        this.$message.info('删除成功')
        this.loadData()
      })
    },
    handleAddOk (values) {
      addResource(values).then(res => {
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
