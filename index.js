const {
	Telegraf,
	Markup
} = require('telegraf');
require('dotenv').config()
const text = require('./const')
const BOT_TOKEN = '6250657712:AAH0ivmaT2YIG-qvtJ1MILRqdtzUw3wYSdU'
const bot = new Telegraf(BOT_TOKEN)




bot.start((ctx) => ctx.replyWithHTML(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 
	'незнакомец'}`, Markup.inlineKeyboard(
	[
		[Markup.button.callback('Помощь', 'btn_help'),
		Markup.button.callback('Грузовики', 'btn_autopark'),
		Markup.button.callback('Услуги', 'btn_services')],
	 
	]
)))

async function replyAutopark (ctx)  {
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
}

async function replyHelp (ctx) {
	ctx.reply(text.commands)
}

bot.help(replyHelp)

bot.command('autopark', replyAutopark)


const replyServices =  async (ctx) => {
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


}
bot.command('services', replyServices)






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


function sendTemplate (name, callback) {
	bot.action(name, async(ctx) => {
		try {
			await ctx.answerCbQuery()
		 
			await callback(ctx);
	
		} catch (e) {
			console.error(e)
		}
	})
};

addActionBot('btn_1', './img/gazel.jpg', text.text1)
addActionBot('btn_2', './img/gazon.jpg', text.text2)
addActionBot('btn_3', './img/iveco.jpg', text.text3)
addActionBot('btn_4', './img/10mass.jpg', text.text4)
addActionBot('btn_5', './img/fura.png', text.text5)
addActionBot('btn_6', './img/spb-moskva.png', text.text5)
addActionBot('btn_7', './img/cargo.png', text.text5)
addActionBot('btn_8', './img/коммерческое .png', text.text5)
addActionBot('btn_9', './img/marketplace.png', text.text5)

sendTemplate('btn_help', replyHelp )
sendTemplate('btn_autopark', replyAutopark )
sendTemplate('btn_services',  replyServices)


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));