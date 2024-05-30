package global.genesis.reporting.eventhandler

import global.genesis.message.core.event.Event
import global.genesis.message.core.event.EventReply
import global.genesis.reporting.message.event.DeleteReport
import global.genesis.reporting.message.event.InsertReport
import global.genesis.reporting.message.event.UpdateReport
import global.genesis.testsupport.AbstractGenesisTestSupport
import global.genesis.testsupport.EventResponse
import global.genesis.testsupport.GenesisTestConfig
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test

class EventReportTest : AbstractGenesisTestSupport<EventResponse>(
    GenesisTestConfig {
        packageNames = mutableListOf("global.genesis.reporting", "global.genesis.eventhandler")
        genesisHome = "/GenesisHome/"
        parser = EventResponse
    }
) {

    @Test
    fun testInsertUpdateAndDelete() {

        runBlocking {

            val insertReport = Event(
                details = InsertReport("logs", null, null, null),
                messageType = "EVENT_SAVED_REPORTS_INSERT"
            )

            val insertResult: EventReply? = messageClient
                .suspendRequest(insertReport)
            val reportId = insertResult.assertedCast<EventReply.EventAck>().generated[0]["REPORT_ID"] as String

            val updateReport = Event(
                details = UpdateReport(reportId, "new_name", null, null, null),
                messageType = "EVENT_SAVED_REPORTS_UPDATE"
            )

            val updateResult: EventReply? = messageClient.suspendRequest(updateReport)
            updateResult.assertedCast<EventReply.EventAck>()

            val deleteReport = Event(
                details = DeleteReport(reportId),
                messageType = "EVENT_SAVED_REPORTS_DELETE"
            )

            val deleteResult: EventReply? = messageClient.suspendRequest(deleteReport)
            deleteResult.assertedCast<EventReply.EventAck>()
        }
    }
}
