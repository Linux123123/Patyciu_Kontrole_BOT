exports.run = async (client, message, args, level) => {
    // eslint-disable-line no-unused-vars
    if (!args || args.length < 1)
        return message.reply('Must provide a command to reload. Derp.');
    const command = client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));
    let response = await client.unloadCommand(args[0]);
    if (response)
        return message.reply(`Error Unloading: ${response}`);
    response = client.loadCommand(command.help.name);
    if (response)
        return message.reply(`Error Loading: ${response}`);
    message.reply(`The command \`${command.help.name}\` has been reloaded`);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'Bot Admin',
};
exports.help = {
    name: 'reload',
    category: 'System',
    description: 'Reloads a command that"s been modified.',
    usage: 'reload [command]',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNqRCxxQ0FBcUM7SUFDckMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDeEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDcEUsTUFBTSxPQUFPLEdBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksUUFBUTtRQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUVuRSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELElBQUksUUFBUTtRQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUVqRSxPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLENBQUMsQ0FBQztBQUM1RSxDQUFDLENBQUM7QUFFRixPQUFPLENBQUMsSUFBSSxHQUFHO0lBQ1gsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsS0FBSztJQUNoQixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsSUFBSSxHQUFHO0lBQ1gsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsUUFBUTtJQUNsQixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELEtBQUssRUFBRSxrQkFBa0I7Q0FDNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudCwgbWVzc2FnZSwgYXJncywgbGV2ZWwpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgaWYgKCFhcmdzIHx8IGFyZ3MubGVuZ3RoIDwgMSlcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ011c3QgcHJvdmlkZSBhIGNvbW1hbmQgdG8gcmVsb2FkLiBEZXJwLicpO1xuICAgIGNvbnN0IGNvbW1hbmQgPVxuICAgICAgICBjbGllbnQuY29tbWFuZHMuZ2V0KGFyZ3NbMF0pIHx8XG4gICAgICAgIGNsaWVudC5jb21tYW5kcy5nZXQoY2xpZW50LmFsaWFzZXMuZ2V0KGFyZ3NbMF0pKTtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQudW5sb2FkQ29tbWFuZChhcmdzWzBdKTtcbiAgICBpZiAocmVzcG9uc2UpIHJldHVybiBtZXNzYWdlLnJlcGx5KGBFcnJvciBVbmxvYWRpbmc6ICR7cmVzcG9uc2V9YCk7XG5cbiAgICByZXNwb25zZSA9IGNsaWVudC5sb2FkQ29tbWFuZChjb21tYW5kLmhlbHAubmFtZSk7XG4gICAgaWYgKHJlc3BvbnNlKSByZXR1cm4gbWVzc2FnZS5yZXBseShgRXJyb3IgTG9hZGluZzogJHtyZXNwb25zZX1gKTtcblxuICAgIG1lc3NhZ2UucmVwbHkoYFRoZSBjb21tYW5kIFxcYCR7Y29tbWFuZC5oZWxwLm5hbWV9XFxgIGhhcyBiZWVuIHJlbG9hZGVkYCk7XG59O1xuXG5leHBvcnRzLmNvbmYgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBndWlsZE9ubHk6IGZhbHNlLFxuICAgIGFsaWFzZXM6IFtdLFxuICAgIHBlcm1MZXZlbDogJ0JvdCBBZG1pbicsXG59O1xuXG5leHBvcnRzLmhlbHAgPSB7XG4gICAgbmFtZTogJ3JlbG9hZCcsXG4gICAgY2F0ZWdvcnk6ICdTeXN0ZW0nLFxuICAgIGRlc2NyaXB0aW9uOiAnUmVsb2FkcyBhIGNvbW1hbmQgdGhhdFwicyBiZWVuIG1vZGlmaWVkLicsXG4gICAgdXNhZ2U6ICdyZWxvYWQgW2NvbW1hbmRdJyxcbn07XG4iXX0=