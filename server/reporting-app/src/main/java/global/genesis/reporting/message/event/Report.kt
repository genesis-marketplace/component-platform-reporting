package global.genesis.reporting.message.event

data class InsertReport(
    val reportName: String,
    val reportDescription: String?,
    val reportDataSource: String?,
    val reportColumns: String?
)

data class UpdateReport(
    val reportId: String,
    val reportName: String,
    val reportDescription: String?,
    val reportDataSource: String?,
    val reportColumns: String?
)

data class DeleteReport(val reportId: String)
