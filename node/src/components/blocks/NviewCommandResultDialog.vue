<template>
  <nview-dialog
    v-bind="{showDialog}"
    dialog-title="Result of command"
    @dialog-state-changed="(e)=>{showDialogInner=e}"
  >
      <v-tabs
      background-color="accent-4"
      center-active
      v-model="activeTabName"
      >
        <v-tab v-for="nodeName in selectedNodes"
          @click="h(nodeName)"
          :key="nodeName"
          >{{ nodeName }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTabName">
      <v-tab-item
        v-for="nodeName in selectedNodes"
        :key="nodeName" class="tabitem"
      >
        <nview-highlighted-textarea
          :id="nodeName"
          :ref="nodeName"
          :line-numbers="true"
        ></nview-highlighted-textarea>
      </v-tab-item>
      </v-tabs-items>
  </nview-dialog>
</template>

<script>
import NviewDialog from './shared/NviewDialog.vue';
import NviewHighlightedTextarea from '../parts/NviewHighlightedTextarea.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

export default {
  watch: {
    showDialog(val) {
      // timeout 必要
      setTimeout(
        () => { this.showDialogInner = val; },
        300,
      );
    },
    showDialogInner(val) {
      this.$emit('dialog-state-changed', val);
    },
  },
  props: {
    envName: {
      type: String,
      required: true,
    },
    showDialog: {
      type: Boolean,
      required: true,
    },
    editingReport: {
      type: String,
      required: true,
    },
    selectedNodes: {
      type: Array,
      required: true,
    },
    commandResult: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      showDialogInner: false,
      downloadInProgress: false,
      activeTabName: null,
    };
  },
  components: {
    NviewDialog,
    NviewHighlightedTextarea,
  },
  methods: {
    h(nodeName) {
      if (this.$refs[nodeName][0].getValue() === '') {
        console.log(this.commandResult)
        this.$refs[nodeName][0].inputValue = this.commandResult.filter(x=>(x.name===nodeName))[0].result
      }
    },
  },
};
</script>
