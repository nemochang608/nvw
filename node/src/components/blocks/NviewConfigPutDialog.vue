<template>
  <nview-dialog
    :action-buttons="{'Put config': prepareConfig}"
    :dialog-title="`Edit Jinja2 template for configuration text`"
    :action-in-progress="uploadInProgress"
    :show-dialog="showDialogInner"
    @dialog-state-changed="(e)=>{this.dialog=e}"
  >
    <textarea id="jinja2"></textarea>
  </nview-dialog>
</template>

<script>
import NviewDialog from './shared/NviewDialog.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const configTemplateRepository = axiosRepositoryFactory.get('configTemplate');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

export default {
  watch: {
    showDialog(val) {
      this.showDialogInner = val;
    },
    showDialogInner(val) {
      this.$emit('dialogStateChanged', val);
    },
  },
  data() {
    return {
      uploadInProgress: true,
      showDialogInner: false,
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    NviewDialog,
  },
  methods: {
    prepareConfig() {
      this.uploadInProgress = true;
      const value = this.$cm_jinja2.getValue();
      configTemplateRepository.create(
        {
          env_name: this.envName,
          template_string: value,
        },
      ).then(() => {
        if (this.current_report !== null) {
          reportEntryRepository.create(
            {
              report: this.current_report,
              entry_type: 'user-submit-config-template',
              content_text: this.$cm_jinja2.getValue(),
              meta_data: {
                target_hosts: this.nodes.filter((x) => (x.checked)),
              },
            },
          );
        }
        this.$emit('configReady');
      }).catch(() => {
      }).finally(() => {
        this.uploading_config = false;
      });
    },
  },
};
</script>
