<template lang="pug">
no-ssr
  .server-container
    .sidebar
      .side-wrap
        .logo
        .search
        .menu
          a-menu(theme="dark", mode="inline")
            template(v-for="menu in menuList")
              a-menu-item(v-if="!menu.children", :key="menu.key")
                a-icon(type="pie-chart")
                span {{menu.title}}
              a-sub-menu(v-else, :key="menu.key")
                span(slot="title", :key="menu.key") {{menu.title}}
                a-menu-item(v-for="sub in menu.children", :key="sub.key")
                  span {{sub.title}}
    .right-part
      .topbar
        a-tabs.top-tab(v-model="topActiveKey")
          .mr-15(slot="tabBarExtraContent")
            a-button.no-border(size="small", icon="logout") 退出
          a-tab-pane(v-for="p in topPanes", :tab="p.title", :key="p.key")
        el-tabs.bottom-tab(v-model="activeKey", type="card", closable, @edit="onEdit", style="position: relative")
          el-tab-pane(v-for="p in panes", :label="p.title", :name="p.key", :key="p.key")
      .content
        nuxt
</template>

<script>
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      // locale: zhCN,
      activeKey: '/basics/InstitutionalSet/department',
      panes: [
        {
          url: '/basics/InstitutionalSet/organization',
          title: '机构设置',
          key: '/basics/InstitutionalSet/organization'
        },
        {
          url: '/basics/InstitutionalSet/department',
          title: '部门设置',
          key: '/basics/InstitutionalSet/department'
        },
        {
          url: '/basics/InstitutionalSet/staff',
          title: '员工设置',
          key: '/basics/InstitutionalSet/staff'
        }
      ],
      topPanes: [
        {
          title: '基础设置',
          key: '1'
        },
        {
          title: '商贸物流',
          key: '2'
        }
      ],
      topActiveKey: '1',
      menuList: [
        {
          key: '1',
          title: '基础数据',
          children: [
            {
              key: '1.1',
              title: '机构设置'
            },
            {
              key: '1.2',
              title: '部门设置'
            },
            {
              key: '1.3',
              title: '员工设置'
            }
          ]
        }
      ]
    }
  },
  watch: {
    activeKey(newVal, oldVal) {
      this.redirect(newVal)
    }
  },
  beforeMount() {
    this.redirect(this.activeKey)
  },
  methods: {
    onEdit(targetKey, action) {
      if (action === 'remove') {
        this.panes = this.panes.filter(itm => itm.key !== targetKey)
        this.activeKey = this.panes[this.panes.length - 1].key
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../assets/stylus/common';
</style>
