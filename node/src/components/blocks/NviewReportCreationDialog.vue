<template>
  <v-dialog v-model="showDialogInner">
    <v-card>
      <v-card-text>
      <v-text-field
        v-model="reportName"
        :counter="50"
        label="Name"
        required
      ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <nview-simple-button
          :handlers="{click(e){createReport()}}"
          >Create</nview-simple-button>
        <nview-simple-button
          :handlers="{click(e){showDialogInner = false}}"
          >Close</nview-simple-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NviewSimpleButton from '../parts/NviewSimpleButton.vue';
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const reportRepository = axiosRepositoryFactory.get('report');

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
    createReport() {
      if (this.reportName !== '') {
        reportRepository.create({
          env_name: this.envName,
          report_name: this.reportName,
        }).then(() => {
          this.reportName = '';
          this.showDialogInner = false;
        });
      }
    },
  },
  data() {
    return {
      showDialogInner: false,
      reportName: '',
    };
  },
  props: {
    envName: {
      type: String,
      required: true,
    },
    showDialog: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { NviewSimpleButton },
};
</script>
