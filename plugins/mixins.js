import Vue from 'vue'
import httpUtil from '../utils/httpUtil'
import elemtUtil from '../utils/elemtUtil'

if (process.client) {
  console.log('-------------cccc')
  window.G6Grid = require('@antv/g6/plugins/grid')
  window.G6 = require('@antv/g6/lib')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const minixs = {
  data() {
    return {}
  },
  watch: {
    '$store.state.globalSuccessMsg'(newVal, oldVal) {
      if (newVal !== '') this.msgShow(this, newVal, 'success')
    },
    '$store.state.globalErrorMsg'(newVal, oldVal) {
      if (newVal !== '') this.msgShow(this, newVal)
    }
  },
  methods: {
    jump(to) {
      if (this.$router) this.$router.push(to)
    },
    back() {
      if (this.$router) this.$router.go(-1)
    },
    redirect(to) {
      if (this.$router) this.$router.replace(to)
    },
    date2Str(date) {
      if (date) {
        let n = date
        if (typeof date === 'number') {
          n = new Date(date)
        }
        const years = n.getFullYear()
        const month = n.getMonth() + 1
        const day = n.getDate()
        return [years, month, day].map(formatNumber).join('-')
      } else {
        return ''
      }
    },
    date2Time(date) {
      if (date) {
        let n = date
        if (typeof date === 'number') {
          n = new Date(date)
        }
        const years = n.getFullYear()
        const month = n.getMonth() + 1
        const day = n.getDate()
        const hours = n.getHours()
        const mins = n.getMinutes()
        const secs = n.getSeconds()
        return (
          [years, month, day].map(formatNumber).join('-') +
          ' ' +
          [hours, mins, secs].map(formatNumber).join(':')
        )
      } else {
        return ''
      }
    },
    One2DArray(originArray, len = 3, autoComplete = true) {
      const row =
        originArray.length % len === 0
          ? originArray.length / len
          : Math.ceil(originArray.length / len)
      const arr = []
      for (let i = 0; i < row; i++) {
        if (i === row - 1 && i * len < originArray.length - 1) {
          // 最后一行
          const tempArr = []
          const startIdx = i * len
          for (let j = startIdx; j < originArray.length; j++) {
            tempArr.push(originArray[j])
          }
          if (autoComplete) {
            for (let x = 0; x < len - tempArr.length; x++) {
              tempArr.push('')
            }
          }
          arr.push(tempArr)
        } else {
          arr.push([
            originArray[i * len],
            originArray[i * len + 1],
            originArray[i * len + 2]
          ])
        }
      }
      return arr
    },
    showMsg: elemtUtil.showMsg,
    confirmDialog: elemtUtil.confirmDialog,
    apiGet: httpUtil.httpGet,
    apiStreamPost: httpUtil.httpStreamPost,
    request(ctx, config) {
      return ctx.$axios({
        method: 'post',
        url: 'http://' + window.location.host + config.url,
        data: config.params
      })
    },
    proxy(ctx, url, method = 'get', params = {}) {
      return this.request(ctx, {
        url: '/proxy',
        params: {
          method,
          url,
          params
        }
      })
    },
    formValidate(ctx, formName) {
      return new Promise((resolve, reject) => {
        ctx.$refs[formName].validate(valid => {
          if (valid) {
            resolve('success')
          } else {
            reject(new Error('valid fail'))
          }
        })
      })
    }
  }
}
export default () => {
  Vue.mixin(minixs)
}
