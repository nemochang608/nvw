<template>
  <nview-dialog
    v-bind="{showDialog}"
    @dialog-state-changed="(e)=>{showDialogInner=e}"
    :dialog-title="`Execute Command`"
    width="40vw"
    min-width="400px"
    height="300px"
    :action-buttons="{Send(e){executeCommand()}}"
  >
    <v-text-field
      v-model="commandInput"
      :counter="50"
      label="Command"
      required
    ></v-text-field>
  </nview-dialog>
</template>

<script>
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const commandExecRepository = axiosRepositoryFactory.get('commandExec');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

import NviewDialog from './shared/NviewDialog.vue';

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
      commandInput: '',
    };
  },
  components: {
    NviewDialog,
  },
  methods: {
    executeCommand() {
      const command = this.commandInput;

      this.showDialogInner = false;

      this.selectedNodes.forEach((x) => {
        commandExecRepository.create(
          this.envName,
          x,
          { command },
        )
        .then((response) => {
          this.$emit('command-executed', { name: x, result: response.data.output });
/*

            if (this.current_report !== null) {
              reportEntryRepository.create(
                {
                  report: this.current_report,
                  entry_type: 'device-execute-command',
                  content_text: response.data.output,
                  meta_data: {
                    target_host: x.name,
                    command,
                  },
                },
              );
            }
*/
        });
      });
    },
  },
};
</script>
