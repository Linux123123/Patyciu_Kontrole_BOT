module.exports = (client, member) => {
    // Load the guild's settings
    const settings = client.getSettings(member.guild);
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== 'true')
        return;
    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member);
    // Send the welcome message to the welcome channel
    // There's a place for more configs here.
    member.guild.channels.cache
        .find((c) => c.name === settings.welcomeChannel)
        .send(welcomeMessage)
        .catch(console.error);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJBZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL2d1aWxkTWVtYmVyQWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDaEMsNEJBQTRCO0lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxELDREQUE0RDtJQUM1RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFL0MsbUVBQW1FO0lBQ25FLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUUzRSxrREFBa0Q7SUFDbEQseUNBQXlDO0lBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUs7U0FDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUM7U0FDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKGNsaWVudCwgbWVtYmVyKSA9PiB7XG4gICAgLy8gTG9hZCB0aGUgZ3VpbGQncyBzZXR0aW5nc1xuICAgIGNvbnN0IHNldHRpbmdzID0gY2xpZW50LmdldFNldHRpbmdzKG1lbWJlci5ndWlsZCk7XG5cbiAgICAvLyBJZiB3ZWxjb21lIGlzIG9mZiwgZG9uJ3QgcHJvY2VlZCAoZG9uJ3Qgd2VsY29tZSB0aGUgdXNlcilcbiAgICBpZiAoc2V0dGluZ3Mud2VsY29tZUVuYWJsZWQgIT09ICd0cnVlJykgcmV0dXJuO1xuXG4gICAgLy8gUmVwbGFjZSB0aGUgcGxhY2Vob2xkZXJzIGluIHRoZSB3ZWxjb21lIG1lc3NhZ2Ugd2l0aCBhY3R1YWwgZGF0YVxuICAgIGNvbnN0IHdlbGNvbWVNZXNzYWdlID0gc2V0dGluZ3Mud2VsY29tZU1lc3NhZ2UucmVwbGFjZSgne3t1c2VyfX0nLCBtZW1iZXIpO1xuXG4gICAgLy8gU2VuZCB0aGUgd2VsY29tZSBtZXNzYWdlIHRvIHRoZSB3ZWxjb21lIGNoYW5uZWxcbiAgICAvLyBUaGVyZSdzIGEgcGxhY2UgZm9yIG1vcmUgY29uZmlncyBoZXJlLlxuICAgIG1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZVxuICAgICAgICAuZmluZCgoYykgPT4gYy5uYW1lID09PSBzZXR0aW5ncy53ZWxjb21lQ2hhbm5lbClcbiAgICAgICAgLnNlbmQod2VsY29tZU1lc3NhZ2UpXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbn07XG4iXX0=