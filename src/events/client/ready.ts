import { RunFunction } from '../../interfaces/Event';
export const name = 'ready';
export const run: RunFunction = async (client) => {
    client.logger(
        `${client.user?.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`,
        'ready',
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    client.user?.setActivity(`${client.settings.get('default')!.prefix}help`, {
        type: 'PLAYING',
    });
};
