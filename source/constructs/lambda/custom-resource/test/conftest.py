# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

import os

import pytest


@pytest.fixture(autouse=True)
def default_environment_variables():
    """Mocked AWS evivronment variables such as AWS credentials and region"""
    os.environ["AWS_ACCESS_KEY_ID"] = "mocked-aws-access-key-id"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "mocked-aws-secret-access-key"
    os.environ["AWS_SESSION_TOKEN"] = "mocked-aws-session-token"
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
    os.environ["AWS_REGION"] = "us-east-1"
    os.environ["SOLUTION_VERSION"] = "v1.0.0"
    os.environ["SOLUTION_ID"] = "SO8025"

    os.environ["WEB_BUCKET_NAME"] = "solution-web-bucket"
    os.environ["API_ENDPOINT"] = "https:/solution.xxx.amazonaws.com/graphql"
    os.environ["USER_POOL_ID"] = "abc"
    os.environ["USER_POOL_CLIENT_ID"] = "abcd"
    os.environ["OIDC_PROVIDER"] = ""
    os.environ["OIDC_CLIENT_ID"] = ""
    os.environ["OIDC_CUSTOMER_DOMAIN"] = ""
    os.environ["AUTHENTICATION_TYPE"] = "AMAZON_COGNITO_USER_POOLS"
    os.environ["CLOUDFRONT_URL"] = "solution.cloudfront.net"
    os.environ["DEFAULT_LOGGING_BUCKET"] = "solution-bucket"
    os.environ["ACCESS_LOGGING_BUCKET"] = "solution-logging-bucket"
    os.environ["OPENSEARCH_MASTER_ROLE_ARN"] = "OPENSEARCH_MASTER_ROLE_ARN"
    os.environ["ACCESS_LOGGING_BUCKET"] = "solution-logging-bucket"
    os.environ["OPENSEARCH_DOMAIN_TABLE"] = "OPENSEARCH_DOMAIN_TABLE"

    os.environ["EKS_DEPLOY_KIND_TABLE"] = "LogAgentEKSDeploymentKindTable"
    os.environ["EKS_LOG_SOURCE_TABLE"] = "EKSClusterLogSourceTable"
    os.environ["APP_PIPELINE_TABLE"] = "AppPipelineTable"
    os.environ["PIPELINE_TABLE"] = "PipelineTable"
    os.environ["SUB_ACCOUNT_LINK_TABLE"] = "SubAccountLinkTable"
