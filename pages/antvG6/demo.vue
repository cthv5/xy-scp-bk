<template lang="pug">
.content
  .padding
    el-button-group
      el-button(type="primary", size="small", icon="el-icon-plus", @click="addNode") 新增node
      //- el-button(type="primary", size="small", icon="el-icon-edit") 新增edge
      el-button(type="primary", size="small", icon="el-icon-delete", @click="delNode") 删除
      el-button(type="primary", size="small", icon="el-icon-edit", @click="sure") 确认
      el-button(type="primary", size="small", icon="el-icon-edit", @click="save") 保存
    el-input(v-model="val")
  .padding(id="mountNode")
</template>
<script>
export default {
  data () {
    return {
      graph: '',
      val: '',
      clickNode: '',
      saveData: {},
      data: {}
    }
  },
  mounted () {
    const defaultData = '{"nodes":[{"id":"name1","x":100,"y":150,"label":"333","mainTitle":"申请人","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"name2","x":400,"y":250,"label":"name2","mainTitle":"主管2","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"name3","x":250,"y":350,"label":"name3","mainTitle":"主管2","shape":"","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"name4","x":700,"y":350,"label":"name4","mainTitle":"主管3","shape":"","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"node4","x":259,"y":46,"label":"node4","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"node5","x":397,"y":49,"label":"node5","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}},{"id":"node6","x":524,"y":44,"label":"node6","fill":"#f2f2f2","color":"red","labelStyle":{"color":"#000"}}],"edges":[{"source":"name1","target":"name2","label":"edges1","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name1","target":"name3","label":"edges1","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name3","target":"name2","label":"edges1","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name2","target":"name4","label":"edges1","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name2","target":"node4","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name2","target":"node5","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}},{"source":"name2","target":"node6","size":2,"stroke":"#ccc","shape":"quadratic","labelCfg":{"refY":10,"position":"center","autoRotate":true},"style":{}}]}'   
    this.data = JSON.parse(defaultData)
    console.log(this.data)
    // this.data.anchors = [
    //   {id: 'a1', refNode: 'name1', shape: 'in', refX: 0, refY: 0.5, style: {stroke: 'red', fill: 'blue'}},
    //   {id: 'a2', refNode: 'name1', shape: 'out', refX: 1, refY: 0.5, style: {stroke: 'blue', fill: 'blue'}},
    //   {id: 'a1', refNode: 'name2', shape: 'in', refX: 0, refY: 0.5, style: {stroke: 'red', fill: 'blue'}},
    //   {id: 'a2', refNode: 'name2', shape: 'out', refX: 1, refY: 0.5, style: {stroke: 'blue', fill: 'blue'}}
    // ]
    // this.data.nodes.map((item) => {
    //   console.log(item)
    //   item.anchorPoints= [
    //     [0, 0.5, {id: 'a1', shape: 'in', style: {stroke: 'red', fill: 'blue'}}], 
    //     [1, 0.5, {id: 'a2', shape: 'out', style: {stroke: 'blue', fill: 'blue'}}]
    //   ]
    // })
    this.$nextTick(() => {
      this.initG6()
    })
  },
  methods: {
    initG6() {
      const grid = new G6Grid()
      const me = this      
      G6.registerNode('nodeCircle', {
        // 自定义节点
        getAnchorPoints(cfg) {
          return  [
            [0, 0.5], // 左侧中间
            [1, 0.5] // 右侧中间
          ]
        },
        draw(cfg, group) {
          console.log('-----cfg')
          console.log(cfg)
          const size = cfg.size || [150,150]
          const width = size[0]
          const height = size[1]
          const labelStyle = cfg.labelStyle
          const shape= group.addShape('path', {
            attrs: {
              fill: cfg.fill,
              stroke: cfg.stroke,
              path: [
                ['M', 0, 0 - height/2],
                ['L', width / 2, 0],
                ['L', 0, height/2],
                ['L', - width / 2, 0],
                ['Z']
              ]
            }
          })
          if (cfg.label) {
            group.addShape('text', {
              attrs: {
                x: 0,
                y: 0,
                textAlign: 'center',
                textBaseline: 'left',
                text: cfg.label,
                fill: labelStyle.color
              }
            })
            return shape
          }
        }
      })
      G6.registerEdge('hvh', {
        draw(cfg, group) {
          console.log(cfg)
          console.log(group)
          console.log(cfg.sPoint)          
          const startPoint = cfg.controlPoints[0]
          const endPoint = cfg.controlPoints[1]
          const stroke = cfg.stroke || '#000'
          const shape = group.addShape('path', {
            attrs: {
              stroke: stroke,
              label: cfg.label,
              labelCfg: cfg.labelCfg,
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y],
                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],
                ['L', endPoint.x, endPoint.y]
              ]
            }
          });
          return shape;
        }
      });
      const g6Util = G6.Util
      G6.registerNode('html', {
        draw(cfg, group) {
          const size = cfg.size || [150,150]
          const width = size[0]
          const height = size[1]
          const labelStyle = cfg.labelStyle
          const mainTitle = cfg.mainTitle
          const label = cfg.label
          const html = g6Util.createDom('<div class="card-container">'
          +'<h3 class="main-text">'+mainTitle+'</h3>'
          +'<p><span class="value-text">'+label+'</p>'
          +'</div>')
          const htmlShape = group.addShape('dom', {
            attrs: {
              width,
              height,
              html
            }
          })
          return htmlShape
        }
      }, 'rect')
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
            graph.updateItem(this.edge, {
              target: model.id
            });
            this.edge = null
            this.addingEdge = false
          } else {
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
      G6.registerBehavior('dbclick-update-label', {
        getEvents() {
          return {
            'node:dblclick': 'ondbClick',
            'edge:dblclick': 'ondbClick'
          }
        },
        ondbClick(ev) {
          me.clickNode = ev.item 
          const model = ev.item.getModel()
          me.val = model.label
          console.log(model.label)
        }
      })
      
      this.graph = new G6.Graph({
        // renderer: 'svg',
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
        defaultNode: { shape: 'hvh', fill: '#f2f2f2', color: 'red', labelStyle: {color: '#000'}},        
        defaultEdge: { 
          size: 2, 
          stroke: '#ccc', 
          shape: 'line', 
          labelCfg: {
            refY: 10, 
            position: 'center', 
            autoRotate:true
          },
          style: {}
        }
      })
      this.graph.data(this.data)
      this.graph.render()
      this.graph.setMode('drag') //切换mode
    },
    addNode() {
      console.log(this.graph.getNodes())
      const nodeId = ('node' + this.graph.getNodes().length)
      this.graph.add('node', {id: nodeId, x: 50, y: 50, label: nodeId})
      console.log(this.graph.getNodes())
    },
    sure() {
      this.graph.update(this.clickNode, {label: this.val})
    },
    delNode() {
      console.log(this.clickNode)
      this.graph.remove(this.clickNode)
    },
    save() {
      const nodes = []
      const edges = []
      this.graph.getNodes().map((item) => {
        nodes.push(item._cfg.model)
      })
      this.graph.getEdges().map((item) => {
        edges.push(item._cfg.model)
      })
      this.saveData = {
        nodes: nodes,
        edges: edges
      }
      console.log(JSON.stringify(this.saveData))
    }
  }
}
</script>
<style>
.card-container{  
  background: #ccc;
  border: 1px solid #DBDBDB;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
