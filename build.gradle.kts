plugins {
    id("global.genesis.pbc")
}

tasks.register("sonar") { }

tasks {
    val tasks = listOf("clean", "assemble", "check", "build", "sonar")
    for(taskName in tasks){
        named(taskName){
            gradle.includedBuilds.forEach {
                dependsOn(it.task(":$taskName"))
            }
        }
    }
}
