//**********************************************************************
// Create RankingRules using API
//**********************************************************************

// Global Vars
var envToUse = 'PROD';//'DEVELOPMENT'; //PROD

const fs = require('fs');

const Coveo = require('./src/Coveo');

//Read API Key, OrgId and PipelineId
const config=require('./config');

const resultRankingTemplate = fs.readFileSync('./config/resultranking.json', 'utf8');
const conditionTemplate = fs.readFileSync('./config/condition.json', 'utf8');

async function createRule(name, beginTime, endTime, query, rule, modifier, note) {
  let settings={
    env: envToUse,
    apiKey: config.apiKeyToUse,
    orgId: config.orgId
  };
  try {
    debug('\nCreating rule, using ResultRanking method.');
    debug('\n------------------------------------------');
    debug('\nName      : ', `${name}`);
    debug('\nBegin Time: ', `${beginTime}`);
    debug('\nEnd Time  : ', `${endTime}`);
    debug('\nQuery     : ', `${query}`);
    debug('\nRule      : ', `${rule}`);
    debug('\nModifier  : ', `${modifier}`);
    debug('\nNote      : ', `${note}`);
    let conditionId ='';
    //First execute the condition
    if (beginTime!=null) {
      var jsonConditionToExecute = conditionTemplate.toString();
      //Replace $rule
      //Replace $note
      let conditionRule = `when ( $queryTimeUtc isBetween ${beginTime.toISOString()} and ${endTime.toISOString()} )`; 
      jsonConditionToExecute = JSON.parse(jsonConditionToExecute.replace('$rule',conditionRule).replace('$note',note));
      //debug('\nCondition to push: '+JSON.stringify(jsonConditionToExecute));
      const createConditionResponse = await Coveo.addStatement(settings, jsonConditionToExecute );
      conditionId = JSON.parse(createConditionResponse.body).id;
      debug('\n\nCondition created: '+conditionId);
    }
    //Second execute the ResultRanking
    var jsonToExecute = resultRankingTemplate.toString();
    //Replace $name
    //Replace $query
    //Replace $rule
    //Replace $modifier
    //Replace $note
    //Replace $conditionReference
    jsonToExecute = jsonToExecute.replace('$name',name)
                                 .replace('$query',query)
                                 .replace('$rule', rule)
                                 .replace('$modifier', modifier)
                                 .replace('$note',note)
                                 .replace('$conditionReference', conditionId);

    //debug('\nResultRanking to push: '+jsonToExecute);
    const createResponse = await Coveo.addQueryPipelineResultRanking(settings, config.pipelineId, JSON.parse(jsonToExecute));
    let id = JSON.parse(createResponse.body).id;
                           
    debug('\n\nCreated id: '+id);
  } catch (e) {
  console.log(e, e && e.name, e && e.detail);
  }
}

function debug() {
  if (true) { // use false to remove debug mode
    console.log.apply(console, arguments);
  }
}

let beginTime = new Date();
let endTime = new Date();
endTime = new Date(endTime.setDate(beginTime.getDate() + 11));

createRule("WimsTest", beginTime, endTime, 'WimsQuery', '@permanentid=243242341', "25", "@permantentid=243434 Note2" );