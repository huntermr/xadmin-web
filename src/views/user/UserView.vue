<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="用户名">
                <a-input v-model="queryParam.userNameKeyword" placeholder=""/>
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

    <a-row :gutter="10">
      <a-col :md="4">
        <a-card
          style="margin-top: 10px"
          :bordered="false">
          <a-tooltip style="font-size: 16px; font-weight: bold">
            <template slot="title">
              部门列表
            </template>
            组织架构图
          </a-tooltip>
          <a-tree
            :defaultExpandAll="true"
            @select="onSelect"
            :multiple="false"
            :treeData="treeDeptData"
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
            rowKey="userId"
            :columns="columns"
            :data="loadData"
            :alert="options.alert"
            :rowSelection="options.rowSelection"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="handleResetPwd(record)">修改密码</a>
                <a-divider type="vertical" />
                <a-popconfirm v-if="record.userId !== 1" title="确认删除?" @confirm="handleDel(record)" okText="删除" cancelText="取消">
                  <a>删除</a>
                </a-popconfirm>
              </template>
            </span>
          </s-table>
          <create-form ref="createModal" @add="handleAddOk" @edit="handleEditOk" />
          <reset-pwd-form ref="resetPwd" @reset="handleResetOk" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './CreateForm'
import ResetPwdForm from './ResetPwdForm'
import { getUserList, addUser, editUser, delUser, resetPwd } from '@/api/user'
import { getDeptTreeList } from '@/api/dept'
import ACol from 'ant-design-vue/es/grid/Col'

export default {
  name: 'UserView',
  components: {
    ACol,
    STable,
    Ellipsis,
    CreateForm,
    ResetPwdForm
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
          title: '用户名',
          dataIndex: 'userName'
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '注册时间',
          dataIndex: 'joinTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '200px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      treeDeptData: [],
      selectedKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
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
  created () {
    getDeptTreeList().then(res => {
      this.treeDeptData = this.getTreeDepts(res.data)
      this.treeDeptData.unshift({
        key: 'all',
        title: '所有部门' })
    })
  },
  methods: {
    getTreeDepts (datas) {
      return datas.map(data => {
        return {
          title: data.deptName,
          key: data.deptId,
          children: data.childDepts ? this.getTreeDepts(data.childDepts) : []
        }
      })
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleResetPwd (record) {
      this.$refs.resetPwd.reset(record.userId)
    },
    handleResetOk (record) {
      resetPwd(record).then(res => {
        this.$message.success('密码修改成功')
      })
    },
    handleEditOk (values) {
      editUser(values.userId, { ...values }).then(res => {
        this.$refs.table.refresh()
      })
    },
    handleDel (record) {
      delUser(record.userId).then(res => {
        this.$refs.table.refresh()
      })
    },
    handleAddOk (values) {
      addUser(values).then(res => {
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
      this.selectedKeys = []
    },
    onSelect (selectedKeys) {
      this.selectedKeys = selectedKeys
      if (selectedKeys.includes('all')) {
        this.queryParam.deptId = null
      } else {
        this.queryParam.deptId = selectedKeys[0]
      }
      this.$refs.table.refresh(true)
    }
  }
}
</script>
