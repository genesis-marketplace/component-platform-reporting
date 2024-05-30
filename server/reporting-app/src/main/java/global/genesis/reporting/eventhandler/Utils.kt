package global.genesis.reporting.eventhandler

import global.genesis.gen.dao.SavedReports

fun createSavedReports(result: SavedReports): List<Map<String, String>> {

    return listOf(
        mapOf(
            "REPORT_ID" to result.reportId,
            "REPORT_NAME" to result.reportName,
            "CREATED_BY" to (result.createdBy ?: "null"),
            "REPORT_DESCRIPTION" to (result.reportDescription ?: "null"),
            "REPORT_COLUMN" to (result.reportColumns ?: "null"),
            "REPORT_CREATED_ON" to result.reportCreatedOn.toString(),
            "REPORT_DATASOURCE" to (result.reportDatasource ?: "null"),
        )
    )
}
