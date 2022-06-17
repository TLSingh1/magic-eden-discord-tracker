import { ICommand } from "wokcommands";

export default {
  category: 'Testing',
  description: 'Replies with pong',

  slash: 'both',
  testOnly: true,

  callback: ({ message, interaction}) => {
    const reply = 'Pong!'

    if (message) {
      message.reply({
        content: reply,
      })
    }

    if (interaction) {
      interaction.reply({
        content: reply,
        ephemeral: true
      })
    }
  }
} as ICommand