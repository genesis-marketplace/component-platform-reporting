const { resolve } = require('node:path');
const { addUIDependency, addServerDependency, runPreRequisiteChecks } = require('@genesislcap/seed-utils');
const checks = require('./checks');
const versions = require('./versions.json');
const packageJson = require('./package.json');

const parseQueryList = (queryArray) => {
  if (!queryArray) {
    return "";
  }
  try {
    if (queryArray.length === 0) {
      return ""
    }
    return `listOf(${queryArray.map(query => `\"${query}\"`).join(", ")})`
  } catch (error) {
    console.error("Error parsing `reportingQueries` parameter as JSON:", error.message);
    return "";
  }
}

module.exports = async (data, utils) => {
  const { editJSONFile } = utils;
  const json = editJSONFile(packageJson);
  data.pbcVersion = json.get('version');
  data.date = Date();
  data.utils = utils;
  data.versions = versions;
  data.reportingQueriesKotlin = parseQueryList(data.reportingQueries)

  /**
   * Run checks on project
   */
  runPreRequisiteChecks(data, checks);

  addUIDependency(data, '@genesislcap/pbc-reporting-ui', versions.dependencies.pbcReporting);

  addServerDependency(data, {name: 'reporting'}, versions.dependencies.serverDepId);
};
