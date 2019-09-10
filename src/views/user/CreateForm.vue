<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item><a-input type="hidden" v-decorator="['userId', {rules: [{required: false}]}]" /></a-form-item>
        <a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input :disabled="!isAddUser" v-decorator="['userName', {rules: [{required: true}]}]" />
        </a-form-item>

        <a-form-item
          label="密码"
          v-if="isAddUser"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input type="password" v-decorator="['password', {rules: [{required: true}]}]" />
        </a-form-item>

        <a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['mobile', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['email', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="所在城市"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-decorator="['city', {rules: [{required: false}]}]" />
        </a-form-item>

        <a-form-item
          label="所属角色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="!isAdmin"
        >
          <a-select
            mode="multiple"
            :value="roleIds"
            @change="onRoleChange">
            <a-select-option
              v-for="role in roles"
              :key="role.roleId">{{ role.roleName }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="所属部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            mode="multiple"
            :treeData="treeDeptData"
            multiple
            treeDefaultExpandAll
            placeholder="请选择所属部门"
            allowClear
            :value="deptIds"
            @change="onDeptChange"></a-tree-select>
        </a-form-item>

        <a-form-item
          label="所属岗位"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol" >
          <a-select
            mode="multiple"
            :value="postIds"
            @change="onPostChange">
            <a-select-option
              v-for="post in posts"
              :key="post.postId">{{ post.postName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getRoleAll } from '@/api/role'
import { getDeptTreeList } from '@/api/dept'
import { getPostAll } from '@/api/post'
import { getUserInfo } from '@/api/user'

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
      title: '添加用户',
      isAddUser: false,
      visible: false,
      confirmLoading: false,
      roles: [],
      roleIds: [],
      posts: [],
      postIds: [],
      deptIds: [],
      treeDeptData: [],
      isAdmin: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    getRoleAll().then(res => {
      this.roles = res.data
    })
    getDeptTreeList().then(res => {
      this.treeDeptData = this.getTreeDepts(res.data)
    })
    getPostAll().then(res => {
      this.posts = res.data
    })
  },
  methods: {
    getTreeDepts (datas) {
      return datas.map(data => {
        return {
          title: data.deptName,
          key: data.deptId,
          value: data.deptId,
          children: data.childDepts ? this.getTreeDepts(data.childDepts) : []
        }
      })
    },
    clearFrom () {
      this.form.resetFields()
      this.roleIds = []
      this.deptIds = []
      this.postIds = []
    },
    add () {
      this.visible = true
      this.title = '添加用户'
      this.isAddUser = true
    },
    edit (record) {
      this.visible = true
      this.title = '编辑用户信息'
      this.isAddUser = false

      getUserInfo(record.userId).then(res => {
        const data = res.data
        this.isAdmin = data.userId === 1
        this.form.setFieldsValue({ ...data })

        this.roleIds = data.userRoles.map(role => {
          return role.roleId
        })

        this.deptIds = data.userDepts.map(dept => {
          return dept.deptId
        })

        this.postIds = data.userPosts.map(post => {
          return post.postId
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            if (this.roleIds.length > 0) {
              values.userRoles = this.roleIds.join()
            }
            if (this.deptIds.length > 0) {
              values.userDepts = this.deptIds.join()
            }
            if (this.postIds.length > 0) {
              values.userPosts = this.postIds.join()
            }
            if (values.userId) {
              this.$emit('edit', values)
            } else {
              this.$emit('add', values)
            }
            this.clearFrom()
          }, 500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.clearFrom()
    },
    onRoleChange (values) {
      this.roleIds = values
    },
    onDeptChange (values) {
      this.deptIds = values
    },
    onPostChange (values) {
      this.postIds = values
    }
  }
}
</script>
