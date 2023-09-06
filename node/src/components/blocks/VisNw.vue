<template>
    <network ref="network" :nodes="nodes" :edges="edges" :options="options"
        :events="['selectNode', 'selectEdge', 'dragEnd']" @select-node="onNodeSelected"
        @select-edge="onEdgeSelected"
        @drag-end="onDragEnd"> </network>
</template>

<script>
import { Network } from 'vue-vis-network';
import lodash from 'lodash';
import asyncRepositoryFactory from '../../repositories/async/asyncRepositryFactory';

const asyncPacketCaptureRepository = asyncRepositoryFactory.get('packetCapture');

function processVisEdge(visedges) {
  const extraNodes = [];
  const extraEdges = [];
  let i = 0;
  visedges.forEach((edge) => {
    if (edge.nodes.length > 2) {
      extraNodes.push({
        id: `${edge.name}-link`, label: `${edge.name}-link`, shape: 'diamond', size: 10,
      });
      edge.nodes.forEach((x) => {
        i += 1;
        extraEdges.push({
          id: `${edge.name}#${i}`, from: `${edge.name}-link`, to: x, value: 3, title: `${edge.name}#${i}`,
        });
      });
    }
  });
  return { extraNodes, extraEdges };
}

function drawNetwork(c, n, e, o) {
  let nodes = n;
  let edges = e;
  const options = o;
  const component = c;

  const { extraNodes, extraEdges } = processVisEdge(edges);
  // nodes
  nodes = nodes.map((x) => ({ id: x.name, label: x.name, shape: 'square' }));
  // edges
  edges = edges.filter((x) => x.nodes.length === 2).map((x) => ({
    id: x.name, from: x.nodes[0], to: x.nodes[1], value: 3, title: x.name,
  }));

  component.nodes = nodes.concat(extraNodes);
  component.edges = edges.concat(extraEdges);
  const defaultOptions = component.options;
  const mergedOptions = lodash.merge(defaultOptions, options);
  mergedOptions.nodes.physics = true;
  component.options = mergedOptions;

  setTimeout(() => {
    const op = component.options;
    op.nodes.physics = false;
    component.options = op;
  }, 2000);
}

export default {
  watch: {
    nodes() {
      drawNetwork(this, this.nodes, this.edges);
    },
  },
  components: { Network },
  props: ['envName', 'reportName', 'nodes', 'edges'],
  data() {
    return {
      innerNodes: [],
      innerEdges: [],
      options: {
        nodes: {
          borderWidth: 4,
          physics: true,
        },
        interaction: {
          hover: true,
        },
      },
    };
  },
  methods: {
    onEdgeSelected(e) {
      const edge = this.edges.filter((x) => x.id === e.edges[0])[0];
      if (!e.edges[0].includes('#')) {
        asyncPacketCaptureRepository.sendMessage(
          {
            node: edge.from, bridge: e.edges[0], env: this.envname, report: this.current_report,
          },
        );
      } else {
        const nodeName = edge.from.endsWith('-link') ? edge.to : edge.from;
        asyncPacketCaptureRepository.sendMessage(
          {
            node: nodeName, bridge: edge.id.split('#')[0], env: this.envname, report: this.current_report,
          },
        );
      }
    },
    onNodeSelected() {},
    onDragEnd() {
      this.$refs.network.stabilize();
    },
  },
};

</script>
