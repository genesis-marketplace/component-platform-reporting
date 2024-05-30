package global.genesis.reporting.eventhandler

import global.genesis.commons.annotation.Module
import global.genesis.db.rx.entity.multi.RxEntityDb
import global.genesis.eventhandler.typed.rx3.Rx3EventHandler
import global.genesis.gen.dao.SavedReports
import global.genesis.message.core.event.Event
import global.genesis.message.core.event.EventReply
import global.genesis.reporting.message.event.DeleteReport
import io.reactivex.rxjava3.core.Single
import javax.inject.Inject

@Module
class EventReportDelete @Inject constructor(
    private val db: RxEntityDb
) : Rx3EventHandler<DeleteReport, EventReply> {
    override fun messageType(): String = "SAVED_REPORTS_DELETE"
    override fun process(message: Event<DeleteReport>): Single<EventReply> {

        val reportId = message.details.reportId
        return db.delete(SavedReports.ById(reportId)).flatMap { ack() }
    }
}
