<template lang="pug">
erplr-panel
  div(slot="left")
    slot-left-search(:formItem="searchForm", :searchEvent="searchFun")
  .content(slot="right")
    basic-elx-table(
      :tableValue="tableValue", 
      :total="total",       
      :currentPage="currentPage", 
      :pageSize="pageSize", 
      :tableDialogFun="tableDialogFun", 
      :selectRowFun = "selectRowFun",
      @paginateChange="pgChange")
</template>
<script>
import erplrPanel from '@/components/erplrPanel'
import basicElxTable from '@/components/basicElxTable'
import slotLeftSearch from '@/components/slotLeftSearch'
export default {
  layout: 'backend',
  components: {
    erplrPanel,
    basicElxTable,
    slotLeftSearch
  },
  data() {
    return {
      leftHide: false,
      dptList: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      tableValue: {
        topBtns: [],
        editForm: [
          {lbl: '部门名称', prop: 'deptName', rules: [{required: true, message: '请输入部门名称', trigger: 'blur'}]},
          {lbl: '负责人', prop: 'deptManager'},
          // {lbl: '统计部门', prop: 'deptTjname'},
          // {lbl: '销售统计部门', prop: 'deptSale'},
          // {lbl: '状态', prop: 'deptState'},
          {lbl: '备注', prop: 'deptRemark'},
        ],
        dialogModel: {deptName: '', deptManager: '', deptRemark: ''},
        hasCbx: true,
        showRowIndex: true,
        validRules: {
          code: [{ required: true, message: '编码必须填写', trigger: 'blur' }],
          name: [{ required: true, message: '名称必须填写', trigger: 'blur' }],
          memberCode: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        tableHead: [
          {lbl: '部门代码', prop: 'deptCode'},
          {lbl: '部门名称', prop: 'deptName'},
          {lbl: '负责人',  prop: 'deptManager'},
          // {lbl: '统计部门', prop: 'deptTjname'},
          // {lbl: '销售统计部门', prop: 'deptSale'},
          // {lbl: '状态', prop: 'deptState'},
          {lbl: '备注', prop: 'deptRemark'}
        ],
        tableData: []
      },
      searchForm: {
        form: [
          {lbl: '部门名称', prop: 'deptName'},
          {lbl: '部门代码', prop: 'deptCode'},
        ],
        model: {deptName: '', deptCode: ''}
      }
    }
  },
  beforeMount() {
    this.tableValue.topBtns = [
      {type: 'create'},
      {type: 'edit'},
      {type: 'del', handler: this.delTable()},
      {type: 'refresh', handler: this.refresh()}
    ]
  },
  mounted () {
    this.loadDptData()
  },
  methods: {
    async save(row) {
      try {
        let proxy = '/proxy/common/post'
        if (row.id && row.id > 0) {
          delete row.updateAt
          delete row.createAt
          proxy = '/proxy/common/put'
        }              
        const { data } = await this.apiStreamPost(proxy, {url: 'basicInfo/dpt', params: row})
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
      this.currentPage = val
      this.loadDptData()
    },
    async loadDptData(params) {
      try {
        if (!params) params = ''
        const { data } = await this.apiStreamPost('/proxy/common/get', {
          url:
            'basicInfo/dpt?currentPage=' +
            this.currentPage +
            '&pageSize=' +
            this.pageSize + params
        })
        if (data.return_code === 0) {
          this.dptList = data.list
          this.tableValue.tableData = data.list
          this.total = data.total
        }
      } catch (e) {
        console.error(e)
      }
    },
    tableDialogFun(row) {         
      // val.deptCode = '1111'
      this.save(row)
      return true
    },
    async delDpt (params) {
      try {        
        const { data } = await this.apiStreamPost('/proxy/common/del', {url: 'basicInfo/dpt' + params})
        if (data.return_code === 0) {
          this.currentPage = 1
          this.loadDptData()
          this.$message.success('删除成功')
        }
      } catch(e) {
        console.error(e)
      }
    },
    delTable() {
      return (list) => {
        let params = '/' + list[0].deptId
        if (list.length > 1) {
          let spIds = []
          list.map((item) => {
            spIds.push('spIds[]=' + item.deptId)
          })
          const spIdsStr = spIds.toString().replace(/,/g, '&')
          params = '?' + encodeURI(spIdsStr)
        }
        this.delDpt(params)
      }      
    },
    refresh () {
      return () => {
        this.loadDptData()
        return true
      }
    },
    selectRowFun(row, column, event) {
      console.log('-----------selectRowFun')
      return true
    },
    async searchFun (form) {
      this.currentPage = 1
      let params = ''
      for (let key in form.model) {
        if (form.model[key]) {
          params += '&' + key + '=' + form.model[key]
        }
      }      
      this.loadDptData(params)
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
