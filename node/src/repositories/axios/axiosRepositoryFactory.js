import commandExecRepository from './commandExecRepository';
import configRepository from './configRepository';
import configTemplateRepository from './configTemplateRepository';
import paramRepository from './paramRepository';
import reportEntryRepository from './reportEntryRepository';
import reportRepository from './reportRepository';

const repositories = {
  commandExec: commandExecRepository,
  config: configRepository,
  configTemplate: configTemplateRepository,
  param: paramRepository,
  reportEntry: reportEntryRepository,
  report: reportRepository,
};

export default {
  get(name) { return repositories[name]; },
};
