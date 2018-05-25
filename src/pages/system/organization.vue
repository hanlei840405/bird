<template>
  <q-page class="q-pa-md row">
    <div class="col-lg-3">
      <q-tree
        :nodes="organizationTree"
        node-key="id"
        @lazy-load="onLazyLoad"
      />
    </div>
    <div class="col-lg-9">

      <q-table
        ref="table"
        title="组织机构"
        :data="organizationTable.serverData"
        :columns="organizationTable.columns"
        :filter="organizationTable.filter"
        :selection="organizationTable.selection"
        :selected.sync="organizationTable.selected"
        row-key="name"
        :pagination.sync="organizationTable.serverPagination"
        :loading="organizationTable.loading"
        @request="request"
      >
        <template slot="top-right" slot-scope="props">
          <q-search hide-underline v-model="organizationTable.filter" />
          <q-btn color="negative" flat round delete icon="delete" />
          <q-btn color="primary" flat round delete icon="add" @click="add()" />
        </template>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <q-btn icon="edit" size="sm" @click="edit(props.row)" flat push/>
          <q-btn icon="delete" size="sm" @click="edit(props.row)" flat push/>
        </q-td>
      </q-table>
    </div>
    <organization-edit ref="editor"></organization-edit>
  </q-page>
</template>

<script>
import organizationEdit from './organization_edit.vue'

export default {
  data: () => ({
    organizationTree: [
      {
        id: 1,
        label: '组织机构',
        lazy: true,
        'handler': function (item) {
          debugger
          console.log(item)
        }
      }
    ],
    organizationTable: {
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10 // 指定这个属性就确定了分页是服务器端的
      },
      selection: 'multiple',
      selected: [],
      serverData: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: '名称',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'code', label: '编号', field: 'code', sortable: true },
        { name: 'path', label: '路径', field: 'path', sortable: true },
        { name: 'leaf', label: '是否有下级部门', field: 'leaf', format: val => val ? '否' : '是' },
        { name: 'status', label: '状态', field: 'status', format: val => val ? '正常' : '停用' },
        { name: 'action', label: '操作' }
      ]
    }
  }),
  components: {
    organizationEdit
  },
  methods: {
    onLazyLoad ({ node, key, done, fail }) {
      // 如果发生任何错误，调用fail（）
      debugger
      let id = node.id
      this.$axios.get('api-system/organization/tree/' + id).then(res => {
        let organizations = res.data
        let array = []
        organizations.forEach(item => {
          array.push({
            'id': item.id,
            'label': item.name,
            'handler': function (item) {
              debugger
              console.log(item)
            }
          })
        })
        done(array)
      })
    },
    add () {
      this.$refs.editor.open()
    },
    edit (row) {
      console.log(row)
    },
    request ({ pagination, filter, parentId }) {
      this.$axios.get('api-system/organization/page', {
        params: {
          name: filter,
          pageNo: pagination.page,
          pageSize: pagination.rowsPerPage,
          parentId: parentId
        }
      }).then(res => {
        var data = res.data
        // 更新分页以反映在UI中
        this.organizationTable.serverPagination = pagination

        // 我们还设置（或更新）了rowsNumber
        this.organizationTable.serverPagination.rowsNumber = data.number + 1

        // 然后我们更新提取的行
        this.organizationTable.serverData = data.content

        // 最后我们告诉QTable退出“加载”状态
        this.organizationTable.loading = false
      })
    }
  },
  mounted () {
    this.request({
      pagination: this.organizationTable.serverPagination,
      filter: this.organizationTable.filter,
      parentId: 1
    })
  }
}
</script>

<style>
</style>
