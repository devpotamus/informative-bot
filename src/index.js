/*
 * External imports
 */

const Discord = require("discord.js");
const Dotenv = require('dotenv');

/*
 * Local imports
 */

// None for now

/*
 * Logic
 */

async function handleMessage(newMessage) {
    if (newMessage.author.bot) return;

    // lets store some basic info
    const {
        channel,
        content
    } = newMessage;

    let flags = await getFlags([client.user, channel]);

    if (!flags.has(2048)) return;
    if (!flags.has(8192)) return;
    if (!flags.has(65536)) return;

    newMessage.delete().catch(console.error);

    const botMessages = await getMessagesByType(channel);

    if (!botMessages || botMessages.length == 0) {
        channel.send(content);
    } else {
        const lander = botMessages[0];

        lander.edit(content).catch(console.error);
    }
}

async function getFlags(flagSource) {
    let flagsArray = [];

    if (flagSource instanceof Array) {
        let forArray = [];

        flagSource.forEach(function (source) {
            let options = {
                user: client.user,
                source: source
            };

            forArray.push(getFlagFromSource(options));
        });

        flagsArray = await Promise.all(forArray);
    } else {
        let options = {
            user: client.user,
            source: source
        };

        flagsArray.push(getFlagFromSource(options));
    }

    let flags = new Discord.Permissions();

    flagsArray.forEach(function (flag) {
        if (flag) {
            flags.add(flag);
        }
    });

    return flags;
}

async function getFlagFromSource(options) {
    if (options.source instanceof Discord.User) {
        return options.source.fetchFlags();
    } else if (options.source instanceof Discord.Channel) {
        return options.source.permissionsFor(options.user);
    } else {
        return null;
    }
}

async function getMessagesByType(channel) {
    function botFilter(msg) {
        return msg.author.bot;
    }

    const messages = (await channel.messages.fetch().catch(console.error)).array();

    return messages.filter(botFilter);
}

/*
 * Application start
 */

Dotenv.config();

const client = new Discord.Client();

client
    .on("message", handleMessage)
    .on("messageUpdate", handleMessage);

client
    .login(process.env.BOT_TOKEN)
    .catch(console.error);