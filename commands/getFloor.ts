import axios from "axios";
import { ICommand } from "wokcommands";

export default {
  category: 'Floor Price',
  description: 'Get the floor price',

  permissions: ["ADMINISTRATOR"],

  slash: 'both',
  testOnly: true,

  callback: async ({ interaction }) => {
    const url = 'https://api-mainnet.magiceden.dev/v2/collections/fatcats_capital/stats'

    const { data } = await axios.get(url)
    const content = JSON.stringify(data.floorPrice/1000000000)

    console.log(data)

    interaction.reply({
      content: `${content} SOL`,
      ephemeral: true
    })
  }
} as ICommand;