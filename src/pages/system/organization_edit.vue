<template>
  <q-modal v-model="opened" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          v-close-overlay
          icon="keyboard_arrow_left"
        />
        <q-toolbar-title>
          新增/编辑
        </q-toolbar-title>
        <q-btn
          color="primary" @click="close()"
          label="Close"
        />
      </q-toolbar>

      <q-toolbar slot="footer">
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn
          color="warning" @click="submit()"
          label="Submit"
        />
      </q-toolbar>

      <div class="layout-padding row">
        <div class="col-lg-5">
          <q-tree
            :nodes="organizationTree"
            default-expand-all
            :selected.sync="selected"
            node-key="id"
            @lazy-load="onLazyLoad"
          />
        </div>
        <div class="col-lg-7">
          <q-input
            v-model="form.parent.name"
            :error="$v.form.parent.name.$error"
            readonly
            float-label="上级组织机构"
          />
          <q-input
            v-model="form.name"
            @blur="$v.form.name.$touch"
            @keyup.enter="submit"
            :error="$v.form.name.$error"
            float-label="组织机构名称"
          />
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    var _self = this
    return {
      opened: false,
      selected: null,
      form: {
        id: null,
        parent: {
          id: null,
          name: ''
        },
        name: ''
      },
      organizationTree: [
        {
          id: 1,
          label: '组织机构',
          lazy: true,
          'handler': function (item) {
            _self.setParentId(item.id)
            _self.setParentName(item.label)
          }
        }
      ]
    }
  },
  validations: {
    form: {
      name: { required },
      parent: {
        name: { required }
      }
    }
  },
  methods: {
    open () {
      this.clear()
      this.opened = true
    },
    close () {
      this.opened = false
    },
    clear () {
      this.form = {
        id: null,
        parent: {
          id: null,
          name: ''
        },
        name: ''
      }
    },
    onLazyLoad ({ node, key, done, fail }) {
      var _self = this
      // 如果发生任何错误，调用fail（）
      let id = node.id
      this.$axios.get('api-system/organization/tree/' + id).then(res => {
        let organizations = res.data
        let array = []
        organizations.forEach(item => {
          array.push({
            'id': item.id,
            'label': item.name,
            lazy: true,
            'handler': function (item) {
              _self.setParentId(item.id)
              _self.setParentName(item.label)
            }
          })
        })
        done(array)
      })
    },
    setId (id) {
      this.$axios.get('api-system/organization/id/' + id).then(res => {
        debugger
        var data = res.data
        if (data.parent) {
          this.form.parent.id = data.parent.id
          this.form.parent.name = data.parent.name
        } else {
          this.form.parent.id = 1
          this.form.parent.name = '组织机构'
        }
        this.form.id = id
        this.form.name = data.name
      })
    },
    setParentId (parentId) {
      this.form.parent.id = parentId
    },
    setParentName (name) {
      this.form.parent.name = name
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('请按要求填写.')
        return
      }
      this.$axios.post('api-system/organization/save', this.form).then(res => {
        this.opened = false
        this.$emit('noticeParent')
      })
    }
  }
}
</script>

<style>
</style>
