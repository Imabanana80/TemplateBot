const baseEvent = require("../utils/baseEvent");
const { errorMessage } = require("../utils/functions");
const cooldownManager = new Set();

module.exports = class interactionCreateEvent extends baseEvent {
  constructor() {
    super("interactionCreate", false);
  }

  run(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      const cmd = client.slashCommands.get(commandName);
      if (cmd) {
        if (cooldownManager.has(interaction.user.id)) {
          interaction.reply(
            "**You're going to fast!**\n> *There is a ``2`` second global cooldown.*"
          );
        } else {
          cmd.run(client, interaction).catch((err) =>
            errorMessage(interaction, err).catch((error) => {
              console.log(`[FATAL] ${err.stack}`);
            })
          );
        }
        cooldownManager.add(interaction.user.id);
        setTimeout(() => {
          cooldownManager.delete(interaction.user.id);
        }, 2000);
      }
    }
  }
};
