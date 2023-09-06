<template>
  <v-navigation-drawer
    v-model="showNavigationInner" absolute right width="20%"
  >
    <v-subheader height="10%">Devices<v-spacer></v-spacer>
      <nview-simple-button
        v-if="selecting"
        :handlers="{click(e){selectedNodes = nodeList}}"
        >Select All
      </nview-simple-button>
      <nview-simple-button
        v-if="selecting"
        :handlers="{click(e){selectedNodes = []}}"
        >Reset
      </nview-simple-button>
      <nview-simple-button
        :handlers="{click(e){selecting = !selecting; selectedNodes = []}}"
        >{{selecting?'Done':'Edit'}}
      </nview-simple-button>
    </v-subheader>
    <v-list flat nav dense class="overflow-y-auto" height="85%" :disabled="!selecting">
      <v-list-item-group multiple v-model="selectedNodes">
        <v-list-item v-for="nodeName in nodeList" :key="nodeName" :value="nodeName">
          <template v-slot="{active}">
            <v-list-item-action v-if="selecting">
              <v-checkbox :input-value="active" v-show="selecting" hide-details></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ nodeName }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-container height="8%">
      <v-row v-show="selecting">
        <v-col>
          <nview-simple-button
            @click.stop="commandInputDialog"
            :disabled="selectedNodes.length===0"
            >Execute
          </nview-simple-button>
        <!--
          <nview-command-input-dialog
            :showDialog="commandInputDialog">
          </nview-command-input-dialog>
          <nview-command-result-dialog></nview-command-result-dialog>
        -->
        </v-col>
        <v-col>
          <nview-simple-button
            @click.stop="configPutDialog = true"
            :disabled="selectedNodes.length===0"
            >Configure
          </nview-simple-button>
        <!--
          <nview-config-put-dialog
            @config-ready="configPutDialog = false; configPutResultDialog = true"
            :showDialog="configPutDialog">
          </nview-config-put-dialog>
          <nview-config-put-result-dialog></nview-config-put-result-dialog>
        -->
        </v-col>
        <v-col>
          <nview-simple-button
            :handlers="{click(e){e.stopImmediatePropagation(); configViewDialog = true}}"
            :disabled="selectedNodes.length===0"
          >View
          </nview-simple-button>
          <nview-config-view-dialog
            @dialog-state-changed="(e)=>configViewDialog = e"
            :showDialog="configViewDialog"
            v-bind="{selectedNodes, editingReport, envName}">
          </nview-config-view-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import NviewSimpleButton from '../parts/NviewSimpleButton.vue';
import NviewConfigViewDialog from './NviewConfigViewDialog.vue';/*
import NviewConfigPutDialog from './NviewConfigPutDialog.vue';
import NviewConfigPutResultDialog from './NviewConfigPutResultDialog.vue';
import NviewCommandInputDialog from './NviewCommandInputDialog.vue';
import NviewCommandResultDialog from './NviewCommandResultDialog.vue'; */

export default {
  watch: {
    showNavigationInner(v) {
      this.$emit('navigation-state-changed', v);
    },
    showNavigation(v) {
      this.showNavigationInner = v;
    },
  },
  props: {
    envName: {
      type: String,
      required: true,
    },
    editingReport: {
      type: String,
      required: true,
    },
    nodeList: {
      type: Array,
      required: true,
    },
    showNavigation: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      showNavigationInner: false,
      selecting: false,
      nodes: [],
      selectedNodes: [],
      configPutDialog: false,
      configPutResultDialog: false,
      configViewDialog: false,
      commandInputDialog: false,
    };
  },
  components: {
    NviewSimpleButton,
    NviewConfigViewDialog, /*
    NviewConfigPutDialog,
    NviewConfigPutResultDialog,
    NviewCommandInputDialog,
    NviewCommandResultDialog, */
  },
};
</script>
