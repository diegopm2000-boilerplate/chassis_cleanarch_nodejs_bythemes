#!/bin/sh

# Execute this script as << source ./init_yaml.sh >> to export variables to global environment outside the script scope

# Configuration Source
export BOOTSTRAP_CONFIG_SOURCE_APP="YAML_FILE"
env | grep '^BOOTSTRAP_CONFIG_SOURCE_APP='

# Spring Cloud Config Endpoint
export BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT="NONE"
env | grep '^BOOTSTRAP_CONFIG_SPRINGCFG_ENDPOINT='

# Configuration File
export BOOTSTRAP_CONFIG_FILE="chassis-cleanarch-dev.yaml"
env | grep '^BOOTSTRAP_CONFIG_FILE='

