<template>
  <v-app>
    <nview-appbar
      @report-name-changed="(e) => editingReport = e"
      @env-selected="(e) => selectedEnv = e"
      @load-button-pressed="downloadNodeList"
      @nav-button-pressed="showNavigation = !showNavigation"
    ></nview-appbar>
    <v-main>
      <vis-nw
        class="main"
        ref="visnw"
        :envName="loadedEnv"
        :reportName="editingReport"
        v-bind="{nodes, edges}">
      </vis-nw>
      <nview-nav
        :env-name="loadedEnv"
        v-bind="{showNavigation, nodeList, editingReport}"
      ></nview-nav>
    </v-main>
  </v-app>
</template>
<style>
.main {
    height: 99%;
}
.tabitem {
  height: 65vh;
}
.CodeMirror {
  height: 100%;
  font-family: 'Roboto Mono';
}
</style>
<script>
import VisNw from './blocks/VisNw.vue';
import NviewAppbar from './blocks/NviewAppbar.vue';
import NviewNav from './blocks/NviewNav.vue';
import asyncRepositryFactory from '../repositories/async/asyncRepositryFactory';

const topologyRepository = asyncRepositryFactory.get('topology');

export default {
  data() {
    return {
      selectedEnv: '',
      loadedEnv: '',
      editingReport: '',
      showNavigation: false,
      nodeList: [],
      nodes: null,
      edges: null,
    };
  },
  methods: {
    downloadNodeList(env) {
      topologyRepository.sendMessage({ env });
      topologyRepository.onMessage((e) => {
        this.loadedEnv = env;
        this.nodeList = e.nodes.map(
          (x) => x.name,
        );
        this.nodes = e.nodes;
        this.edges = e.edges;
      });
    },
  },
  components: {
    VisNw,
    NviewAppbar,
    NviewNav,
  },
};
</script>
