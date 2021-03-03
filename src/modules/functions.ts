/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { Message } from '../classes/Message';
import { Queue } from '../classes/Queue';
import { Bot } from '../client/client';
import { Command } from '../interfaces/Command';
import { GuildSettings } from '../interfaces/GuildSettings';
import { Lyrics } from '../interfaces/Lyrics';

// THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
// And then they're stuck because the default settings are also gone.
// So if you do that, you're resetting your defaults. Congrats.

export const defaultSettings: GuildSettings = {
    prefix: '!',
    adminRole: 'Administrator',
    modRole: 'Moderator',
    embedColor: '#ff0000',
    welcomeChannel: 'welcome',
    welcomeMessage:
        'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
    welcomeEnabled: 'false',
    reddit: 'false',
    musicChannelId: '',
    musicMsgId: '',
    lyricsChannelId: '',
};

export const Functions = {
    /* PERMISSION LEVEL FUNCTION */
    permlevel: (client: Bot, message: Message): number => {
        let permlvl = 0;

        const permOrder = client.config.permLevels
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length) {
            const currentLevel = permOrder.shift()!;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    },
    /* GUILD SETTINGS FUNCTION */

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    getSettings: (client: Bot, guild: Guild): GuildSettings => {
        client.settings.ensure('default', defaultSettings);
        if (!guild) return client.settings.get('default')!;
        const guildConf = client.settings.get(guild.id) || {};
        return { ...client.settings.get('default')!, ...guildConf };
    },

    /*
    SINGLE-LINE AWAITMESSAGE
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
    awaitReply: async (
        msg: Message,
        question: string,
        limit = 60000,
    ): Promise<string> => {
        const filter = (m: Message) => m.author.id === msg.author.id;
        await msg.channel.send(question);
        const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: limit,
            errors: ['time'],
        });
        return collected.first()!.content;
    },

    loadCommand: async (
        client: Bot,
        commandName: string,
    ): Promise<boolean | string> => {
        try {
            client.logger(
                `Loading Command: ${
                    commandName.split('/').pop()?.split('.')[0]
                }`,
            );
            const props: Command = await import(commandName);
            client.commands.set(props.conf.name, props);
            props.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, props.conf.name);
            });
            return false;
        } catch (e) {
            client.logger(
                `Unable to load command ${commandName}: ${e}`,
                'error',
            );
            return e;
        }
    },

    unloadCommand: async (
        client: Bot,
        commandName: string,
    ): Promise<boolean | string> => {
        try {
            client.logger(`Unloading Command: ${commandName}`);
            let command;
            if (client.commands.has(commandName)) {
                command = client.commands.get(commandName);
            } else if (client.aliases.has(commandName)) {
                command = client.commands.get(client.aliases.get(commandName)!);
            }
            if (!command)
                return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
            const mod =
                require.cache[
                    require.resolve(`../commands/${command.conf.name}`)
                ];
            delete require.cache[
                require.resolve(`../commands/${command.conf.name}.js`)
            ];
            for (let i = 0; i < mod!.parent!.children.length; i++) {
                if (mod!.parent!.children[i] === mod) {
                    mod.parent!.children.splice(i, 1);
                    break;
                }
            }
            return false;
        } catch (e) {
            client.logger(
                `Unable to unload command ${commandName}: ${e}`,
                'error',
            );
            return e;
        }
    },

    /* Music player funtcions */

    musicUserCheck: (
        client: Bot,
        message: Message,
        queueNeeded: boolean,
    ): boolean => {
        if (!message.member!.voice.channel) {
            (message.channel as TextChannel).bulkDelete(1).then(() => {
                message.channel
                    .send(`You're not in a voice channel !`)
                    .then((msg) => msg.delete({ timeout: 3000 }));
            });
            return true;
        }
        if (
            message.guild!.me!.voice.channel &&
            message.member!.voice.channel.id !==
                message.guild!.me!.voice.channel.id
        ) {
            (message.channel as TextChannel).bulkDelete(1).then(() => {
                message.channel
                    .send(`You are not in the same voice channel!`)
                    .then((msg) => msg.delete({ timeout: 3000 }));
            });
            return true;
        }
        if (queueNeeded) {
            if (!client.player.getQueue(message)) {
                (message.channel as TextChannel).bulkDelete(1).then(() => {
                    message.channel
                        .send(`No music currently playing !`)
                        .then((msg) => msg.delete({ timeout: 3000 }));
                });
                return true;
            }
        }
        return false;
    },

    clearBanner: async (client: Bot, message: Message): Promise<void> => {
        const channel = await client.channels.fetch(
            message.settings.musicChannelId,
        );
        const msg = await (channel as TextChannel).messages.fetch(
            message.settings.musicMsgId,
        );

        const embed = new MessageEmbed()
            .setTitle('No song playing currently')
            .setImage(
                'https://bestbots.today/wp-content/uploads/2020/04/Music.png',
            )
            .setFooter(`Prefix for this server is: ${message.settings.prefix}`)
            .setColor(message.settings.embedColor);
        msg.edit('Queue:\n', embed);
    },

    queueMessage: (queue: Queue): string => {
        let text = 'Queue:\n';
        for (let i = queue.tracks.length - 1; i >= 1; i--) {
            text += `${i}. ${queue.tracks[i].title}\n`;
        }
        return text;
    },

    lyrics: async (
        client: Bot,
        songname: string,
        embedColor: string,
    ): Promise<MessageEmbed> => {
        const embed = client.embed({
            color: embedColor,
            timestamp: new Date(),
        });
        try {
            const lyrics: Lyrics = await (
                await import('@raflymln/musixmatch-lyrics')
            ).find(songname);
            if (lyrics.lyrics.length >= 2048) {
                embed.addField('⠀', lyrics.lyrics.slice(2030));
                lyrics.lyrics = lyrics.lyrics.slice(0, 2030);
            }
            return embed
                .setTitle(lyrics.title)
                .setURL(lyrics.url)
                .setDescription(lyrics.lyrics)
                .setAuthor(lyrics.artists)
                .setImage(lyrics.albumImg);
        } catch (e) {
            return embed.setDescription(e);
        }
    },
};
