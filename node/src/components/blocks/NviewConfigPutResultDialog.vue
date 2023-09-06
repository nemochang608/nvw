<template>
  <nview-dialog
      :dialog_title="`Diff to previous configuration`"
      :dialog_in_progress="configuring_devices"
      :show_dialog="config_result_dialog"
      :close_handler="configResultDialogCloseHandler"
      @dialogStateChanged="(e)=>{this.config_result_dialog=e}"
  >
      <v-tabs
      background-color="accent-4"
      center-active
      v-model="config_result_tab"
      >
      <v-tab
          v-for="node in checked_nodes"
          @click="resultTabClickHandler(`${node.name}-result`)"
          :key="node.name"
      >{{ node.name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="config_result_tab">
      <v-tab-item
          v-for="node in checked_nodes"
          :key="node.name"
          class="tabitem2"
      >
          <textarea :id="node.name + '-result'" v-model="node.diff"></textarea>
      </v-tab-item>
      </v-tabs-items>
  </nview-dialog>
</template>
<script>
import NviewDialog from './shared/NviewDialog.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const configRepository = axiosRepositoryFactory.get('config');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

export default {
  components: { NviewDialog },
  methods: {
    putConfig() {
      this.nodes.filter((x) => (x.checked)).forEach((x) => {
        configRepository.update({})
          .then((response) => {
            this.checked_nodes.push({ name: x.name, diff: response.data.output });
            if (this.current_report !== null) {
              reportEntryRepository.create(
                {
                  report: this.current_report,
                  entry_type: 'device-update-config',
                  content_text: response.data.output,
                  meta_data: {
                    target_host: x.name,
                  },
                },
              );
            }
          });
      });
    },
    resultTabClickHandler(name) {
      window.setTimeout(() => {
        const textarea = document.getElementById(name);
        if (textarea.nextSibling !== null && !textarea.nextSibling.className.includes('CodeMirror')) {
          CodeMirror.fromTextArea(textarea, { lineNumbers: true });
        } else if (textarea.nextSibling === null) {
          CodeMirror.fromTextArea(textarea, { lineNumbers: true });
        }
      }, 200);
    },
  },
};
</script>
