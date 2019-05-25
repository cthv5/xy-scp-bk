<template lang="pug">
el-container.erp-panel-container
  el-aside.left-panel(:class="{'hide': leftHide}")
    slot(name="left")
  el-main.right-panel
    .dot(@click="leftHide = !leftHide")
    slot(name="right")

</template>

<script>
export default {
  data() {
    return {
      leftHide: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.erp-panel-container {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .left-panel {
    border-right: 1px solid #ddd;
    width: 280px;
    position: relative;
    transition: all 0.5s;

    &.hide {
      width: 0px;
    }

    &.show {
      width: 280px;
    }
  }

  .right-panel {
    position: relative;
    overflow: hidden;

    .dot {
      position: absolute;
      width: 10px;
      height: 20px;
      top: 80px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      left: 0;
      background: #ddd;
      z-index: 100;

      &:hover {
        cursor: pointer;
        background: #888;
      }
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0px;
      bottom: 0;
      overflow: auto;
      z-index: 10;
      padding: 15px;
    }
  }
}
</style>
