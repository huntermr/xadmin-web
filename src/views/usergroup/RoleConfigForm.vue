<template>
  <a-modal
    title="配置关联角色"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="关联角色" >
          <a-select
            mode="multiple"
            :value="roleIds"
            @change="onRoleChange">
            <a-select-option
              v-for="role in roles"
              :key="role.roleId">{{ role.roleName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getRoleAll, getGroupRoles } from '@/api/role'

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
      roles: [],
      roleIds: [],
      groupId: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    getRoleAll().then(res => {
      this.roles = res.data
    })
  },
  methods: {
    config (record) {
      this.visible = true
      this.groupId = record.groupId

      getGroupRoles(this.groupId).then(res => {
        const data = res.data
        this.roleIds = data.map(role => {
          return role.roleId
        })
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        const values = {}
        if (this.roleIds.length > 0) {
          values.roleIds = this.roleIds.join()
        }
        values.groupId = this.groupId
        if (this.groupId) {
          this.$emit('config', values)
        }
        this.clearFrom()
      }, 500)
    },
    handleCancel () {
      this.visible = false
      this.clearFrom()
    },
    clearFrom () {
      this.form.resetFields()
      this.roleIds = []
    },
    onRoleChange (values) {
      this.roleIds = values
    }
  }
}
</script>
