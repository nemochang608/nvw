<template>
  <nview-dialog
    :action-buttons="{
      'Upload': uploadJSON,
      'Generate template': generateJsonInfoTemplate,
      'Download latest': downloadLatestJsonInfoTemplate}"
    :dialog-title="`JSON info`"
    :action-in-progress="uploading"
    :action-successed-message="uploadSuccessedMessage"
    :action-failed-message="uploadFailedMessage"
    :show-dialog="showDialogInner"
    @dialog-state-changed="(v) => showDialogInner = v"
  >
    <nview-highlighted-textarea
      mode="javascript"
      ref="area"
      :input-value="jsonParam"
    ></nview-highlighted-textarea>
  </nview-dialog>
</template>

<script>
import NviewDialog from './shared/NviewDialog.vue';
import NviewHighlightedTextarea from '../parts/NviewHighlightedTextarea.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const paramRepository = axiosRepositoryFactory.get('param');
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
  methods: {
    uploadJSON() {
      this.uploading = true;
      const value = this.$refs.area.getValue();
      paramRepository.update(
        {
          env_name: this.envName,
          parameters: value,
        },
      ).then(() => {
        this.uploadSuccessedMessage = 'Successfully uploaded.';
        window.setTimeout(() => {
          this.uploadSuccessedMessage = '';
        }, 1000);
        if (this.recordingReport !== '') {
          reportEntryRepository.create(
            {
              report: this.recordingReport,
              entry_type: 'user-submit-config-parameter',
              content_text: value,
              meta_data: { },
            },
          );
        }
      }).catch((response) => {
        [this.uploadFailedMessage] = response.response.data.parameters;
        window.setTimeout(() => {
          this.uploadFailedMessage = '';
        }, 1000);
      }).finally(() => {
        this.uploading = false;
      });
    },
    generateJsonInfoTemplate() {
      const json = {
        // TODO: fix
        devices: this.nodes.reduce((a, b) => { const obj = a; obj[b.name] = {}; return obj; }, {}),
        common: {},
      };
      this.jsonParam = JSON.stringify(json, null, 2);
    },
    downloadLatestJsonInfoTemplate() {
      paramRepository.get(this.envName).then(
        (response) => {
          this.jsonParam = JSON.stringify(JSON.parse(response.data.parameters), null, 2);
        },
      );
    },
  },
  data() {
    return {
      showDialogInner: false,
      uploading: false,
      uploadSuccessedMessage: '',
      uploadFailedMessage: '',
      jsonParam: '',
    };
  },
  components: {
    NviewDialog,
    NviewHighlightedTextarea,
  },
  props: {
    recordingReport: {
      type: String,
      required: true,
    },
    envName: {
      type: String,
      required: true,
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
