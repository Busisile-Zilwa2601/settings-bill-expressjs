let express = require('express');
let Moment = require('moment');
let bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
let billSettings = require('./bill-settings');

let caller = billSettings();
let app = express();
app.use(express.static('public'));
var hbs = exphbs.create({defaultLayout: 'main', helpers : 'helpers'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//route to home
app.get('/', function(req, res){
	res.render('home', caller.result());
});

app.post('/settings', function(req, res){
	let callCostSetting = req.body.callCost;
	let smsCostSetting = req.body.smsCost;
	let warningLevelSetting = req.body.warningLevel;
	let criticalLevelSetting = req.body.criticalLevel;
	//caller.getSettings(callCostSetting, smsCostSetting, warningLevelSetting, criticalLevelSetting);
	caller.callSet(callCostSetting);
	caller.smsSet(smsCostSetting);
	caller.warningSet(warningLevelSetting);
	caller.criticalSet(criticalLevelSetting);
	res.redirect('/');
});
//rest the inputs
app.post('/reset', function(req, res){
	//console.log(caller.clear());
	caller.clear();
	res.redirect('/');
});
app.post('/action', function(req, res){
	let billType = req.body.billItemType;
	caller.calculateEntry(billType);
 	res.redirect('/');
});
//GET route to show timestamp on total when ADD button is clicked
app.get('/actions', function(req, res){
	 res.render('actions', {actions: caller.actions(),
								helpers: {'changeDate':function(){
									return Moment(this.timestamp).fromNow();}
								}});
});
//GET route to show timestamp when call or sms radio-button is selected
app.get('/actions/:type',function(req, res){
	let billType = req.params.type;
	res.render('actions', {actions: caller.eachAction(billType),
		helpers: {'changeDate':function(){
			return Moment(this.timestamp).fromNow();}
		}
	});
});

//add the PORT
let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
	console.log('App starting on port', PORT);
});
