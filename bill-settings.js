module.exports = function(){
  //scope variables
  var callAfterSetting = '';
  var smsAfterSetting = '';
  var warningLevelAfterSetting = '';
  var criticalLevelAfterSetting = '';
  let color = '';
  var callTotal = 0;
  var smsTotal = 0;
  var keepTotal = 0;
  var change = 0;
  var totalSettingsAmount = 0;

  //calculating and checking when the warning/critical is reach
  var settings = function(checkedRandioBtn2){
    let cost = 0;
    callAfterSetting = callSettingValue();
    smsAfterSetting = smsSettingValue();
    warningLevelAfterSetting = warningSettingValue();
    criticalLevelAfterSetting = criticalSettingValue();  
    if(checkedRandioBtn2 === 'call'){ 
      cost = callAfterSetting;
      keepTotal = totalSettingsAmount + callAfterSetting;
      if(totalSettingsAmount === criticalLevelAfterSetting){
        //do nothing
      }
      else if(criticalLevelAfterSetting < totalSettingsAmount){
        //do nothing
      }
      else if((criticalLevelAfterSetting > totalSettingsAmount)&&(criticalLevelAfterSetting-keepTotal < 0)){
        change = (criticalLevelAfterSetting-totalSettingsAmount);
        callTotal += change;
        totalSettingsAmount += change;
      }
      else{
        callTotal += callAfterSetting;
        totalSettingsAmount += callAfterSetting;
      }
    }
    else if(checkedRandioBtn2 === 'sms'){
      cost = smsAfterSetting;
      keepTotal = totalSettingsAmount+smsAfterSetting;
      if(totalSettingsAmount === criticalLevelAfterSetting){
        //do nothing
      }
      else if(criticalLevelAfterSetting < totalSettingsAmount){
          //do nothing
      }
      else if((criticalLevelAfterSetting > totalSettingsAmount) && (criticalLevelAfterSetting-keepTotal < 0)){
        change = criticalLevelAfterSetting-totalSettingsAmount;
        smsTotal += change;
        totalSettingsAmount += change;
      }
      else{
        smsTotal += smsAfterSetting;
        totalSettingsAmount += smsAfterSetting;
      }
    }
    classColor();
    recordList.push({
      type:checkedRandioBtn2,
      cost,
      timestamp:new Date()
    });
  };
  //record actions
  var recordList = [];
  //return actions
  function actions(){
    return recordList;
  }
  //filter for each type
  function eachAction(type){
    return recordList.filter(billed => billed.type === type);
  }
   //updating the callSetting
   var updateCall = function(newCall){
     if(newCall === ""){
         newCall = '0';
         callAfterSetting = parseFloat(newCall).toFixed(2);
     }else{
       callAfterSetting = parseFloat(newCall).toFixed(2);
     }
     classColor();
   };
  //convert the text of callAfterSetting to a Number
  var callSettingValue = function(){
    return Number(callAfterSetting);
  };
  //update the sms after settings
  var updateSMS = function(newSms){
    if(newSms === ""){
        newSms = '0';
        smsAfterSetting = parseFloat(newSms).toFixed(2);
    }else{
      smsAfterSetting = parseFloat(newSms).toFixed(2);
    }
    classColor();
  };
  //convert the text of smsAfterSetting to a Number
  var smsSettingValue = function(){
    return Number(smsAfterSetting);
  };
  //updating the warning level
  var updateWarning = function(newWarning){
    if(newWarning !== ''){
      warningLevelAfterSetting = parseFloat(newWarning).toFixed(2);
    }else{
        newWarning = '0';
        warningLevelAfterSetting = parseFloat(newWarning).toFixed(2);
    }
    classColor();
  };
  //convert the text of warningLevelAfterSetting to a Number
  var warningSettingValue = function(){
    return Number(warningLevelAfterSetting);
  };
  //updating the critical level
  var updateCritical = function(newCritical){
    if(newCritical !== ''){
      criticalLevelAfterSetting = parseFloat(newCritical).toFixed(2);
    }else{
      newCritical = '0';
      criticalLevelAfterSetting = parseFloat(newCritical).toFixed(2);
    }
    classColor();
  };
  //convert the text of criticalLevelAfterSetting to a Number
  var criticalSettingValue = function(){
    return  Number(criticalLevelAfterSetting);
  };
  //return the total value
  var returnTotal = function(){
    return parseFloat(totalSettingsAmount).toFixed(2);
  };
  //Return the sms value
  var returnSMS = function(){
    return parseFloat(smsTotal).toFixed(2);
  };
  //return the call value
  var returnCall = function(){
   return parseFloat(callTotal).toFixed(2);
  };
  //change color
  var classColor = function(){
         if((totalSettingsAmount >= warningLevelAfterSetting) && (totalSettingsAmount < criticalLevelAfterSetting)){
           color = 'warning';
         }else if((totalSettingsAmount >= criticalLevelAfterSetting) && (totalSettingsAmount > warningLevelAfterSetting)){
            color =  'danger';
         }else{
           color = 'original';
         }
  };
  // rest 
  function clear(){
    callAfterSetting = '';
    smsAfterSetting = '';
    warningLevelAfterSetting = '';
    criticalLevelAfterSetting = '';
    callTotal = 0;
    smsTotal = 0; 
    totalSettingsAmount = 0;
    color = '';
    recordList = [];
  }
  //functions to be used when this module is imported
  return{
    callSet : updateCall,
    smsSet : updateSMS,
    warningSet : updateWarning,
    criticalSet : updateCritical,
    calculateEntry : settings,
    returnCall,
    returnSMS,
    returnTotal,
    actions,
    eachAction,
    clear,
    //the results on the screen
    result : function(){
      return{
         callAfterSetting,
         smsAfterSetting,
         warningLevelAfterSetting,
         criticalLevelAfterSetting,
         callTotal : callTotal.toFixed(2),
         smsTotal : smsTotal.toFixed(2), 
         totalSettingsAmount : totalSettingsAmount.toFixed(2),
         color,
      };
    }
  };
};
