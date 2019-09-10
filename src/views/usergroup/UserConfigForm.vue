<template>
  <a-modal
    title="配置组内用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="组内用户" >
          <a-select
            mode="multiple"
            :value="userIds"
            @change="onUserChange">
            <a-select-option
              v-for="user in users"
              :key="user.userId">{{ user.userName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getUserAll, getUserByGroupId } from '@/api/user'

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
      users: [],
      userIds: [],
      groupId: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    getUserAll().then(res => {
      this.users = res.data
    })
  },
  methods: {
    config (record) {
      this.visible = true
      this.groupId = record.groupId

      getUserByGroupId(this.groupId).then(res => {
        const data = res.data
        this.userIds = data.map(user => {
          return user.userId
        })
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        const values = {}
        if (this.userIds.length > 0) {
          values.userIds = this.userIds.join()
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
      this.userIds = []
    },
    onUserChange (values) {
      this.userIds = values
    }
  }
}
</script>
