# informative-bot

a discord bot to update information blast channels with only one message.

## Hosted Instance

To add the bot to your server, navigate to [Bot Invite Link](https://discord.com/api/oauth2/authorize?client_id=777419195376861184&permissions=0&scope=bot)

## Self-hosted Instance

### Installation

```bash
# clone the repository
git clone git@github.com:devpotamus/informative-bot.git

# traverse to cloned repository
cd informative-bot

# install node dependencies
npm install
```

### Running the bot

NOTE: Before beginning a discord application should be configured and a token should be generated (this token is used later).

There are two ways to host the bot supported in this repository: 
* hosted locally
* hosted via Azure Container registry and Azure Container Instance.

To host locally:

```bash
# start the bot
npm start
```

To Host via Azure Container registry:

1) Configure an Azure Container Registry
2) Run the following script:

```bash
# traverse to scripts folder
cd scripts

# allow azure-task.sh to execute
chmod 755 azure-task.sh

# execute azure-task.sh
./azure-task.sh
```

NOTE: You will be prompted for information if you do not set environment variables when running the scripts. The following environment variables apply to the script:

```bash
TASK_NAME=""     # the task name
IMAGE_NAME=""    # the image name
ACR_NAME=""      # the azure container registry name
GIT_USER=""      # the git user used to access source repository
GIT_REPO=""      # the git repository the source is contained within
GIT_PAT=""       # the personal access token to access the repository instance
```

3) Configure an Azure Container Instance

NOTE: The following environment variable apply to the container environment

```bash
BOT_TOKEN=""    # the discord bot token
```

## Usage

Once the bot has been invited to your discord server, the bot will have no permissions allocated by default. To set permissions:
1) Navigate to a text channel
2) Edit the channel (click the COG and select 'Edit Channel'
3) Select permissions (left side menu)
4) Under Roles/Members click add and select the bot
5) Give the bot the following permissions:
    * Read Messages
    * Send Messages
    * Manage Messages
    * Read Message History

At this point send a message in the text channel and the bot should either create a new message (deleting the user message) or update the bot message (deleting the user message).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.