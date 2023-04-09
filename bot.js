require("dotenv").config();
const { Client, GatewayIntentBits, Message } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`✅Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.BOT_TOKEN);
