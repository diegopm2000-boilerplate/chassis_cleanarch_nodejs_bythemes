#!/bin/sh

# Execute this script as source ./init_git.sh for export variables to global environment outside the script scope

# Configuration Source
export NODE_CONFIG_SOURCE_APP="GIT"
env | grep '^NODE_CONFIG_SOURCE_APP='

# Spring Cloud Config Endpoint
export NODE_CONFIG_SPRINGCFG_ENDPOINT="http://localhost:8888"
env | grep '^NODE_CONFIG_SPRINGCFG_ENDPOINT='

# Configuration File
export NODE_CONFIG_FILE="identityservice-dev.json"
env | grep '^NODE_CONFIG_FILE='
