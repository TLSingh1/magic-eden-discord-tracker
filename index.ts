import DiscordJS, { Intents } from "discord.js"
import axios from "axios"
import dotenv from "dotenv"
import WOKCommands from "wokcommands"
import path from "path"
dotenv.config()

const client = new DiscordJS.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", async () => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID || "")
  
  const floor = "floor"
  const url = "https://api-mainnet.magiceden.dev/v2/collections/fatcats_capital/stats"
  
  console.log("The bot is ready")

	setInterval(async () => {
    const { data } = await axios.get(url)
		const floorPrice = data.floorPrice / 1000000000
    
		guild.me?.setNickname(`${floor.toUpperCase()}: ${floorPrice} SOL`)
	}, 5000)
  
  let last24Prices: any[] = []
  let pointer = 0
  
  setInterval(async () => {
    const { data } = await axios.get(url)
    const floorPrice = data.floorPrice / 1000000000
    
    if (last24Prices[pointer]) {
      let percentChange = ((floorPrice/last24Prices[pointer] -1) * 100).toFixed(2)
      last24Prices[pointer] = floorPrice
      console.log(percentChange)
      
      client.user?.setPresence({
        status: "online",
        activities: [
          {
            name: `${percentChange}%`,
            type: "PLAYING",
          },
        ],
      })
      if (pointer === 23 ) {
        pointer = 0;
      } else {
        pointer+=1;
      }
    } else {
      last24Prices[pointer] = floorPrice
      if (pointer === 23 ) {
        pointer = 0;
      } else {
        pointer+=1;
      }
    }
  }, 1000)
  
	new WOKCommands(client, {
    commandDir: path.join(__dirname, "commands"),
		typeScript: true,
		testServers: [process.env.GUILD_ID || ''],
	})
})

client.login(process.env.TOKEN)