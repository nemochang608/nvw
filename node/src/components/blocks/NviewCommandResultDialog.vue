<template>
  <nview-dialog
      :dialog_title="`Result of command '${command_input}'`"
      :dialog_in_progress="executing_command"
      :show_dialog="command_result_dialog"
      :close_handler="commandResultDialogCloseHandler"
      @dialogStateChanged="(e)=>{this.command_result_dialog=e}"
  >
      <v-tabs
      background-color="accent-4"
      center-active
      v-model="command_result_tab"
      >
      <v-tab
          v-for="node in checked_nodes"
          @click="resultTabClickHandler(`${node.name}-com-result`)"
          :key="node.name"
      >{{ node.name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="command_result_tab">
      <v-tab-item
          v-for="node in checked_nodes"
          :key="node.name"
          class="tabitem3"
      >
          <textarea :id="node.name + '-com-result'" v-model="node.result"></textarea>
      </v-tab-item>
      </v-tabs-items>
  </nview-dialog>
</template>

<script>
import NviewDialog from './shared/NviewDialog.vue';

export default {
  components: { NviewDialog },
  methods: {
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
