import axios from "axios";
import { ICommand } from "wokcommands";

export default {
  category: 'Volume',
  description: 'Get the cumulative volume',

  permissions: ['ADMINISTRATOR'],

  slash: true,
  testOnly: true,

  callback: async ({ interaction }) => {
    const url = 'https://api-mainnet.magiceden.dev/v2/collections/fatcats_capital/stats'

    const {data} = await axios.get(url)
    const content = JSON.stringify(Math.round((data.volumeAll/1000000000 + Number.EPSILON) * 100)/ 100)
    
    console.log(content)

    interaction.reply({
      content: `${content} SOL`,
      ephemeral: true,
    })
  }
} as ICommand