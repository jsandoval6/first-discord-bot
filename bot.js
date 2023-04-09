require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
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

  if (msg.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("this is a description")
      .setColor("Random")
      .addFields(
        { name: "field title", value: "some random title", inline: true },
        { name: "2nd field title", value: "some random value", inline: true }
      );

    msg.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number")?.value;
    const num2 = interaction.options.get("second-number")?.value;
    interaction.reply(`the sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("this is a description")
      .setColor("Random")
      .addFields(
        { name: "field title", value: "some random title", inline: true },
        { name: "2nd field title", value: "some random value", inline: true }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.BOT_TOKEN);
