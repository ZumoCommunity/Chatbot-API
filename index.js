var builder = require('botbuilder');
var restify = require('restify');

var dotenv = require('dotenv');
dotenv.load();

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function(session) {
        builder.Prompts.text(session, 'Приветствуем в zummo community! Введите ваше имя.')
    },
    function(session, result) {
        session.send('Добрый день ' + result.response);
    }

])

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening at %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());