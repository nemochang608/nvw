<template>
  <nview-dialog
    v-bind="{showDialog}"
    @dialog-state-changed="(e)=>{showDialogInner=e}"
    :dialog-title="`View configuration text for each node`"
    :action-in-progress="downloadInProgress"
  >
    <v-tabs
      background-color="accent-4"
      center-active
      v-model="activeTabName"
    >
        <!-- $refs[nodeName].getValue()!=='' && downloadConfig(nodeName) -->
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

const configRepository = axiosRepositoryFactory.get('config');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

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
      if (this.$refs[nodeName][0].getValue() === '') this.downloadConfig(nodeName);
    },
    downloadConfig(deviceName) {
      this.downloadInProgress = true;
      configRepository.get(this.envName, deviceName)
        .then((response) => {
          this.$refs[deviceName][0].inputValue = response.data.config_text;
          this.downloadInProgress = false;

          if (this.editingReport !== '') {
            reportEntryRepository.create(
              {
                report: this.edtingReport,
                entry_type: 'device-show-config',
                content_text: response.data.config_text,
                meta_data: {
                  target_host: deviceName,
                },
              },
            );
          }
        });
    },
  },
};
</script>
