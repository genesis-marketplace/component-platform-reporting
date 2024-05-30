dependencies {
    implementation(genesis("eventhandler"))
    implementation(genesis("pal-dataserver"))
    implementation(genesis("pal-requestserver"))
    testImplementation(genesis("testsupport"))
    genesisGeneratedCode(withTestDependency = true)
}

description = "reporting-app"

sourceSets {
    main {
        resources {
            srcDirs("src/main/resources", "src/main/genesis")
        }
    }
}
