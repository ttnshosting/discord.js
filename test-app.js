const token = "MjEyNzk4ODkxNTg0NzgyMzM2.CoxTRQ.oZifUpm4eI8AOOEMMR0v0ndnXsk";
var Discord = require('discord.js');

var testApp = new Discord.Client();
var afkList = {};

function isNotAway(user) {
	var username = user.username;

	return !afkList.hasOwnProperty(username);
}
testApp.on('message', function(message) {
	var user = message.author;
	if (message.content === 'afk' && isNotAway(user)) {
		var afkUser = {user: message.author, awayTime: message.timestamp};
		console.log('The user is: '+testApp.users.get('username', 'Tw1sted_Torture'));
		testApp.sendMessage(message, message.author.username+' is afk...');
		afkList[afkUser.user.username] = afkUser;
	}
	else if (message.content !== 'afk' && !isNotAway(user)) {
		var secondsGone = (message.timestamp-afkList[user.username].awayTime)/1000,
		    dateLeft = new Date(afkList[user.username].awayTime),
		    dateBack = new Date(message.timestamp);
		testApp.sendMessage(message, 'Welcome back, '+user.username+'. You left at: '+dateLeft.toTimeString()+'. You came back at: '+dateBack.toTimeString()+'.'+' You were gone for '+secondsGone+' seconds.');
		delete afkList[user.username];
	}
});

testApp.loginWithToken(token);
//testApp.login('noahjemkai@gmail.com', 'vinewar8');
