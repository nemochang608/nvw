<template>
  <v-app-bar app class="bar" height="70">
    <v-row align="center">
      <v-col cols="2">
        <v-select
          :items="envList"
          v-model="selectedEnv"
          label="env" dense solo height="10" hide-details>
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-btn @click="triggerLoadTopology" height="30">Load</v-btn>
      </v-col>
      <v-col cols="1" md="1" sm="1">
        <nview-appbar-button
          :disabled="selectedEnv===''"
          :handlers="{click(e){registerDialog = true}}"
          >Register
        </nview-appbar-button>
        <nview-register-json-dialog
          @dialog-state-changed="(e) => registerDialog = e"
          v-bind="{recordingReport}"
          :env-name="selectedEnv"
          :show-dialog="registerDialog">
        </nview-register-json-dialog>
      </v-col>
      <v-col cols="1" md="1" sm="1">
        <nview-report-menu
          @report-name-changed="
            (e) => {
              $emit('report-name-changed', e);
              recordingReport=e; }"
          :env-name="selectedEnv"
        >
          <template v-slot:activator="{ on, attrs }">
            <nview-appbar-button
              :disabled="selectedEnv===''"
              v-bind="{handlers: on, attrs }"
              >Report{{recordingReport!=='' ? ` [Active report: ${recordingReport}]` : ''}}
            </nview-appbar-button>
          </template>
        </nview-report-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="triggerOpenNavigator"></v-app-bar-nav-icon>
    </v-row>
  </v-app-bar>
</template>

<script>
import NviewRegisterJsonDialog from './NviewRegisterJsonDialog.vue';
import NviewReportMenu from './NviewReportMenu.vue';
import NviewAppbarButton from '../parts/NviewAppbarButton.vue';
import asyncRepositoryFactory from '../../repositories/async/asyncRepositryFactory';

const asyncEnvListRepository = asyncRepositoryFactory.get('envList');

export default {
  mounted() {
    asyncEnvListRepository.sendMessage({});
    asyncEnvListRepository.onMessage((e) => { this.envList = e.list; });
  },
  components: {
    NviewRegisterJsonDialog,
    NviewReportMenu,
    NviewAppbarButton,
  },
  data() {
    return {
      envList: [],
      selectedEnv: '',
      registerDialog: false,
      recordingReport: '',
    };
  },
  watch: {
    selectedEnv(v) {
      this.$emit('env-selected', v);
    },
  },
  methods: {
    triggerOpenNavigator(v) {
      this.$emit('nav-button-pressed', v);
    },
    triggerLoadTopology() {
      this.$emit('load-button-pressed', this.selectedEnv);
    },
  },
};
</script>
