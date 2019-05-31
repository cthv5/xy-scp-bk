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
    const remoteMethod = () => {
      console.log('----------------remoteMethod')
    }
    return {
      total: 0,
      currentPage: 1,
      pageSize: 15,
      tableValue: {
        topBtns: [],
        editForm: [
          {lbl: '姓名', prop: 'employeeName', rules: [{required: true, message: '请输入部门名称', trigger: 'blur'}]},
          {lbl: '机构', prop: 'orgName', type: 'select', select: {            
            filterable: true,
            remote: true,
            reserveKeyword: true,
            placeholder:"请输入机构名称",
            remoteMethod: remoteMethod,
            list: [],
            labelProp: '',
            valueProp: ''
          }},
          {lbl: '部门', prop: 'deptName'},
          {lbl: '职位', prop: 'employeeJob'},
          {lbl: '类别', prop: 'employeeClass'},
          {lbl: '性别', prop: 'employeeSex', type: 'select', select: {
              list: [                
                { name: '男'},
                { name: '女'}
              ],
              labelProp: 'name',
              valueProp: 'name'
            }
          },
          {lbl: '学历', prop: 'employeeDegree', type: 'select', select: {
              list: [{name: '本科', code: 1},{name: '大专', code: 2}],
              labelProp: 'name',
              valueProp: 'name'
            }
          },
          {lbl: '专业', prop: 'employeeSpecialty'},
          {lbl: '身份证号码', prop: 'employeeIdcard'},
          {lbl: '地址', prop: 'employeeAddr'},
          {lbl: '电话', prop: 'employeePhone'},
          {lbl: '手机', prop: 'employeeMobile'},
          {lbl: '邮箱', prop: 'employeeEmail'},
          {lbl: '职称', prop: 'employeeTechnical'},
          {lbl: '民族', prop: 'employeeNation'},
          {lbl: '政治面貌', prop: 'employeeParty'},
          {lbl: '籍贯', prop: 'employeeNative'},
          {lbl: '婚姻', prop: 'employeeMarriage', type: 'select', select: {
              list: [                
                { name: '未婚', code: 1 },
                { name: '已婚', code: 2 },
                { name: '离婚', code: 3 },
                { name: '丧偶', code: 4 },
              ],
              labelProp: 'name',
              valueProp: 'name'
            }
          },
          {lbl: '出生日期', prop: 'employeeBirthday', type: 'date'},
          {lbl: '进公司时间', prop: 'employeeJoindate', type: 'date'},
          {lbl: '工作组', prop: 'workgroupName'},
          {lbl: '备注', prop: 'employeeRemark'}
        ],
        dialogModel: {
          employeeName: '', 
          orgName: '', 
          deptName:'', 
          employeeJob: '', 
          employeeClass: '', 
          employeeSex: '', 
          employeeDegree: '', 
          employeeSpecialty: '', 
          employeeIdcard: '', 
          employeeAddr: '',
          employeePhone: '',
          employeeMobile: '',
          employeeEmail: '',
          employeeTechnical: '',
          employeeNation: '',
          employeeParty: '',
          employeeNative: '',
          employeeMarriage: '',
          employeeBirthday: '',
          employeeJoindate: '',
          workgroupName: '',
          employeeRemark: ''},
        hasCbx: true,
        showRowIndex: true,
        validRules: {},
        tableHead: [
          {lbl: '姓名', prop: 'employeeName'},
          {lbl: '代码', prop: 'memberCode'},
          {lbl: '是否启用',  prop: 'employeeState', formatter: (row, column, cellValue, index) => {
            return cellValue === 1 ? '停用' : '启用'
          }},
          {lbl: '机构', prop: 'orgName'},
          {lbl: '部门', prop: 'deptName'},
          {lbl: '工作组', prop: 'workgroupName'},
          {lbl: '职位', prop: 'employeeJob'},
          {lbl: '类别', prop: 'employeeClass'},
          {lbl: '性别', prop: 'employeeSex'},
          {lbl: '学历', prop: 'employeeDegree'},
          {lbl: '专业', prop: 'employeeSpecialty'},
          {lbl: '身份证号', prop: 'employeeIdcard'},
          {lbl: '地址', prop: 'employeeAddr'},
          {lbl: '电话', prop: 'employeePhone'},
          {lbl: '手机', prop: 'employeeMobile'},
          {lbl: '邮箱', prop: 'employeeEmail'},
          {lbl: '职称', prop: 'employeeTechnical'},
          {lbl: '民族', prop: 'employeeNation'},
          {lbl: '政治面貌', prop: 'employeeParty'},
          {lbl: '籍贯', prop: 'employeeNative'},
          {lbl: '婚姻', prop: 'employeeMarriage'},
          {lbl: '出生日期', prop: 'employeeBirthday', width: '100', formatter: (row, column, cellValue, index) => {
            return cellValue ?  this.date2Str(new Date(cellValue)) : null
          }},
          {lbl: '进公司时间', prop: 'employeeJoindate', width: '100', formatter: (row, column, cellValue, index) => {
            return cellValue ?  this.date2Str(new Date(cellValue)) : null
          }},
          {lbl: '备注', prop: 'employeeRemark'}
        ],
        tableData: []
      },
      searchForm: {
        form: [
          {lbl: '姓名', prop: 'employeeName'},
          {lbl: '代码', prop: 'employeeCode'},
        ],
        model: {employeeName: '', employeeCode: ''}
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
    async loadDptData() {
      try {
        const { data } = await this.apiStreamPost('/proxy/common/get', {
          url:
            'basicInfo/emp?currentPage=' +
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
    async save(row) {
      try {
        let proxy = '/proxy/common/post'
        if (row.id && row.id > 0) {
          delete row.updateAt
          delete row.createAt
          proxy = '/proxy/common/put'
        }              
        const { data } = await this.apiStreamPost(proxy, {url: 'basicInfo/emp', params: row})
        debugger
        console.log('-save', row)
        if (data.return_code === 0) {
          if (row.empId && row.empId > 0) this.$message.success('更新成功')
          else this.$message.success('新增成功')
          this.currentPage = 1
          this.loadDptData()
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
    tableDialogFun(row) {
      console.log(row)
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
        const { data } = await this.apiStreamPost('/proxy/common/del', {url: 'basicInfo/emp' + params})
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
        let params = '/' + list[0].empId
        if (list.length > 1) {
          let spIds = []
          list.map((item) => {
            spIds.push('spIds[]=' + item.empId)
          })
          const spIdsStr = spIds.toString().replace(/,/g, '&')
          params = '?' + encodeURI(spIdsStr)
        }
        this.delTableRow(params)
      }      
    },
    refresh () {
      return () => {
        this.currentPage = 1
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
      this.currentPage = 1
      console.log(form.model.deptCode)
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
