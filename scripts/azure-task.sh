#! /bin/bash

#TASK_NAME=
#IMAGE_NAME=
#ACR_NAME=
#GIT_USER=
#GIT_REPO=
#GIT_PAT=

if [ -z "$(command which az)" ]; then
    echo "The Azure cli needs to be installed"
    exit
fi

if [ -z "${TASK_NAME}" ]; then
    echo "What is the Task name?"
    read TASK_NAME
fi

if [ -z "${IMAGE_NAME}" ]; then
    echo "What is the Image name?"
    read IMAGE_NAME
fi

if [ -z "${ACR_NAME}" ]; then
    echo "What is the ACR name?"
    read ACR_NAME
fi

if [ -z "${GIT_USER}" ]; then
    echo "What is the git user used to access repository?"
    read GIT_USER
fi

if [ -z "${GIT_REPO}" ]; then
    echo "What git repository should be accessed?"
    read GIT_REPO
fi

if [ -z "${GIT_PAT}" ]; then
    echo "What is the personal access token?"
    read GIT_PAT
fi

az login

az acr task create \
    --registry $ACR_NAME \
    --name $TASK_NAME \
    --image $IMAGE_NAME:{{.Run.ID}} \
    --context https://github.com/$GIT_USER/$GIT_REPO.git \
    --file Dockerfile \
    --git-access-token $GIT_PAT
