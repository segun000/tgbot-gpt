import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'
import config from 'config'
import { ogg } from './ogg.js'
import { openai } from './openai.js'
import { removeFile } from './utils.js'
import { initCommand, processTextToChat, INITIAL_SESSION } from './logic.js'

console.log('Loading environment...',config.get('TEST_ENV'))
const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

console.log('Loading TELEGRAM_TOKEN...',config.get('TELEGRAM_TOKEN'))
console.log('Loading OPENAI_KEY...',config.get('OPENAI_KEY'))

bot.use(session())

bot.command('new', initCommand)

bot.command('start', initCommand)

bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  const username = ctx.from.username
  try {
    await ctx.reply(code('Сообщение принял. Жду ответ от сервера...'))
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
    const userId = String(ctx.message.from.id)
    const oggPath = await ogg.create(link.href, userId)
    const mp3Path = await ogg.toMp3(oggPath, userId)
    
    removeFile(oggPath)

    const text = await openai.transcription(mp3Path)
    await ctx.reply(code(`Ваш запрос: ${text}`))

    await processTextToChat(ctx, text, username)
  } catch (e) {
    console.log(`Error while voice message`, e.message)
  }
})

bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  const username = ctx.from.username
  try {
    await ctx.reply(code('Сообщение принял. Жду ответ от сервера...'))
    await processTextToChat(ctx, ctx.message.text, username)
  } catch (e) {
    console.log(`Error while voice message`, e.message)
  }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
