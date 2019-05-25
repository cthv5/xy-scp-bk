<template lang="pug">
  div
    el-button-group(v-if="tableValue.topBtns")
      template(v-for="btn in tableValue.topBtns")
        el-button(type="primary", size="small", icon="el-icon-plus", @click="$refs.basicEditable.insert()", v-if="btn.type === 'create'") 新增
        el-button(type="primary", size="small", icon="el-icon-delete", v-else-if="btn.type === 'del'", @click="actionBtns(btn.type)") 删除
        el-button(type="primary", size="small", icon="el-icon-refresh", v-else-if="btn.type === 'refresh'", @click="actionBtns(btn.type)") 刷新
    elx-editable.mt-15(border, :edit-config="{trigger: 'dblclick', mode: 'row'}", :edit-rules="tableValue.validRules || null", show-all-overflow, :data.sync="tableValue.tableData", @selection-change="handleSelectionChange",ref="basicEditable", @blur-active="cellEdit")
      elx-editable-column(type="selection", width="40", v-if="tableValue.hasCbx")
      elx-editable-column(type="index", width="40", v-if="tableValue.showRowIndex")
      template(v-for="column in tableValue.tableHead")
        elx-editable-column(:prop="column.prop", :label="column.lbl", :edit-render="column.noedit ? null : {name: 'ElDatePicker'}", v-if="column.type == 'date'")
        elx-editable-column(:prop="column.prop", :label="column.lbl", :edit-render="column.noedit ? null : {name: 'ElInput'}", v-else)
    .mt-15.text-right
      el-pagination(background, layout="prev, pager, next, jumper", :total="pgTotal", :page-size="pageSize", :current-page="currentPage", @current-change="pgChange")
</template>

<script>
export default {
  props: {
    tableValue: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pgTotal: 0
    }
  },
  watch: {
    total(newVal, oldVal) {
      console.log('total newval:>', newVal)
      this.pgTotal = newVal
    }
  },
  beforeMount() {
    console.log('total:>>', this.total)
    this.pgTotal = this.total
  },
  methods: {
    cellEdit(row, cell, idx, event) {
      this.$emit('rowEditInfo', row)
    },
    handleSelectionChange(val) {
      this.$emit('rowSelection', val)
    },
    actionBtns(type) {
      this.$emit('handleTopActions', type)
    },
    pgChange(val) {
      this.$emit('paginateChange', val)
    }
  }
}
</script>
