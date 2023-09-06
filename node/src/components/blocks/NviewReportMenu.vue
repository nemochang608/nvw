<template>
  <nview-dropdown-menu
    :menu-items="reportMenuItems"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot
        name="activator"
        v-bind="{ on, attrs }"
        :on="{click:(e)=>{on.click(e); downloadReportList(e)}}"></slot>
    </template>

    <template v-slot:append>
      <nview-report-creation-dialog
        @dialog-state-changed="(e) => creationDialog = e"
        @report-name-changed="(e) => $emit('report-name-changed', e)"
        @report-entry-changed="(e) => reportEntryList = e"
        :show-dialog="creationDialog"
        :env-name="envName"
      ></nview-report-creation-dialog>
      <nview-report-edit-dialog
        @dialog-state-changed="(e) => editDialog = e"
        v-bind="{reportEntryList, envName, reportName: editingReport}"
        :show-dialog="editDialog"
      ></nview-report-edit-dialog>
    </template>
  </nview-dropdown-menu>
</template>

<script>
import NviewDropdownMenu from './shared/NviewDropdownMenu.vue';
import NviewReportCreationDialog from './NviewReportCreationDialog.vue';
import NviewReportEditDialog from './NviewReportEditDialog.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const reportRepository = axiosRepositoryFactory.get('report');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

export default {
  methods: {
    downloadReportList() {
      reportRepository.get(this.envName).then((response) => {
        this.reportList = response.data.map((x) => x.report_name);
      });
    },
    downloadReportEntryList(reportName) {
      reportEntryRepository.get(reportName)
        .then((response) => {
          this.reportEntryList = response.data.reverse();
        });
    },
  },
  data() {
    return {
      reportList: [],
      reportEntryList: [],
      creationDialog: false,
      editDialog: false,
      recordingReport: null,
      editingReport: '',
    };
  },
  props: {
    envName: {
      type: String,
      required: true,
    },
  },
  computed: {
    reportMenuItems() {
      return {
        New: {
          childItems: null,
          handler: () => {
            this.creationDialog = true;
          },
        },
        Start: {
          childItems: this.reportList.reduce((o, reportName) => {
            const obj = o;
            obj[reportName] = {
              childItems: null,
              handler: () => {
                this.recordingReport = reportName;
                this.$emit('report-name-changed', reportName);
              },
            };
            return obj;
          }, {}),
        },
        Stop: {
          childItems: null,
          handler: () => {
            this.recordingReport = '';
            this.$emit('report-name-changed', '');
          },
        },
        Edit: {
          childItems: this.reportList.reduce((o, reportName) => {
            const obj = o;
            obj[reportName] = {
              childItems: null,
              handler: () => {
                this.editDialog = true;
                this.editingReport = reportName;
                this.downloadReportEntryList(reportName);
              },
            };
            return obj;
          }, {}),
        },
        Download: {
          childItems: this.reportList.reduce((o, reportName) => {
            const obj = o;
            obj[reportName] = {
              childItems: null,
              handler: () => {
                reportRepository.download(reportName);
              },
            };
            return obj;
          }, {}),
        },
      };
    },
  },
  components: {
    NviewDropdownMenu,
    NviewReportCreationDialog,
    NviewReportEditDialog,
  },
};
</script>
