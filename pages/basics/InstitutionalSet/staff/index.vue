<template lang="pug">
  basic-panel(:total="1000", :cb="tableCb", :basicPanel="basicPanel")
</template>
<script>
import basicPanel from '@/components/basicPanel'
export default {
  layout: 'backend',
  components: {
    basicPanel
  },
  data() {
    return {
      basicPanel: {
        rowKey: 'memberCode',
        leftSider: {
          type: 'search',
          title: '查询',
          formItem: [
            {
              lbl: '姓名',
              model: 'employeeName',
              lblCol: { span: 4 },
              wrapperCol: { span: 20 }
            },
            {
              lbl: '代码',
              model: 'employeeCode',
              lblCol: { span: 4 },
              wrapperCol: { span: 20 }
            }
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
          {
            title: '姓名',
            dataIndex: 'employeeName',
            key: 'employeeName',
            width: 350
          },
          {
            title: '代码',
            dataIndex: 'memberCode',
            key: 'memberCode',
            width: 150
          },
          {
            title: '是否启用',
            dataIndex: 'employeeState',
            key: 'employeeState',
            width: 150
          },
          { title: '机构', key: 'orgName', dataIndex: 'orgName', width: 150 },
          { title: '部门', key: 'deptName', dataIndex: 'deptName', width: 200 },
          {
            title: '工作组',
            dataIndex: 'workgroupName',
            key: 'workgroupName',
            width: 200
          },
          {
            title: '职位',
            dataIndex: 'employeeJob',
            key: 'employeeJob',
            width: 150
          },
          {
            title: '类别',
            dataIndex: 'employeeClass',
            key: 'orgBankname',
            width: 150
          },
          {
            title: '性别',
            dataIndex: 'employeeSex',
            key: 'employeeSex',
            width: 150
          },
          {
            title: '学历2',
            dataIndex: 'employeeDegree',
            key: 'employeeDegree',
            width: 150
          },
          {
            title: '专业',
            dataIndex: 'employeeSpecialty',
            key: 'employeeSpecialty',
            width: 150
          },
          {
            title: '身份证号',
            dataIndex: 'employeeIdcard',
            key: 'employeeIdcard',
            width: 150
          },
          {
            title: '地址',
            dataIndex: 'employeeAddr',
            key: 'employeeAddr',
            width: 150
          },
          {
            title: '电话',
            dataIndex: 'employeePhone',
            key: 'employeePhone',
            width: 150
          },
          {
            title: '手机',
            dataIndex: 'employeeMobile',
            key: 'employeeMobile',
            width: 150
          },
          {
            title: '邮箱',
            dataIndex: 'employeeEmail',
            key: 'employeeEmail',
            width: 150
          },
          {
            title: '职称',
            dataIndex: 'employeeTechnical',
            key: 'employeeTechnical',
            width: 150
          },
          {
            title: '民族',
            dataIndex: 'employeeNation',
            key: 'employeeNation',
            width: 150
          },
          {
            title: '政治面貌',
            dataIndex: 'employeeParty',
            key: 'employeeParty',
            width: 150
          },
          {
            title: '籍贯',
            dataIndex: 'employeeNative',
            key: 'employeeNative',
            width: 150
          },
          {
            title: '婚姻',
            dataIndex: 'employeeMarriage',
            key: 'employeeMarriage',
            width: 150
          },
          {
            title: '出生日期',
            dataIndex: 'employeeBirthday',
            key: 'employeeBirthday',
            width: 150,
            type: 'date'
          },
          {
            title: '进公司时间',
            dataIndex: 'employeeJoindate',
            key: 'employeeJoindate',
            width: 150
          },
          {
            title: '备注',
            dataIndex: 'employeeRemark',
            key: 'orgRemark',
            width: 150
          }
        ],
        data: [
          {
            edit: false,
            deptCode: '000003',
            deptName: '财务部',
            employeeAddr: null,
            employeeBirthday: '',
            employeeClass: null,
            employeeCode: '000407',
            employeeDegree: null,
            employeeEmail: null,
            employeeId: 619,
            employeeIdcard: null,
            employeeJob: null,
            employeeJoindate: null,
            employeeJoindateStr: '',
            employeeMarriage: 1,
            employeeMarriageStr: '未婚',
            employeeMobile: null,
            employeeName: '沈超财务',
            employeeNation: null,
            employeeNative: null,
            employeeParty: null,
            employeePhone: null,
            employeeRemark: null,
            employeeSex: '男',
            employeeSpecialty: null,
            employeeState: 0,
            employeeStateStr: '是',
            employeeTechnical: null,
            memberCode: '00000001',
            orgCode: '000000',
            orgName: '智恒达',
            workgroupCode: null,
            workgroupName: null
          },
          {
            edit: false,
            deptCode: '000004',
            deptName: '财务部',
            employeeAddr: null,
            employeeBirthday: '',
            employeeClass: null,
            employeeCode: '000408',
            employeeDegree: null,
            employeeEmail: null,
            employeeId: 619,
            employeeIdcard: null,
            employeeJob: null,
            employeeJoindate: null,
            employeeJoindateStr: '',
            employeeMarriage: 1,
            employeeMarriageStr: '未婚',
            employeeMobile: null,
            employeeName: '沈超财务',
            employeeNation: null,
            employeeNative: null,
            employeeParty: null,
            employeePhone: null,
            employeeRemark: null,
            employeeSex: '男',
            employeeSpecialty: null,
            employeeState: 0,
            employeeStateStr: '是',
            employeeTechnical: null,
            memberCode: '00000002',
            orgCode: '000000',
            orgName: '智恒达',
            workgroupCode: null,
            workgroupName: null
          }
        ],
        formItem: [
          {
            lbl: '姓名',
            decorator: [
              'orgName',
              { rules: [{ required: true, message: '请输入机构名称' }] }
            ],
            type: 'text'
          },
          { lbl: '机构', decorator: ['orgName'], type: 'select', list: [] },
          { lbl: '部门', decorator: ['deptName'], type: 'select', list: [] },
          { lbl: '职位', decorator: ['employeeJob'], type: 'select', list: [] },
          {
            lbl: '类别',
            decorator: ['employeeClass'],
            type: 'select',
            list: []
          },
          {
            lbl: '性别',
            decorator: ['employeeSex'],
            type: 'radio',
            list: [{ name: '男', code: 0 }, { name: '女', code: 1 }],
            defaultValue: 0
          },
          {
            lbl: '学历',
            decorator: ['employeeDegree'],
            type: 'select',
            list: []
          },
          { lbl: '专业', decorator: ['employeeSpecialty'] },
          { lbl: '身份证号码', decorator: ['employeeIdcard'] },
          { lbl: '地址', decorator: ['employeeAddr'] },
          { lbl: '电话', decorator: ['employeePhone'] },
          { lbl: '手机', decorator: ['employeeMobile'] },
          { lbl: '邮箱', decorator: ['employeeEmail'] },
          { lbl: '职称', decorator: ['employeeTechnical'] },
          { lbl: '民族', decorator: ['employeeNation'] },
          { lbl: '政治面貌', decorator: ['employeeParty'] },
          { lbl: '籍贯', decorator: ['employeeNative'] },
          {
            lbl: '婚姻',
            decorator: ['employeeMarriage'],
            type: 'select',
            list: [
              { name: '离婚', code: 2 },
              { name: '已婚', code: 1 },
              { name: '未婚', code: 0 }
            ],
            defaultValue: 0
          },
          { lbl: '出生日期', decorator: ['employeeBirthday'], type: 'date' },
          { lbl: '进公司时间', decorator: ['employeeJoindate'], type: 'date' },
          { lbl: '工作组', decorator: ['workgroupName'] },
          {
            lbl: '备注',
            decorator: ['employeeRemark'],
            type: 'textarea',
            col: 24,
            labelCol: 2
          }
        ]
      },
      formPanel: null
    }
  },
  mounted() {},
  methods: {
    tableCb(type) {
      this.$message.success('删除成功')
    }
  }
}
</script>
