import React, {
  useEffect
} from "react";
import G6 from "@antv/g6";
import './index.css'


// 节点与边静态数据
const data = {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      x: 150,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      label: '边标签',
    }
  ]
};

// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [300, 300],
  className: 'minimap',
  type: 'delegate',
});

function Chart1() {

  const initAntvG6 = () => {

    // 实例化图
    const graph = new G6.Graph({
      // fitView: true, // 适配大小
      container: "container",
      // width: 500,
      // height: 500,
      defaultNode: {
        type: "circle",
        size: [100],
        color: "#5B8FF9",
        style: {
          fill: "#9EC9FF",
          lineWidth: 3
        },
        labelCfg: {
          style: {
            fill: "#fff",
            fontSize: 20
          }
        }
      },
      defaultEdge: {
        style: {
          stroke: "#e2e2e2"
        }
      },
      modes: {
        default: [
          'drag-canvas',// 允许拖拽画布
          'zoom-canvas',  // 放缩画布
          'drag-node', // 拖拽节点
          {
            type: 'tooltip', // 提示框
            formatText(model) {
              // 提示框文本内容
              const text = 'label: ' + model.label + '<br/> class: ' + model.class;
              return text;
            },
          },
        ],
      },
      // 节点不同状态下的样式集合
      nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
          fill: 'lightsteelblue',
        },
        // 鼠标点击节点，即 click 状态为 true 时的样式
        click: {
          stroke: '#000',
          lineWidth: 3,
        },
      },
      // plugins: [minimap], // 将 minimap 实例配置到图上
    });
    // 鼠标进入节点
    graph.on('node:mouseenter', (e) => {
      console.log('鼠标进入:---->', e);
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
    });

    // 鼠标离开节点
    graph.on('node:mouseleave', (e) => {
      console.log('鼠标移出:---->', e);
      const nodeItem = e.item; // 获取鼠标离开的节点元素对象
      graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
    });

    graph.data(data);
    graph.render();
  }

  useEffect(() => {
    initAntvG6();
  }, [])

  return (
    <div id="container" style={{ width: '100%', height: '100%' }}></div>
  )
}

export default Chart1;