<template lang="pug">
el-container 
  el-aside.bg-f9.aside.padding.text-right
    el-button-group.mt-15.ml-15
      el-button(size="small", icon="el-icon-plus", type="primary", @click="addNode")      
      el-button(size="small", icon="el-icon-delete", type="primary")
    .mt-35
      el-form(ref="from", :model="form", label-width="70px")
        el-form-item(label="主标题")
          el-input(v-model="form.mainTitle")
        el-form-item(label="副标题")
          el-input(v-model="form.title")
        el-form-item
          el-button(type="primary", size="small") 确定
  el-main.main
    .main-content(id="mountNode")
</template>
<script>
export default {
  data () {
    return {
      form: {
        title: '',
        mainTitle: ''   
      },
      graph: '',
      graphData: {
        nodes: [
          {id:"node0", x:100, y:150, title:"郑家敏", mainTitle: '1.申请人'}, 
          {id:"node1", x:400, y:250, title:"严峻",  mainTitle: '2.主管'},
          {id:"node2", x:500, y:250, title:"严峻",  mainTitle: '3.部长'}
        ],
        edges: [
          // {id: 'edge1', source: 'node1', target: 'node2', controlPoints:[{x:100, y:200}, {x:100, y:350}, {x:400, y:350}]}
          // {id: 'edge1', source: 'node1', target: 'node2'}
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initG6()
    })
  },
  methods: {
    initG6 () {
      const grid = new G6Grid()
      const me = this
      this.clickAddEdge()
      this.shapeHtml()
      this.edgeHvh()
      this.edgePolyline()
      this.graph = new G6.Graph({
        renderer: 'svg',
        plugins: [ grid ],
        container: 'mountNode',
        width: window.screen.width,
        height: window.screen.height,
        modes: {
          default: ['click-select'],
          drag: ['drag-node','drag-canvas', 'click-select', 'click-add-edge', 'dbclick-update-label'],
          tooltip: [{
            type: 'tooltip',
            formatText(model) {
              console.log(model)
              return 'test111'
            }
          }]
        },
        edgeStyle: {
          default: { stroke: '#A3B1BF', endArrow: true }
        },
        nodeStyle: {
          default: {
            fill: '#cfe7ff',
            stroke: '#3086fb',
            lineWidth: 2
          },
          selected: {
            lineWidth: 4,
            stroke: 'red',
            fillOpacity: 0.8
          }
        },
        defaultNode: { shape: 'nodeHtml', size: '100', labelStyle: {color: '#000'}},        
        defaultEdge: { 
          size: 3, 
          stroke: '#ccc', 
          // shape: 'hvh', 
          shape: 'edgePolyline',
          // shape: 'polyline',
          labelCfg: {
            refY: 10, 
            position: 'center', 
            autoRotate:true
          },
          style: {}
        }
      })
      this.graph.data(this.graphData)
      this.graph.render()
      this.graph.setMode('drag') //切换mode
    },
    clickAddEdge () {
      const me = this
      G6.registerBehavior('click-add-edge', {
        getEvents() {
          return {
            'node:click': 'onClick' , 
            mousemove: 'onMousemove'
          }
        },
        onClick(ev) {
          const node = ev.item
          me.clickNode = node
          const graph = this.graph
          const point = {x: ev.x, y: ev.y}
          const model = node.getModel()
          // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
          if (this.addingEdge && this.edge) {
            console.log('--------1')
            const startModel = this.edge._cfg.sourceNode._cfg.model
            const startPoint = {
              x: startModel.x,
              y: startModel.y
            }
            const endPoint = {
              x: model.x,
              y: model.y
            }
            console.log(startPoint)
            console.log(endPoint)
            let controlPoints = []
            if (startPoint.y < endPoint.y) {
              controlPoints = [
                {x: startPoint.x, y: endPoint.y + 100}, 
                {x: endPoint.x, y: endPoint.y + 100},
                {x: endPoint.x, y: endPoint.y + 100}
              ]
            }
            if (startPoint.y > endPoint.y) {
              controlPoints = [
                {x: startPoint.x, y: endPoint.y - 100},
                {x: endPoint.x, y: endPoint.y - 100},
                {x: endPoint.x, y: endPoint.y - 100}
              ]
            }
            console.log(controlPoints)
            graph.updateItem(this.edge, {
              target: model.id,
              controlPoints: controlPoints
            });
            this.edge = null
            this.addingEdge = false
          } else {
            console.log('--------2')
            // 点击节点，触发增加边
            this.edge = graph.addItem('edge', {
              source: model.id,
              target: point              
            });
            this.addingEdge = true
          }
        },
        onMousemove(ev) {
          const point = {x: ev.x, y: ev.y};
          if (this.addingEdge && this.edge) {
            // 增加边的过程中，移动时边跟着移动
            this.graph.updateItem(this.edge, {
              target: point
            });
          }
        }
      })
    },
    shapeHtml () {
      const g6Util = G6.Util
      G6.registerNode('nodeHtml', {
        // getAnchorPoints(cfg) {
        //   return  [            
        //     [0, 0.5], // 左侧中间
        //     [1, 0.5] // 右侧中间
        //   ]
        // },
        afterDraw(cfg, group) {
          const size = cfg.size || [100,100]
          const width = size[0]
          const height = size[1]
          const labelStyle = cfg.labelStyle
          const mainTitle = cfg.mainTitle || ''
          const title = cfg.title
          const html = g6Util.createDom('<div class="card-container">'
          +'<div class="main-text">'+mainTitle+'</div>'
          +'<div><span class="value-text">'+title+'</div>'
          +'</div>')
          const htmlShape = group.addShape('dom', {
            attrs: {
              x: -50,
              y: -50,
              width,
              height,
              html,
              stroke: cfg.stroke,
              fill: cfg.fill
            }
          })
          group.addShape('path', {
            attrs: {
              fill: '#cfe7ff',
              stroke: cfg.stroke              
            }
          })
          return htmlShape
        },
      }, 'circle')
    },
    edgeHvh() {
      G6.registerEdge('hvh', {
        draw(cfg, group) {
          console.log(cfg)
          console.log(group)
          // console.log(cfg.sPoint)          
          // const startPoint = cfg.controlPoints[0]
          // const endPoint = cfg.controlPoints[1]
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint
          // startPoint.x = (startPoint.x < endPoint.x) ? startPoint.x + 50 : startPoint.x - 50
          // console.log(startPoint)
          console.log(endPoint)
          const stroke = cfg.stroke || '#000'
          const shape = group.addShape('path', {
            attrs: {
              stroke: stroke,
              label: cfg.label,
              labelCfg: cfg.labelCfg,
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, endPoint.y],
                ['L', endPoint.x, endPoint.y]
              ]
            }
          });
          return shape;
        }
      });
    },
    edgePolyline() {
      G6.registerEdge('edgePolyline', {
        // getPath(points){
        //   console.log('-----------points')
        //   console.log(points)
        // }        
        // afterDraw(cfg, graph) {
        //   console.log('--------edgePolyline')
        //   console.log(cfg)
        //   // const shape = group.addShape('text', {
        //   //   attrs: {
        //   //     label: 'edge'
        //   //   }
        //   // })
        // }
      }, 'polyline')
    },
    addNode() {
      console.log(this.graph.getNodes())
      const nodeId = ('node' + this.graph.getNodes().length)
      this.graph.add('node', {id: nodeId, x: 450, y: 450, label: nodeId, mainTitle:'主标题', title: '副标题'})
      console.log(this.graph.getNodes())
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/stylus/common'

.aside{
  height: 100vh;
  width: 300px;
}
.header{
  height: 50px;
}
.main{
  width: calc(100vw - 300px);
  height: 100vh;
  overflow: hidden;
  padding 0
}
.card-container{
  text-align center
  width 100px
  height 100px
  border-radius 100%
  background #cfe7ff
  border 1px rgba(0,0,0,0) solid
  padding 0 15px
  box-sizing border-box
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.main-text {
  margin-top 15px
  border-bottom 2px #3086fb solid
  line-height 30px
  margin-bottom 5px
}
</style>
