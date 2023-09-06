<template>
  <div>
    <v-dialog v-model="showDialogInner" min-width="800px" width="80vw">
      <v-card height="90vh">
        <v-progress-linear
          v-show="actionInProgressInner"
          color="deep-purple" height="10"
          indeterminate
        ></v-progress-linear>
        <v-card-title class="text-h5 lighten-2">{{ dialogTitle }}</v-card-title>
        <v-card-text class="card-text-container">
          <slot></slot>
        </v-card-text>
        <v-card-text v-show="actionSuccessedMessage!==''" class="green--text"
          >{{ actionSuccessedMessage }}
        </v-card-text>
        <v-card-text v-show="actionFailedMessage!==''" class="red--text"
          >{{ actionFailedMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <nview-simple-button
            v-for="handler, label in actionButtons"
            :key="label"
            :handlers="{click(e){handler(e)}}"
            >{{label}}
          </nview-simple-button>
          <nview-simple-button
            :handlers="{click(e){showDialogInner = false}}"
            >Close
          </nview-simple-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.card-text-container {
  height: 80vh;
}
</style>

<script>
import NviewSimpleButton from '../../parts/NviewSimpleButton.vue';

export default {
  watch: {
    showDialogInner(val) {
      this.$emit('dialog-state-changed', val);
      if (val === false) {
        this.actionInProgressInner = false;
        this.onClosed();
      } else {
        setTimeout(() => (this.onActivated()), 300);
      }
    },
    showDialog(val) {
      this.showDialogInner = val;
    },
    actionInProgress(val) {
      this.actionInProgressInner = val;
    },
  },
  props: {
    showDialog: {
      type: Boolean,
      required: false,
      default: false,
    },
    onActivated: {
      type: Function,
      required: false,
      default: () => {},
    },
    onClosed: {
      type: Function,
      required: false,
      default: () => {},
    },
    dialogTitle: {
      type: String,
      required: true,
    },
    actionButtons: {
      type: Object,
      required: false,
      default: null,
    },
    actionInProgress: {
      type: Boolean,
      required: false,
      default: false,
    },
    actionSuccessedMessage: {
      type: String,
      required: false,
      default: '',
    },
    actionFailedMessage: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      showDialogInner: false,
      actionInProgressInner: false,
    };
  },
  components: { NviewSimpleButton },
};
</script>
