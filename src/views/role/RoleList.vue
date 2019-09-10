<template>
  <a-card :bordered="false" :style="{ height: '100%' }">
    <a-row :gutter="24">
      <a-col :md="4">
        <a-list itemLayout="vertical" :dataSource="roles">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-list-item-meta :style="{ marginBottom: '0' }">
              <span slot="description" style="text-align: center; display: block">{{ item.roleDesc }}</span>
              <a slot="title" style="text-align: center; display: block" @click="edit(item)">{{ item.roleName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :md="20">
        <div style="max-width: 800px">
          <a-divider v-if="isMobile()" />
          <div v-if="mdl.id">
            <h3>角色：{{ mdl.roleName }}</h3>
          </div>
          <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
            <a-form-item label="唯一键">
              <a-input v-decorator="[ 'roleId', {rules: [{ required: true, message: 'Please input unique key!' }]} ]" placeholder="请填写唯一键" />
            </a-form-item>

            <a-form-item label="角色名称">
              <a-input v-decorator="[ 'roleName', {rules: [{ required: true, message: 'Please input role name!' }]} ]" placeholder="请填写角色名称" />
            </a-form-item>

            <!--            <a-form-item label="状态">-->
            <!--              <a-select v-decorator="[ 'status', {rules: []} ]">-->
            <!--                <a-select-option :value="1">正常</a-select-option>-->
            <!--                <a-select-option :value="2">禁用</a-select-option>-->
            <!--              </a-select>-->
            <!--            </a-form-item>-->

            <a-form-item label="分配权限">
              <a-tree
                checkable
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                :treeData="treeData"
                @check="onCheck"
              />
            </a-form-item>

          </a-form>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { getRoleList } from '@/api/role'
import { getResourceList, getRoleResources, getUserResources } from '@/api/cresource'
import Vue from 'vue'
import { USER_ID } from '@/store/mutation-types'
import { mixinDevice } from '@/utils/mixin'
import pick from 'lodash.pick'
import { convertTreeData, convertCheckKeys } from '@/utils/permissions'

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      mdl: {},

      roles: [],
      resources: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeData: []
    }
  },
  created () {
    getRoleList().then((res) => {
      console.log('res', res)
      this.roles = res.data.records
      this.roles.push({
        roleId: '',
        roleName: '新增角色',
        roleDesc: ''
      })
      console.log('this.roles', this.roles)
    })
    this.loadPermissions()
  },
  watch: {
    checkedKeys (val) {
      console.log('checkedKeys', val)
    }
  },
  methods: {
    onCheck (checkedKeys, res) {
      console.log('onCheck', checkedKeys, 'res', res)
      console.log('a11', res.halfCheckedKeys)
      this.checkedKeys = checkedKeys
    },
    callback (val) {
      console.log(val)
    },

    add () {
      this.edit({ id: 0 })
    },

    edit (record) {
      this.mdl = Object.assign({}, record)
      // 有权限表，处理勾选
      // if (this.mdl.permissions && this.permissions) {
      //   // 先处理要勾选的权限结构
      //   const permissionsAction = {}
      //   this.mdl.permissions.forEach(permission => {
      //     permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
      //   })
      //
      //   console.log('permissionsAction', permissionsAction)
      //   // 把权限表遍历一遍，设定要勾选的权限 action
      //   this.permissions.forEach(permission => {
      //     const selected = permissionsAction[permission.id]
      //     permission.selected = selected || []
      //     this.onChangeCheck(permission)
      //   })
      //
      //   console.log('this.permissions', this.permissions)
      // }

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'roleId', 'roleName', 'roleDesc'))
      })
      console.log('this.mdl', this.mdl)

      // 清空已选数组
      this.checkedKeys.splice(0, this.checkedKeys.length)
      this.getResourcesByRole(record.roleId)
    },

    onChangeCheck (resource) {
      resource.indeterminate = !!resource.selected.length && (resource.selected.length < resource.actionsOptions.length)
      resource.checkedAll = resource.selected.length === resource.actionsOptions.length
    },
    onChangeCheckAll (e, resource) {
      console.log('resource:', resource)

      Object.assign(resource, {
        selected: true,
        indeterminate: false,
        checkedAll: true
      })
    },
    loadPermissions () {
      // 获取所有资源列表
      getResourceList().then(res => {
        this.resources = res.data[0].childResources
        console.log('aa', this.resources)
        this.treeData = convertTreeData(this.resources)
        console.log(this.treeData)
      })
    },
    getUserResources () {
      const userId = Vue.ls.get(USER_ID)
      console.log('开始获取已选中资源')
      getUserResources(userId).then(res => {
        const checkedResource = res.data[0].childResources
        convertCheckKeys(this.checkedKeys, checkedResource)
        console.log('已选中资源', this.checkedKeys)
      })
    },
    getResourcesByRole (RoleId) {
      console.log('开始获取已选中资源')
      getRoleResources(RoleId).then(res => {
        const checkedResource = res.data[0].childResources
        convertCheckKeys(this.checkedKeys, checkedResource)
        console.log('已选中资源', this.checkedKeys)
      })
    }
  }
}
</script>

<style scoped>

</style>
