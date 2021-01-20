module.exports = async (client, message) => {
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await channel.messages.fetch(message.settings.musicMsgId);
    try {
        await msg.react('⏹');
        await msg.react('⏯');
        await msg.react('⏭');
    }
    catch (error) {
        client.logger.error(error);
    }
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var musicReactCollector = msg.createReactionCollector(filter);
    client.player.getQueue(message).collector = musicReactCollector;
    musicReactCollector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name) {
            case '⏭':
                client.player.skip(message);
                reaction.users.remove(user).catch(console.error);
                message.channel
                    .send(`${user.username} ⏩ skipped the song !`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                break;
            case '⏯':
                reaction.users.remove(user).catch(console.error);
                if (!client.player.getQueue(message).paused) {
                    client.player.pause(message);
                    message.channel
                        .send(`${user.username} ⏸ paused the music !`)
                        .then((msg) => msg.delete({ timeout: 3000 }))
                        .catch(console.error);
                }
                else {
                    client.player.resume(message);
                    message.channel
                        .send(`${user} ▶ resumed the music !`)
                        .then((msg) => msg.delete({ timeout: 3000 }))
                        .catch(console.error);
                }
                break;
            case '⏹':
                reaction.users.remove(user).catch(console.error);
                client.player.stop(message);
                message.channel
                    .send(`${user.username} ⏹ stopped the music!`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                musicReactCollector.stop();
                client.clearBanner(client, message);
                break;
            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    musicReactCollector.on('end', () => { });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWVDcmVhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGxheWVyRXZlbnRzL3F1ZXVlQ3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUN2QyxJQUFJLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0UsSUFBSSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BFLElBQUk7UUFDQSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7SUFDRCxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3RFLElBQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztJQUNoRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFF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QztBQUM1QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQsIG1lc3NhZ2UpID0+IHtcbiAgICBsZXQgY2hhbm5lbCA9IGF3YWl0IGNsaWVudC5jaGFubmVscy5mZXRjaChtZXNzYWdlLnNldHRpbmdzLm11c2ljQ2hhbm5lbElkKTtcbiAgICBsZXQgbXNnID0gYXdhaXQgY2hhbm5lbC5tZXNzYWdlcy5mZXRjaChtZXNzYWdlLnNldHRpbmdzLm11c2ljTXNnSWQpO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1zZy5yZWFjdCgn4o+5Jyk7XG4gICAgICAgIGF3YWl0IG1zZy5yZWFjdCgn4o+vJyk7XG4gICAgICAgIGF3YWl0IG1zZy5yZWFjdCgn4o+tJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY2xpZW50LmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlciA9IChyZWFjdGlvbiwgdXNlcikgPT4gdXNlci5pZCAhPT0gbWVzc2FnZS5jbGllbnQudXNlci5pZDtcbiAgICB2YXIgbXVzaWNSZWFjdENvbGxlY3RvciA9IG1zZy5jcmVhdGVSZWFjdGlvbkNvbGxlY3RvcihmaWx0ZXIpO1xuICAgIGNsaWVudC5wbGF5ZXIuZ2V0UXVldWUobWVzc2FnZSkuY29sbGVjdG9yID0gbXVzaWNSZWFjdENvbGxlY3RvcjtcbiAgICBtdXNpY1JlYWN0Q29sbGVjdG9yLm9uKCdjb2xsZWN0JywgKHJlYWN0aW9uLCB1c2VyKSA9PiB7XG4gICAgICAgIHN3aXRjaCAocmVhY3Rpb24uZW1vamkubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAn4o+tJzpcbiAgICAgICAgICAgICAgICBjbGllbnQucGxheWVyLnNraXAobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVhY3Rpb24udXNlcnMucmVtb3ZlKHVzZXIpLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbFxuICAgICAgICAgICAgICAgICAgICAuc2VuZChgJHt1c2VyLnVzZXJuYW1lfSDij6kgc2tpcHBlZCB0aGUgc29uZyAhYClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKG1zZykgPT4gbXNnLmRlbGV0ZSh7IHRpbWVvdXQ6IDMwMDAgfSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAn4o+vJzpcbiAgICAgICAgICAgICAgICByZWFjdGlvbi51c2Vycy5yZW1vdmUodXNlcikuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFjbGllbnQucGxheWVyLmdldFF1ZXVlKG1lc3NhZ2UpLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGllbnQucGxheWVyLnBhdXNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKGAke3VzZXIudXNlcm5hbWV9IOKPuCBwYXVzZWQgdGhlIG11c2ljICFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKG1zZykgPT4gbXNnLmRlbGV0ZSh7IHRpbWVvdXQ6IDMwMDAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50LnBsYXllci5yZXN1bWUobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoYCR7dXNlcn0g4pa2IHJlc3VtZWQgdGhlIG11c2ljICFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKG1zZykgPT4gbXNnLmRlbGV0ZSh7IHRpbWVvdXQ6IDMwMDAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICfij7knOlxuICAgICAgICAgICAgICAgIHJlYWN0aW9uLnVzZXJzLnJlbW92ZSh1c2VyKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBjbGllbnQucGxheWVyLnN0b3AobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jaGFubmVsXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKGAke3VzZXIudXNlcm5hbWV9IOKPuSBzdG9wcGVkIHRoZSBtdXNpYyFgKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigobXNnKSA9PiBtc2cuZGVsZXRlKHsgdGltZW91dDogMzAwMCB9KSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgICAgICAgICAgICAgIG11c2ljUmVhY3RDb2xsZWN0b3Iuc3RvcCgpO1xuICAgICAgICAgICAgICAgIGNsaWVudC5jbGVhckJhbm5lcihjbGllbnQsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWN0aW9uLnVzZXJzLnJlbW92ZSh1c2VyKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbXVzaWNSZWFjdENvbGxlY3Rvci5vbignZW5kJywgKCkgPT4ge30pO1xufTtcbiJdfQ==