<template>
  <nview-dialog
    :dialog-title="`Report ${reportName}`"
    v-bind="{showDialog}"
    @dialog-state-changed="(e)=>{showDialogInner=e}"
  >
    <v-container style="height:100%;">
      <v-row style="min-height: 50%; max-height: 75%;" class="overflow-y-auto">
      <ul>
        <li v-for="entry, index in reportEntryList" :key="index">
          <nview-html-snippet v-if="entry.entry_type==='user-input-markdown'"
              :html="md2html(entry.content_text)"
              :meta="entry.meta_data"
              :date="entry.post_date"
          ></nview-html-snippet>
          <div v-if="entry.entry_type==='device-execute-command'">
              <p>Device '{{entry.meta_data.target_host}}' execute command:
              '{{entry.meta_data.command}}'</p>
              <pre>{{entry.content_text}}</pre>
          </div>
          <div v-if="entry.entry_type==='device-update-config'">
              <p>Device '{{entry.meta_data.target_host}}' has updated configuration</p>
              <pre>{{entry.content_text}}</pre>
          </div>
          <div v-if="entry.entry_type==='user-submit-config-parameter'">
              <p>User submit config parameter with following content</p>
              <pre>{{entry.content_text}}</pre>
          </div>
          <div v-if="entry.entry_type==='user-submit-config-template'">
              <p>User submit config template with following content</p>
              <pre>{{entry.content_text}}</pre>
          </div>
          <div v-if="entry.entry_type==='device-show-config'">
              <p>Current configuration of device '{{entry.meta_data.target_host}}'</p>
              <div style="max-height: 256px; overflow: scroll;">
              <pre>{{entry.content_text}}</pre>
              </div>
          </div>
          <div v-if="entry.entry_type==='user-start-packet-capture'">
              <p>User has started packet capture on
              node '{{entry.meta_data.node}}' link '{{entry.meta_data.edge}}'</p>
              <p><a :href="`/dl/${entry.meta_data.filename}`">
              {{entry.meta_data.filename}}</a></p>
          </div>
          <div v-if="entry.entry_type==='user-stop-packet-capture'">
              <p>User has stopped packet capture on
              node '{{entry.meta_data.node}}' link '{{entry.meta_data.edge}}'</p>
              <p><a :href="`/dl/${entry.meta_data.filename}`">
              {{entry.meta_data.filename}}</a></p>
          </div>
        </li>
      </ul>
      </v-row>
      <v-row
        width="100%"
        class="overflow-y-auto"
      >
        <v-card class="textarea-container">
          <v-card-text>
            <nview-highlighted-textarea
              :mode="`markdown`"
              :line-numbers="false"
              :input-value="markdownInput"
              ref="area"
            ></nview-highlighted-textarea>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row style="min-height: 64px;">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn @click="reportSubmitHandler">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </nview-dialog>
</template>

<style scoped>
.textarea-container{
  min-height: 128px;
  max-height: 20%;
  width: 100%;
  border-radius: 8px;
  border: 1px gray solid;
}
</style>

<script>
import NviewDialog from './shared/NviewDialog.vue';
import NviewHighlightedTextarea from '../parts/NviewHighlightedTextarea.vue';
import NviewHtmlSnippet from './NviewHtmlSnippet.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';
import Markdown from '../../plugins/markdown';

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
  components: {
    NviewDialog,
    NviewHtmlSnippet,
    NviewHighlightedTextarea,
  },
  methods: {
    md2html(md) {
      return Markdown.render(md);
    },
    reportSubmitHandler() {
      const markdownText = this.$refs.area.getValue();
      reportEntryRepository.create(
        {
          report: this.reportName,
          content_text: markdownText,
          entry_type: 'user-input-markdown',
          meta_data: null,
        },
      ).then(() => {
        this.markdownInput = '';
        reportEntryRepository.get(this.reportName)
          .then((response) => {
            this.$emit('report-entry-changed', response.data.reverse());
          });
      });
    },
  },
  data() {
    return {
      showDialogInner: false,
      markdownInput: '',
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    reportName: {
      type: String,
      required: true,
      default: '',
    },
    reportEntryList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
