require('dotenv').config();
const { Client, GatewayIntentBits, Guild, ChannelType } = require('discord.js');
require('axios')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        status: 'online',
        activities: [{
            name: '👀',
            type: 'WATCHING'
        }]
    }
});

client.once('clientReady', async () => {
    console.log(`✅ Bot online como ${client.user.tag}`)
    client.user.setActivity('👀', { type: 'WATCHING' })

    const guildId = '1244282036857081926'
    guild = await client.guilds.fetch(guildId);

    //CRIANDO CATEGORIAS
    try {
        const categoriaValorant = await guild.channels.create({
            name: '🎯 VALORANT',
            type: ChannelType.GuildCategory,
        });
        await guild.channels.create({
            name: '📊TRACKER',
            type: ChannelType.GuildText,
            parent: categoriaValorant.id
        });

        await guild.channels.create({
            name: '🗣️ BATE-PAPO',
            type: ChannelType.GuildVoice,
            parent: categoriaValorant.id
        });

        console.log('✅ Categoria 🎯 VALORANT criada com sucesso!')
        console.log('✅ Canais tracker e BATE-PAPO criados com sucesso!')
    } catch (error) {
        console.error('❌ Erro ao criar categorias:', error);
    }

    const channelId = '1436380538087800897'

    // const channel = client.channels.cache.get(channelId)
    // if (channel) channel.send('O BOT TA ON!!')
    // else console.log('❌ Canal não encontrado!');

    client.channels.cache.forEach(channel => {
        console.log(`🔹 ${channel.name} - ${channel.id}`)
    })
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === 'ping') {
        message.reply('pong');
    }

    if (message.content.slice(0,8) === '!tracker') {
        //Retirar os espaços do comando
        //Pegar toda a string a partir do final do comando, ou seja, !tracker...
        const player = message.content.slice(8).trim();
        console.log(player)
    }
});

client.login(process.env.DISCORD_TOKEN)