package global.genesis.reporting.eventhandler

import global.genesis.commons.annotation.Module
import global.genesis.db.rx.entity.multi.RxEntityDb
import global.genesis.eventhandler.typed.rx3.Rx3EventHandler
import global.genesis.gen.dao.SavedReports
import global.genesis.message.core.event.Event
import global.genesis.message.core.event.EventReply
import global.genesis.reporting.message.event.UpdateReport
import io.reactivex.rxjava3.core.Single
import javax.inject.Inject

@Module
class EventReportUpdate @Inject constructor(
    private val db: RxEntityDb
) : Rx3EventHandler<UpdateReport, EventReply> {

    override fun messageType(): String = "SAVED_REPORTS_UPDATE"

    override fun process(message: Event<UpdateReport>): Single<EventReply> {
        val details = message.details

        return db.updateBy(SavedReports.byId(details.reportId)) {
            it.reportName = details.reportName
            it.reportColumns = details.reportColumns
            it.reportDescription = details.reportDescription
            it.reportDatasource = details.reportDataSource

        }.flatMap { result ->
            ack(createSavedReports(result.record))
        }
    }
}

