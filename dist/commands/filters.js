const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true))
        return;
    message.channel.bulkDelete(1);
    const filtersStatuses = [[], []];
    client.config.filters.forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length
            ? filtersStatuses[1]
            : filtersStatuses[0];
        array.push(filterName.charAt(0).toUpperCase() +
            filterName.slice(1) +
            ' : ' +
            (client.player.getQueue(message).filters[filterName]
                ? `:white_check_mark:`
                : `:negative_squared_cross_mark:`));
    });
    const embed = new MessageEmbed()
        .setTitle(`**Filters**`)
        .addFields({
        name: 'Filters:',
        value: filtersStatuses[0].join('\n'),
        inline: true,
    }, {
        name: '** **',
        value: filtersStatuses[1].join('\n'),
        inline: true,
    })
        .setColor(message.settings.embedColor)
        .setTimestamp();
    message.channel.send(embed).then((msg) => msg.delete({ timeout: 10000 }));
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Moderator',
};
exports.help = {
    name: 'filters',
    category: 'Music',
    description: 'Show filters',
    usage: 'filters',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9maWx0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFL0MsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDakQsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO1FBQUUsT0FBTztJQUN6RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLGVBQWUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVqQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUN6QyxNQUFNLEtBQUssR0FDUCxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2pELENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLElBQUksQ0FDTixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtZQUM5QixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLO1lBQ0wsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUNoRCxDQUFDLENBQUMsb0JBQW9CO2dCQUN0QixDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FDN0MsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUU7U0FDM0IsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUN2QixTQUFTLENBQ047UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsTUFBTSxFQUFFLElBQUk7S0FDZixFQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsTUFBTSxFQUFFLElBQUk7S0FDZixDQUNKO1NBQ0EsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1NBQ3JDLFlBQVksRUFBRSxDQUFDO0lBRXBCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFDO0FBRUYsT0FBTyxDQUFDLElBQUksR0FBRztJQUNYLE9BQU8sRUFBRSxJQUFJO0lBQ2IsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsSUFBSSxHQUFHO0lBQ1gsSUFBSSxFQUFFLFNBQVM7SUFDZixRQUFRLEVBQUUsT0FBTztJQUNqQixXQUFXLEVBQUUsY0FBYztJQUMzQixLQUFLLEVBQUUsU0FBUztDQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBNZXNzYWdlRW1iZWQgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcblxuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50LCBtZXNzYWdlLCBhcmdzLCBsZXZlbCkgPT4ge1xuICAgIGlmIChjbGllbnQubXVzaWNVc2VyQ2hlY2soY2xpZW50LCBtZXNzYWdlLCB0cnVlKSkgcmV0dXJuO1xuICAgIG1lc3NhZ2UuY2hhbm5lbC5idWxrRGVsZXRlKDEpO1xuICAgIGNvbnN0IGZpbHRlcnNTdGF0dXNlcyA9IFtbXSwgW11dO1xuXG4gICAgY2xpZW50LmNvbmZpZy5maWx0ZXJzLmZvckVhY2goKGZpbHRlck5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXJyYXkgPVxuICAgICAgICAgICAgZmlsdGVyc1N0YXR1c2VzWzBdLmxlbmd0aCA+IGZpbHRlcnNTdGF0dXNlc1sxXS5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IGZpbHRlcnNTdGF0dXNlc1sxXVxuICAgICAgICAgICAgICAgIDogZmlsdGVyc1N0YXR1c2VzWzBdO1xuICAgICAgICBhcnJheS5wdXNoKFxuICAgICAgICAgICAgZmlsdGVyTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgZmlsdGVyTmFtZS5zbGljZSgxKSArXG4gICAgICAgICAgICAgICAgJyA6ICcgK1xuICAgICAgICAgICAgICAgIChjbGllbnQucGxheWVyLmdldFF1ZXVlKG1lc3NhZ2UpLmZpbHRlcnNbZmlsdGVyTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgPyBgOndoaXRlX2NoZWNrX21hcms6YFxuICAgICAgICAgICAgICAgICAgICA6IGA6bmVnYXRpdmVfc3F1YXJlZF9jcm9zc19tYXJrOmApXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKVxuICAgICAgICAuc2V0VGl0bGUoYCoqRmlsdGVycyoqYClcbiAgICAgICAgLmFkZEZpZWxkcyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnRmlsdGVyczonLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmaWx0ZXJzU3RhdHVzZXNbMF0uam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnKiogKionLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmaWx0ZXJzU3RhdHVzZXNbMV0uam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5zZXRDb2xvcihtZXNzYWdlLnNldHRpbmdzLmVtYmVkQ29sb3IpXG4gICAgICAgIC5zZXRUaW1lc3RhbXAoKTtcblxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGVtYmVkKS50aGVuKChtc2cpID0+IG1zZy5kZWxldGUoeyB0aW1lb3V0OiAxMDAwMCB9KSk7XG59O1xuXG5leHBvcnRzLmNvbmYgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBndWlsZE9ubHk6IHRydWUsXG4gICAgYWxpYXNlczogW10sXG4gICAgcGVybUxldmVsOiAnTW9kZXJhdG9yJyxcbn07XG5cbmV4cG9ydHMuaGVscCA9IHtcbiAgICBuYW1lOiAnZmlsdGVycycsXG4gICAgY2F0ZWdvcnk6ICdNdXNpYycsXG4gICAgZGVzY3JpcHRpb246ICdTaG93IGZpbHRlcnMnLFxuICAgIHVzYWdlOiAnZmlsdGVycycsXG59O1xuIl19