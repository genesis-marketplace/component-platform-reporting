module.exports = async (inquirer, prevAns = {}) => await prompts(inquirer, prevAns);

const parseQueryList = (reportingQueries) => {
    if (!reportingQueries){
        return [];
    }
    try {
        return JSON.parse(reportingQueries);
    } catch (error) {
        console.error("Error parsing `reportingQueries` parameter as JSON:", error.message);
        return [];
    }
}

const prompts = async (inquirer, prevAns) => {
    const {
        reportingQueries: reportingQueries = prevAns.reportingQueries
    } = await inquirer.prompt([
        {
            name: 'reportingQueries',
            type: 'input',
            message: 'Enter the query names that users can use to create reports (config in json format)',
            default: '[]',
            when: !prevAns.reportingQueries
        }
    ]);
    return {
        reportingQueries: parseQueryList(reportingQueries)
    }
}
