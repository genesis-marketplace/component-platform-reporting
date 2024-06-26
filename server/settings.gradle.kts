
rootProject.name = "genesisproduct-reporting"

pluginManagement {
    pluginManagement {
        val genesisVersion: String by settings

        plugins {
            id("global.genesis.settings") version genesisVersion
            id("com.jfrog.artifactory") version "5.1.13"
        }
    }

    repositories {
        mavenCentral()
        gradlePluginPortal()
        maven {
            url = uri("https://genesisglobal.jfrog.io/genesisglobal/dev-repo")
            credentials {
                username = extra.properties["genesisArtifactoryUser"].toString()
                password = extra.properties["genesisArtifactoryPassword"].toString()
            }
            content {
                fun disableIfTrue(
                    property: String,
                    moduleRegex: String,
                ) {
                    if (extra.properties[property] == "true") excludeModuleByRegex("global.genesis", moduleRegex)
                }

                disableIfTrue("localGenesis", "genesis-(?!crowley)[\\w-]+")
                disableIfTrue("localAuth", "auth-[\\w-]+")
                disableIfTrue("localFix", "fix-[\\w-]+")
                disableIfTrue("localMarketData", "market-data-[\\w-]+")
                disableIfTrue("localElektron", "elektron-[\\w-]+")
                disableIfTrue("localRefData", "ref_data_app-[\\w-]+")
                disableIfTrue("localDeployPlugin", "deploy-gradle-plugin")
                disableIfTrue("localCrowley", "genesis-crowley-[\\w-]+")
            }
        }
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
    }
}

plugins {
    id("global.genesis.settings")
}

genesis {
    projectType = PBC
}


include("reporting-app")
