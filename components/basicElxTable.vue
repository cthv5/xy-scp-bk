<template lang="pug">
  div
    el-button-group(v-if="tableValue.topBtns")
      template(v-for="btn in tableValue.topBtns")
        el-button(type="primary", size="small", icon="el-icon-plus", @click="actionBtns(btn)", v-if="btn.type === 'create'") 新增
        el-button(type="primary", size="small", icon="el-icon-edit", @click="actionBtns(btn)", v-else-if="btn.type === 'edit'") 编辑
        el-button(type="primary", size="small", icon="el-icon-delete", @click="actionBtns(btn)", v-else-if="btn.type === 'del'") 删除
        el-button(type="primary", size="small", icon="el-icon-refresh", @click="actionBtns(btn)" v-else-if="btn.type === 'refresh'") 刷新
        el-button(v-else, type="primary", size="small", :icon="btn.icon", @click="actionBtns(btn)") {{btn.text}}    
    elx-table.mt-15(ref="basicEditable", 
      :data.sync="tableValue.tableData", 
      size="small", 
      border, 
      :height="tableHeight"
      highlight-current-row,
      @row-click="selectRow"
      @selection-change="handleSelectionChange")
        elx-table-column(type="selection", width="40", v-if="tableValue.hasCbx")
        elx-table-column(type="index", width="40", v-if="tableValue.showRowIndex")
        template(v-for="(column, index) in tableValue.tableHead")
          elx-table-column(show-overflow-tooltip, 
            :formatter="column.formatter ? column.formatter : null", 
            :prop="column.prop",
            :width="column.width ? column.width : ''", 
            :min-width="column.minWidth? column.minWidth : ''", 
            :label="column.lbl")
    .mt-15.text-right
      el-pagination(background, layout="prev, pager, next, jumper", :total="pgTotal", :page-size="pageSize", :current-page="currentPage", @current-change="pgChange")
    el-dialog(ref="dialog", :title="dialogConfig.title", :visible.sync="dialogConfig.show", width="1000px", @close="dialogHandler('cancel')")
      el-form(v-if="dialogConfig.show", ref="dialogForm", :model="tableValue.dialogModel", :inline="true", :label-width="dialogConfig.labelWidth")
        el-form-item(v-for="item in tableValue.editForm", :prop="item.rules ? item.prop : ''", :rules="item.rules" :label="item.lbl", :key="item.prop")
          template(v-if="item.type === 'select'")
            el-select.full-width(
              v-model="tableValue.dialogModel[item.prop]", 
              :multiple="item.select.multiple ? item.select.multiple : false", 
              :filterable="item.select.filterable",
              :reserve-keyword="item.select.reserveKeyword",
              :placeholder="item.select.placeholder"
              :remote-method="item.select.remoteMethod",
              size="small"
            )
              el-option(v-for="obj in item.select.list", :key="obj[item.select.valueProp]", :label="obj[item.select.labelProp]", :value="obj[item.select.valueProp]")
          template(v-else-if="item.type === 'date'")
            el-date-picker.full-width(
              v-model="tableValue.dialogModel[item.prop]", 
              placeholder="请选择起始日期", 
              size="small",
              value-format="yyyy-MM-dd HH:mm:ss")
          template(v-else)
            el-input.full-width(v-model="tableValue.dialogModel[item.prop]", clearable, size="small")
      .dialog-footer(slot="footer")
        el-button(@click="dialogHandler('cancel')", size="small") 取消
        //- el-button(@click="dialogHandler('reset')", size="small") 重置
        el-button(@click="dialogHandler('sure')", type="primary", size="small") 确定
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
    },
    dialogBox: {
      type: Object,
      default: null
    },
    tableDialogFun: {
      type: Function,
      default: function () {
        return true
      }
    },
    selectRowFun: {
      // 选择时执行
      type: Function,
      default: function () {
        return true
      }
    }
  },
  data() {
    return {
      pgTotal: 0,
      dialogConfig: {
        title: '新增',
        show: false,
        labelWidth: '100px'
      },
      rowSelection: [],
      resetDialog: {},
      tableHeight: '500px'
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
    this.resetDialog = JSON.parse(JSON.stringify(this.tableValue.dialogModel))
    // console.log(this.)
    // this.tableHeight = (window.screen.height - 400) + 'px'
    this.tableHeight = (this.pageSize * 41) + 42 + 'px'
  },
  methods: {
    handleSelectionChange(val) {
      // 选中
      this.rowSelection = val
      console.log('---------handleSelectionChange')
      this.$emit('rowSelection', val)
    },
    actionBtns(btn) {
      // 头部按钮
      const me = this  
      switch (btn.type) {
        case 'create':
          me.dialogConfig.show = true
          break
        case 'edit':
          if (me.rowSelection.length  === 0) {
            me.$message.error('请选择需要编辑的数据')
            return false
          }
          me.dialogConfig.title = '编辑'
          me.dialogConfig.show = true
          me.tableValue.dialogModel = Object.assign({}, me.rowSelection[me.rowSelection.length - 1])
          break
        case 'del':
          if (me.rowSelection.length  === 0) {
            me.$message.error('请选择需要删除的数据')
            return false
          }
          me.confirmDialog(me, '您确认要删掉本行记录吗？').then(() => {
            console.log('------------del')
            btn.handler(me.rowSelection)
          })
          break
        case 'refresh':
          break
        default:
          this.$emit('handleTopActions', btn.type)
      }
      if (btn.handler && btn.type !== 'del') {
        btn.handler()
      }      
    },
    pgChange(val) {
      // 翻页
      this.$emit('paginateChange', val)
    },
    dialogHandler(type) {
      // 弹框保存
      const me = this
      switch (type) {
        case 'sure':
          this.$refs.dialogForm.validate((valid) => {
            if (valid) {
              if (me.tableDialogFun(this.tableValue.dialogModel)) {
                this.tableValue.dialogModel = JSON.parse(JSON.stringify(this.resetDialog))
                this.dialogConfig.show = false
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'cancel':
          this.tableValue.dialogModel =  JSON.parse(JSON.stringify(this.resetDialog))
          this.dialogConfig.show = false
          break
        case 'reset':
          this.$refs['dialogForm'].resetFields()
          break
      }
      console.log(type)
    },
    selectRow (row, column, event) {      
      if (this.selectRowFun(row, column, event)) {
        console.log('-------------11')
      } else {
        return false
      }
      this.$refs.basicEditable.clearSelection()
      this.$refs.basicEditable.toggleRowSelection(row)
      this.rowSelection = JSON.parse(JSON.stringify([row]))
      this.$emit('rowSelection', this.rowSelection)
    }
  }
}
</script>
