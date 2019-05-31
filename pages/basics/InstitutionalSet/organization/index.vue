<template lang="pug">
erplr-panel
  div(slot="left")
    .padding.bg-container 组织机构
    el-tree(:data="treeData", :props="defaultProps", @node-click="handleNodeClick")    
  .content(slot="right")
    basic-elx-table(
      :tableValue="tableValue", 
      :total="total",       
      :currentPage="currentPage", 
      :pageSize="pageSize", 
      :tableDialogFun="tableDialogFun", 
      @paginateChange="pgChange")
</template>
<script>
import erplrPanel from '@/components/erplrPanel'
import basicElxTable from '@/components/basicElxTable'
export default {
  layout: 'backend',
  components: {
    erplrPanel,
    basicElxTable
  },
  data() {
    return {
      treeData: [{label: '一级 1', children: [{label: '二级 1-1'},{label: '二级 1-2'},{label: '二级 1-3'}]}],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      total: 0,
      currentPage: 1,
      pageSize: 15,
      tableValue: {
        topBtns: [],
        editForm: [
          {lbl: '机构名称', prop: 'orgName', rules: [{required: true, message: '请输入部门名称', trigger: 'blur'}]},
          {lbl: '机构简称', prop: 'orgAbbreviate'},
          {lbl: '法人代表', prop: 'orgCorporation'},
          {lbl: '电话', prop: 'orgPhone'},
          {lbl: '传真', prop: 'orgFax'},
          {lbl: '地址', prop: 'orgAdd'},
          {lbl: '账号', prop: 'orgAccounts'},
          {lbl: '开户行', prop: 'orgBankname'},
          {lbl: '税号', prop: 'orgTanu'},
          {lbl: '备注', prop: 'orgRemark'}
        ],
        dialogModel: {orgName: '', orgAbbreviate: '', orgCorporation:'', orgPhone: '', orgFax: '', orgAdd: '', orgAccounts: '', orgBankname: '', orgTanu: '', orgRemark: ''},
        hasCbx: true,
        showRowIndex: true,
        validRules: {},
        tableHead: [
          {lbl: '机构名称', prop: 'orgName', width: '250'},
          {lbl: '机构代码', prop: 'orgCode'},
          {lbl: '机构简称',  prop: 'orgAbbreviate'},
          {lbl: '机构法人', prop: 'orgCorporation'},
          {lbl: '电话', prop: 'orgPhone'},
          {lbl: '传真', prop: 'orgFax'},
          {lbl: '账号', prop: 'orgAccounts'},
          {lbl: '开户银行', prop: 'orgBankname'},
          {lbl: '税号', prop: 'orgTanu'},
          {lbl: '地址', prop: 'orgAddr'},
          {lbl: '账号', prop: 'orgAccounts'},
          {lbl: '备注', prop: 'orgRemark'}
        ],
        tableData: []
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
        const { data } = await this.apiStreamPost(proxy, {url: 'basicInfo/org', params: row})
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
    async loadDptData() {
      try {
        const { data } = await this.apiStreamPost('/proxy/common/get', {
          url:
            'basicInfo/org?currentPage=' +
            this.currentPage +
            '&pageSize=' +
            this.pageSize
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
      for (let key in row) {
        if (!row[key]) {
          delete row[key]
        }
      }
      this.save(row)
      return true
    },
    async delTableRow (params) {
      try {        
        const { data } = await this.apiStreamPost('/proxy/common/del', {url: 'basicInfo/org' + params})
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
        let params = '/' + list[0].orgId
        if (list.length > 1) {
          let spIds = []
          list.map((item) => {
            spIds.push('spIds[]=' + item.orgId)
          })
          const spIdsStr = spIds.toString().replace(/,/g, '&')
          params = '?' + encodeURI(spIdsStr)
        }
        this.delTableRow(params)
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
      console.log('--------------val')
      console.log(form.model)
      // try {
      //   const deptCode = form.model.deptCode
      //   const { data } = await this.apiStreamPost('/proxy/common/get', {url: 'basicInfo/org/' + deptCode})
      //   console.log(data)
      // } catch (e) {
      //   console.error(e)
      // }
    }
  }
}
</script>
