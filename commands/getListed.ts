import axios from "axios";
import { ICommand } from "wokcommands";

export default {
  category: 'NFTs Listed',
  description: 'NFTs Listed on Magic Eden',

  permissions: ["ADMINISTRATOR"],

  slash: true,
  testOnly: true,

  callback: async ({ interaction }) => {
    const url = 'https://api-mainnet.magiceden.dev/v2/collections/fatcats_capital/stats'

    const { data } = await axios.get(url)
    const content = JSON.stringify(data.listedCount)

    console.log(content)

    interaction.reply({
      content: `${content}`,
      ephemeral: true,
    })

    // await interaction.deferReply({
    //   ephemeral: true,
    // })
    
    // interaction.editReply({
    //   content: `${JSON.stringify(data.listedCount)}`,
    // })
  }
} as ICommand