package global.genesis.reporting.eventhandler

import global.genesis.commons.annotation.Module
import global.genesis.db.rx.entity.multi.RxEntityDb
import global.genesis.eventhandler.typed.rx3.Rx3EventHandler
import global.genesis.gen.dao.SavedReports
import global.genesis.message.core.event.Event
import global.genesis.message.core.event.EventReply
import global.genesis.reporting.message.event.InsertReport
import io.reactivex.rxjava3.core.Single
import org.joda.time.DateTime
import javax.inject.Inject

@Module
class EventReportInsert @Inject constructor(
    private val db: RxEntityDb
) : Rx3EventHandler<InsertReport, EventReply> {

    override fun messageType(): String = "SAVED_REPORTS_INSERT"

    override fun process(message: Event<InsertReport>): Single<EventReply> {

        val details = message.details

        val report = SavedReports {
            reportName = details.reportName
            reportColumns = details.reportColumns
            reportDatasource = details.reportDataSource
            reportDescription = details.reportDescription
            reportCreatedOn = DateTime.now()
            createdBy = message.userName
        }
        return db.insert(report).flatMap { result -> ack(createSavedReports(result.record)) }
    }
}
