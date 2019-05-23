<template lang="pug">
  basic-panel(:buttonGroup="buttonGroup", :panelScroll="{ y: 600}", :columns="columns", :data="tableData", :cb="tableCb", :formItem="formItem", :rowKey="'deptCode'")
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
      buttonGroup: [
        {type: 'add', icon: 'plus', text: '增加'}, 
        {type: 'edit', icon: 'edit', text: '编辑'}, 
        {type: 'del', icon: 'delete', text: '删除', popconfirm: {title: '确认删除？'}}, 
        {type: 'reload', icon: 'reload', text: '刷新'}
      ],
      columns: [
        {title: '部门名称', dataIndex: 'deptName', key: 'deptName'}, 
        {title: '部门代码', dataIndex: 'deptCode', key: 'deptCode', width: 150}, 
        {title: '负责人', dataIndex: 'deptManager', key: 'deptManager', width: 150}, 
        {title: '统计部门', key: 'deptTjname', dataIndex: 'deptTjname', width: 150}, 
        {title: '销售统计部门', key: 'deptSale', dataIndex: 'deptSale', width: 200}, 
        {title: '状态', dataIndex: 'deptState', key: 'deptState', width: 200}, 
        {title: '备注', dataIndex: 'deptRemark', key: 'deptRemark', width: 150}
      ],
      tableData: [{
        deptName: '测试部门1',
        deptCode: '000053',
        deptManager: '测试部门1',
        deptTjname: '测试部门',
        deptSale: '开发一部',
        deptState: '启用',
        deptRemark: '-----------1'   
      }, {
        deptName: '测试部门1',
        deptCode: '000054',
        deptManager: '测试部门1',
        deptTjname: '测试部门',
        deptSale: '开发一部',
        deptState: '启用',
        deptRemark: '-----------1'    
      }],
      formItem: [
        {lbl: '部门名称', decorator: ['deptName', {rules: [{ required: true, message: '请输入部门名称' }]}]}, 
        {lbl: '负责人', decorator: ['deptManager']}, 
        {lbl: '统计部门', decorator: ['deptTjname']}, 
        {lbl: '销售统计部门', decorator: ['deptSale']}, 
        {lbl: '状态', decorator: ['deptState']}, 
        {lbl: '备注', decorator: ['deptRemark'], type: 'textarea', col: 24, labelCol: 2}]
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

