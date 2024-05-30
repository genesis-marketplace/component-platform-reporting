ext.set("localDaogenVersion", "REPORTING")

plugins {
    `maven-publish`
    id("org.gradle.test-retry") version "1.5.8"
    id("com.jfrog.artifactory")
    id("org.sonarqube") version "5.0.0.4638"
}

sonarqube {
    properties {
        property("sonar.projectKey", "genesislcap_reporting-server")
        property("sonar.projectName", "pbc-reporting-server")
        property("sonar.organization", "genesislcap")
        property("sonar.host.url", "https://sonarcloud.io")
        property("sonar.sourceEncoding", "UTF-8")
    }
}

val testProperties = listOf(
    "DbLayer",
    "MqLayer",
    "DbHost",
    "DbUsername",
    "DbPassword",
    "AliasSource",
    "ClusterMode",
    "DictionarySource",
    "DbNamespace",
    "DbMode",
    "DbThreadsMax",
    "DbThreadsMin",
    "DbThreadKeepAliveSeconds",
    "DbSqlConnectionPoolSize",
    "DbQuotedIdentifiers",
    "SqlMaxParametersPerRequest"
)
val isCiServer = providers.environmentVariable("CI").isPresent
val os = org.gradle.nativeplatform.platform.internal.DefaultNativePlatform.getCurrentOperatingSystem()

val repoKey = buildRepoKey()
val artifactoryUsername = properties["genesisArtifactoryUser"].toString()
val artifactoryPassword = properties["genesisArtifactoryPassword"].toString()

project(":reporting-app") {
    sonarqube {
        properties {
            property("sonar.sources", "src/main")
        }
    }
}

subprojects {
    apply(plugin = "org.gradle.maven-publish")
    apply(plugin = "com.jfrog.artifactory")
    apply(plugin = "org.gradle.test-retry")

    tasks {

        withType<Copy> {
            duplicatesStrategy = DuplicatesStrategy.WARN
        }
        withType<Jar> {
            duplicatesStrategy = DuplicatesStrategy.WARN
        }
        withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
            kotlinOptions {
                freeCompilerArgs = listOf("-Xjsr305=strict", "-Xjvm-default=all")
                jvmTarget = "17"
            }
        }
        test {
            useJUnitPlatform() {
                if (project.hasProperty("category")) {
                    val categories = project.properties["category"] as String
                    includeTags(*categories.split(",").toTypedArray())
                }
            }

            // Add exports and opens so ChronicleQueue can continue working in JDK 17.
            // More info in: https://chronicle.software/chronicle-support-java-17/
            jvmArgs = jvmArgs!! + listOf(
                "--add-exports=java.base/jdk.internal.ref=ALL-UNNAMED",
                "--add-exports=java.base/sun.nio.ch=ALL-UNNAMED",
                "--add-exports=jdk.unsupported/sun.misc=ALL-UNNAMED",
                "--add-exports=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED",
                "--add-opens=jdk.compiler/com.sun.tools.javac=ALL-UNNAMED",
                "--add-opens=java.base/java.lang=ALL-UNNAMED",
                "--add-opens=java.base/java.lang.reflect=ALL-UNNAMED",
                "--add-opens=java.base/java.io=ALL-UNNAMED",
                "--add-opens=java.base/java.util=ALL-UNNAMED",
                "--add-opens=java.base/java.nio=ALL-UNNAMED" // this one is opened for LMDB
            )

            for (property in testProperties) {
                val value = providers.systemProperty(property).orNull ?: providers.gradleProperty(property).orNull
                if (value != null) {
                    inputs.property(property, value)
                    systemProperty(property, value)
                }
            }
            if (os.isMacOsX) {
                // Needed to guarantee FDB java bindings will work as expected in MacOS
                environment("DYLD_LIBRARY_PATH", "/usr/local/lib")
            }
            // UK Locale changed in recent Java versions and the abbreviation for September is now Sept instead of Sep.
            // This cases our DumpTableFormattedTest.test dump table formatted to fail. Setting to COMPAT mode allows
            // same behaviour as Java 8. We should deal with this at some point.
            // More info here: https://bugs.openjdk.org/browse/JDK-8256837
            // And here: https://bugs.openjdk.org/browse/JDK-8273437
            systemProperty("java.locale.providers", "COMPAT")
            if (!isCiServer) {
                systemProperty("kotlinx.coroutines.debug", "")
            }
            retry {
                if (!ext.has("noRetry")) maxRetries.set(5)
            }
        }
    }
    dependencies {
        testImplementation(kotlin("test"))
    }
}

tasks {
    assemble {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("assemble"))
        }
    }
    build {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("build"))
        }
    }
    clean {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("clean"))
        }
    }
    withType<Copy> {
        duplicatesStrategy = DuplicatesStrategy.WARN
    }

    jar {
        duplicatesStrategy = DuplicatesStrategy.WARN
    }

    this.dependencies {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("dependencies"))
        }
    }
}

allprojects {

    group = "global.genesis"

    java {
        toolchain {
            languageVersion.set(JavaLanguageVersion.of(17))
        }
    }

    repositories {
        mavenCentral()
        maven {
            val repoUrl = if(properties["clientSpecific"] == "true") {
                "https://genesisglobal.jfrog.io/genesisglobal/libs-release-client"
            } else {
                "https://genesisglobal.jfrog.io/genesisglobal/dev-repo"
            }
            url = uri(repoUrl)
            credentials {
                username = artifactoryUsername
                password = artifactoryPassword
            }
        }
        maven {
            url = uri("https://genesisglobal.jfrog.io/genesisglobal/$repoKey")
            credentials {
                username = artifactoryUsername
                password = artifactoryPassword
            }
        }
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
    }

    publishing {
        publications.create<MavenPublication>("maven") {
            from(components["java"])
        }
    }

}

artifactory {
    setContextUrl("https://genesisglobal.jfrog.io/genesisglobal")

    publish {
        repository {
            setRepoKey(buildRepoKey())
            setUsername(property("genesisArtifactoryUser").toString())
            setPassword(property("genesisArtifactoryPassword").toString())
        }
        defaults {
            publications("ALL_PUBLICATIONS")
            setPublishArtifacts(true)
            setPublishPom(true)
            isPublishBuildInfo = false
        }
    }
}

fun buildRepoKey(): String {
    val buildTag = buildTagFor(project.version.toString())
    return "libs-$buildTag-local"
}

fun buildTagFor(version: String): String =
    when (version.substringAfterLast('-')) {
        "SNAPSHOT" -> "snapshot"
        in Regex("""M\d+[a-z]*$""") -> "milestone"
        else -> "release"
    }

operator fun Regex.contains(s: String) = matches(s)

