const {
	Telegraf,
	Markup
} = require('telegraf');
require('dotenv').config()
const { message } = require('telegraf/filters');
const text = require('./const')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 
'незнакомец'}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('autopark', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Автопарк</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Газель - 1,5т', 'btn_1'),Markup.button.callback('5 тонник', 'btn_2'),Markup.button.callback('7 тонник', 'btn_3')],
				[Markup.button.callback('10 тонник', 'btn_4'),Markup.button.callback('Фура 20 тонн', 'btn_5')]
			]
		))

	} catch(e) {
		console.error(e)
	}


})

bot.command('services', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Услуги</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Междугородние перевозки', 'btn_6'),Markup.button.callback('Сборные грузы', 'btn_7')],
				[Markup.button.callback('Перевозка мототехники и оборудования', 'btn_8'),Markup.button.callback('Сотрудничество с интерент-магазинами', 'btn_9')]
			]
		))

	} catch(e) {
		console.error(e)
	}


})






//Обработка кнопки 1
function addActionBot(name, src,text) {
	bot.action(name, async(ctx) => {
		try {
			await ctx.answerCbQuery()
			if(src !== false) {
				await ctx.replyWithPhoto({
					source: src
				})
			}
			await ctx.replyWithHTML(text, {
				dissable_web_page_preview: true // Обработка текста или ссылки чтобы не появлялось превью
			})
	
		} catch (e) {
			console.error(e)
		}
	})

}
addActionBot('btn_1', './img/gazel.jpg', text.text1)
addActionBot('btn_2', './img/gazon.jpg', text.text2)
addActionBot('btn_3', './img/iveco.jpg', text.text3)
addActionBot('btn_4', './img/10mass.jpg', text.text4)
addActionBot('btn_5', './img/fura.png', text.text5)
addActionBot('btn_6', './img/spb-moskva.png', text.text5)
addActionBot('btn_7', './img/cargo.png', text.text5)
addActionBot('btn_8', './img/коммерческое .png', text.text5)
addActionBot('btn_9', './img/marketplace.png', text.text5)


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));