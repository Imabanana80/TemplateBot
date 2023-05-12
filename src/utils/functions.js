const { EmbedBuilder } = require("discord.js");

async function errorMessage(interaction, err) {
  const errembed = new EmbedBuilder()
    .setTitle(
      `An error occured whilst trying to run ${`${interaction}`.split(" ")[0]}`
    )
    .setColor("Red")
    .setDescription(`\`\`\`err\n${err}\`\`\``)
    .addFields({
      name: "If this problem persists,",
      value:
        "[Click here to contact the developers!](https://discord.gg/5GxWqAEdez)",
      inline: true,
    })
    .addFields({
      name: "Support ID (keep this!)",
      value: `\`\`${interaction.id}\`\``,
      inline: true,
    });
  const embed = new EmbedBuilder()
    .setTitle(`An error occured in ${interaction.guild.name}`)
    .setColor("Red")
    .setDescription(`\`\`\`err\n${err.stack || err}\`\`\``)
    .addFields(
      { name: "Full Command", value: `\`\`\`${interaction}\`\`\`` },
      { name: `Triggered by`, value: `${interaction.user}`, inline: true },
      {
        name: "Support ID",
        value: `\`\`${interaction.id}\`\``,
        inline: true,
      }
    );
  const errorChannel = await client.channels.fetch(process.env.ERRCHANNEL);
  await errorChannel
    .send({
      content: `<@${process.env.OWNERID}>`,
      embeds: [embed],
      files: ["./src/console.txt"],
    })
    .then((message) => {
      message.react(`🟢`);
    });
  await interaction.editReply({
    embeds: [errembed],
  });
  console.log(`[Error] ${err} \n[Stack] ${err.stack}`);
  return;
}

async function noPerms(interaction, permission) {
  const noPermsEmbed = new EmbedBuilder()
    .setTitle("Insufficient permissions!")
    .setColor(0x2f3136)
    .setDescription(
      `You dont have the required permission(s) \`\`${permission}\`\``
    );
  await interaction.editReply({ embeds: [noPermsEmbed] });
}

module.exports = {
  errorMessage,
  noPerms,
};
