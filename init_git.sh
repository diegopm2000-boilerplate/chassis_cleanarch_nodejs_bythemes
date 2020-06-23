#!/bin/sh

# Execute this script as << source ./init_git.sh >> to export variables to global environment outside the script scope

# Configuration Source
export BOOTSTRAP_CONFIG_SOURCE_APP="GIT"
env | grep '^BOOTSTRAP_CONFIG_SOURCE_APP='

# Spring Cloud Config Endpoint
export BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT="http://localhost:8888"
env | grep '^BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT='

# Configuration File
export BOOTSTRAP_CONFIG_FILE="identityservice-dev.json"
env | grep '^BOOTSTRAP_CONFIG_FILE='
