import axios from "axios";
import { ICommand } from "wokcommands";

export default {
  category: 'Last 24H Price',
  description: 'Get the last 24-hour average price.',

  permissions: ["ADMINISTRATOR"],

  slash: true,
  testOnly: true,

  callback: async ({ interaction }) => {
    const url = 'https://api-mainnet.magiceden.dev/v2/collections/fatcats_capital/stats'

    const { data } = await axios.get(url)
    const content = JSON.stringify(Math.round((data.avgPrice24hr/1000000000 + Number.EPSILON) * 100)/ 100)
    
    console.log(content)

    interaction.reply({
      content: `Average price of last 24-hours: ${content} SOL`,
      ephemeral: true,
    })
  }
} as ICommand