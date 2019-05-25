<template lang="pug">
erplr-panel
  div(slot="left")
    .padding.bg-container 查询
    el-form.padding(inline)
      el-form-item(label="名称")
        el-input(size="small")
      el-form-item(label="编号")
        el-input(size="small")
      el-form-item.full-width.text-center
        el-button-group
          el-button(type="primary", size="small") 搜索
          el-button(size="small") 重置
  .content(slot="right")
    edit-table(:tableValue="tableValue", :total="total", @rowEditInfo="cellEdit", :currentPage="currentPage", :pageSize="pageSize", @paginateChange="pgChange")
</template>
<script>
import basicPanel from '@/components/basicPanel'
import erplrPanel from '@/components/erplrPanel'
import editTable from '@/components/editTable'
export default {
  layout: 'backend',
  components: {
    basicPanel,
    erplrPanel,
    editTable
  },
  data() {
    return {
      leftHide: false,
      dptList: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      tableValue: {
        topBtns: [
          {
            type: 'create'
          },
          {
            type: 'del'
          },
          {
            type: 'refresh'
          }
        ],
        hasCbx: true,
        showRowIndex: true,
        validRules: {
          code: [{ required: true, message: '编码必须填写', trigger: 'blur' }],
          name: [{ required: true, message: '名称必须填写', trigger: 'blur' }],
          memberCode: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        tableHead: [
          {
            lbl: '编号',
            prop: 'code'
          },
          {
            lbl: '名称',
            prop: 'name'
          },
          {
            lbl: '集团编号',
            prop: 'memberCode'
          }
        ]
      },
      basicPanel: {
        rowKey: 'deptCode',
        leftSider: {
          type: 'search',
          title: '查询',
          formItem: [
            { lbl: '部门名称', model: 'deptName' },
            { lbl: '部门代码', model: 'deptCode' }
          ]
        },
        rowSelection: { type: 'radio' },
        buttonGroup: [
          { type: 'add', icon: 'plus', text: '增加' },
          { type: 'edit', icon: 'edit', text: '编辑' },
          {
            type: 'del',
            icon: 'delete',
            text: '删除',
            popconfirm: { title: '确认删除？' }
          },
          { type: 'reload', icon: 'reload', text: '刷新' }
        ],
        columns: [
          { title: '部门名称', dataIndex: 'deptName', key: 'deptName' },
          {
            title: '部门代码',
            dataIndex: 'deptCode',
            key: 'deptCode',
            width: 150
          },
          {
            title: '负责人',
            dataIndex: 'deptManager',
            key: 'deptManager',
            width: 150
          },
          {
            title: '统计部门',
            key: 'deptTjname',
            dataIndex: 'deptTjname',
            width: 150
          },
          {
            title: '销售统计部门',
            key: 'deptSale',
            dataIndex: 'deptSale',
            width: 200
          },
          {
            title: '状态',
            dataIndex: 'deptState',
            key: 'deptState',
            width: 80
          },
          {
            title: '备注',
            dataIndex: 'deptRemark',
            key: 'deptRemark',
            width: 350
          }
        ],
        data: [
          {
            deptName: '测试部门1',
            deptCode: '000053',
            deptManager: '测试部门1',
            deptTjname: '测试部门',
            deptSale: '开发一部',
            deptState: '启用',
            deptRemark: '-----------1'
          },
          {
            deptName: '测试部门1',
            deptCode: '000054',
            deptManager: '测试部门1',
            deptTjname: '测试部门',
            deptSale: '开发一部',
            deptState: '启用',
            deptRemark: '-----------1'
          }
        ],
        formItem: [
          {
            lbl: '部门名称',
            decorator: [
              'deptName',
              { rules: [{ required: true, message: '请输入部门名称' }] }
            ]
          },
          { lbl: '负责人', decorator: ['deptManager'] },
          { lbl: '统计部门', decorator: ['deptTjname'] },
          { lbl: '销售统计部门', decorator: ['deptSale'] },
          { lbl: '状态', decorator: ['deptState'] },
          {
            lbl: '备注',
            decorator: ['deptRemark'],
            type: 'textarea',
            col: 24,
            labelCol: 2
          }
        ]
      }
    }
  },
  beforeMount() {
    this.loadDptData()
  },
  methods: {
    tableCb(type) {
      this.$message.success('删除成功')
    },
    cellEdit(row) {
      console.log(row)
      this.save(row)
    },
    async save(row) {
      try {
        if (row.id && row.id > 0) {
          delete row.updateAt
          delete row.createAt
        }
        const { data } = await this.apiStreamPost('/proxy/common/post', {
          url: 'basicInfo/dpt',
          params: row
        })
        if (data.return_code === 0) {
          if (row.id && row.id > 0) this.$message.success('更新成功')
          else {
            console.log('create success')
            this.currentPage = 1
            this.loadDptData()
            this.$message.success('新增成功')
          }
        } else {
          this.$message.error(data.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    pgChange(val) {
      console.log(val)
      this.currentPage = val
      this.loadDptData()
    },
    async loadDptData() {
      try {
        const { data } = await this.apiStreamPost('/proxy/common/get', {
          url:
            'basicInfo/dpt?currentPage=' +
            this.currentPage +
            '&pageSize=' +
            this.pageSize
        })
        console.log(data)
        if (data.return_code === 0) {
          this.dptList = data.list
          this.tableValue.tableData = data.list
          this.total = data.total
        }
      } catch (e) {
        console.error(e)
      }
    },
    handleSelectionChange(val) {
      console.log('val:>>', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.erp-content-leftbar {
  &.hide {
    width: 0px;
  }

  &.show {
    width: 280px;
  }
}
</style>
