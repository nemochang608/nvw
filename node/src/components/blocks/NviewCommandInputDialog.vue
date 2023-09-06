<template>
  <v-dialog v-model="command_input_dialog">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="command_input"
          :counter="50"
          label="Command"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text color="blue darken-1"
          @click="executeCommand"
        >Execute</v-btn>
        <v-btn
          text color="blue darken-1"
          @click="command_input_dialog = !command_input_dialog"
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosRepositoryFactory from '../../repositories/axios/axiosRepositoryFactory';

const commandExecRepository = axiosRepositoryFactory.get('commandExec');
const reportEntryRepository = axiosRepositoryFactory.get('reportEntry');

export default {
  methods: {
    executeCommand() {
      const command = this.command_input;

      this.command_input_dialog = false;
      this.command_result_dialog = true;
      this.nodes.filter((x) => (x.checked)).forEach((x) => {
        commandExecRepository.create(
          this.envName,
          x.name,
          { command },
        )
          .then((response) => {
            this.checked_nodes.push({ name: x.name, result: response.data.output });
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
          });
      });
    },
  },
};
</script>
