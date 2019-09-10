<template>
  <a-modal
    title="权限配置"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-tree
        checkable
        :autoExpandParent="true"
        :checkedKeys="checkedKeys"
        :treeData="treeData"
        @check="onCheck"
      >
      </a-tree>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getResourceList, getRoleResources } from '@/api/cresource'
import { convertTreeData, convertCheckKeys } from '@/utils/permissions'

export default {
  components: { AFormItem },
  data () {
    return {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      checkedKeys: [],
      halfCheckedKeys: [],
      treeData: [],
      roleId: '',
      isEdited: false
    }
  },
  created () {
    this.loadAllPermissions()
  },
  methods: {
    config (record) {
      this.visible = true
      this.roleId = record.roleId

      this.loadPermissionsByRole(this.roleId)
    },
    onCheck (checkedKeys, res) {
      this.isEdited = true
      this.halfCheckedKeys = res.halfCheckedKeys
      this.checkedKeys = checkedKeys
    },
    loadAllPermissions () {
      // 获取所有资源列表
      getResourceList().then(res => {
        const resources = res.data[0].childResources
        this.treeData = convertTreeData(resources, false)
      })
    },
    loadPermissionsByRole (roleId) {
      getRoleResources(roleId).then(res => {
        const checkedResource = res.data
        if (checkedResource) {
          convertCheckKeys(this.checkedKeys, checkedResource)
        }
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        console.log('isEdited', this.isEdited)
        if (this.isEdited) {
          const values = { resourceIds: [...this.checkedKeys, ...this.halfCheckedKeys].join() }
          this.$emit('config', this.roleId, values)
        }
        this.resetFrom()
      }, 500)
    },
    handleCancel () {
      this.visible = false
      this.resetFrom()
    },
    resetFrom () {
      this.isEdited = false
      this.checkedKeys = []
    }
  }
}
</script>
