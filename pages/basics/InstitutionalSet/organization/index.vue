<template lang="pug">
  basic-panel(:buttonGroup="buttonGroup", :total="1000", :panelScroll="{x: 2000, y: 600}", :columns="columns", :data="tableData", :cb="tableCb", :form="formPanel", :formItem="formItem", :rowKey="'orgCode'")
</template>
<script>
import basicPanel from '@/components/basicPanel'
export default {
  layout: 'backend',
  components: {
    basicPanel
  },
  data () {   
    return {
      formPanel: null,
      buttonGroup: [{
        type: 'add',
        icon: 'plus',
        text: '增加'
      }, {
        type: 'edit',
        icon: 'edit',
        text: '编辑'
      }, {
        type: 'del',
        icon: 'delete',
        text: '删除',
        popconfirm: {
          title: '确认删除？'
        }
      }, {
        type: 'reload',
        icon: 'reload',
        text: '刷新'
      }],
      columns: [{
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
        width: 350     
      }, {
        title: '机构代码',
        dataIndex: 'orgCode',
        key: 'orgCode',
        width: 150
      }, {
        title: '机构简称',
        dataIndex: 'orgAbbreviate',
        key: 'orgAbbreviate',
        width: 150
      }, {
        title: '机构法人',
        key: 'orgCorporation',
        dataIndex: 'orgCorporation',
        width: 150
      }, {
        title: '电话',
        key: 'orgPhone',
        dataIndex: 'orgPhone',
        width: 200
      }, {
        title: '传真',
        dataIndex: 'orgFax',
        key: 'orgFax',
        width: 200
      }, {
        title: '账号',
        dataIndex: 'orgAccounts',
        key: 'orgAccounts',
        width: 150
      }, {
        title: '开户银行',
        dataIndex: 'orgBankname',
        key: 'orgBankname',
        width: 150
      }, {
        title: '税号',
        dataIndex: 'orgTanu',
        key: 'orgTanu',
        width: 150
      }, {
        title: '地址',
        dataIndex: 'orgAddr',
        key: 'orgAddr',
        width: 150
      }, {
        title: '备注',
        dataIndex: 'orgRemark',
        key: 'orgRemark',
        width: 150
      }],
      tableData: [{
        orgName: '常州金新怡机械科技有限公司',
        orgCode: '000014',
        orgAbbreviate: '金新怡'     
      }, {
        orgName: '常州金新怡机械科技有限公司',
        orgCode: '000015',
        orgAbbreviate: '金新怡'     
      }],
      formItem: [
        {lbl: '机构名称', decorator: ['orgName', {rules: [{ required: true, message: '请输入机构名称' }]}]}, 
        {lbl: '机构简称', decorator: ['orgAbbreviate']}, 
        {lbl: '法人代表', decorator: ['orgCorporation']}, 
        {lbl: '电话', decorator: ['orgPhone']}, 
        {lbl: '传真', decorator: ['orgFax']}, 
        {lbl: '地址', decorator: ['orgAdd']}, 
        {lbl: '账号', decorator: ['orgAccounts'], type: 'select', list: [{name: 'test1', code: 1},{name: 'test2', code: 2}]}, 
        {lbl: '开户行', decorator: ['orgBankname'], col: 8}, 
        {lbl: '税号', decorator: ['orgTanu'], col: 8}, 
        {lbl: '备注', decorator: ['orgRemark'], type: 'textarea', col: 24, labelCol: 2}
      ]
    }
  },  
  methods: {
    tableCb(type) {
      console.log('---------1')
      console.log(type)
      this.$message.success('删除成功')
    }
  }
}
</script>

