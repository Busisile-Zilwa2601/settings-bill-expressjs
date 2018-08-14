let assert = require('assert');
let bill = require('../bill-settings');
describe("The bill-Settings function", function(){
  
  it("the call total should be R2.00, sms R1.00 and the total bill R3.00. The warning and critical values are reached true should be returned", function(){
    const settingBill = bill();
    settingBill.callSet('2');
    settingBill.smsSet('1');
    settingBill.warningSet('1.50');
    settingBill.criticalSet('3');
    assert.deepEqual(settingBill.result(), {callAfterSetting : 2.00,
                                            callTotal : 0.00, 
                                            smsAfterSetting : 1.00, 
                                            smsTotal: 0.00,
                                            totalSettingsAmount : 0.00,
                                            warningLevelAfterSetting : 1.50, 
                                            criticalLevelAfterSetting: 3.00, 
                                            color: '',
                                          });
  });

  it('It should not add calls nor sms when the settings are as follows: \'Call Cost\' = 1.20, \'SMS Cost\' = 0.50 and both Warning and Crirtical Level are empty string:  ',function(){
    const settingBill = bill();
    settingBill.callSet('1.20');
    settingBill.smsSet('0.5');
    settingBill.warningSet('');
    settingBill.criticalSet('');
    settingBill.calculateEntry('call');
    settingBill.calculateEntry('sms');
    assert.deepEqual(settingBill.result(), {callAfterSetting : 1.20,
                                            callTotal : 0.00, 
                                            smsAfterSetting : 0.50, 
                                            smsTotal: 0.00,
                                            totalSettingsAmount : 0.00,
                                            warningLevelAfterSetting : 0.00, 
                                            criticalLevelAfterSetting: 0.00, 
                                            color: '',
                                          });  
  });
  
  it("the call amount set to R2.00 entered 1 time(s), sms set to R1.50 entered 1 time(s). It should return total bill R3.50 . The warning or critical value are not reached, and color is set to empty string.", function(){
    const settingBill = bill();
    settingBill.callSet('2');
    settingBill.smsSet('1.5');
    settingBill.warningSet('4.50');
    settingBill.criticalSet('6.50');
    settingBill.calculateEntry('call');
    settingBill.calculateEntry('sms');
    assert.deepEqual(settingBill.result(), {callAfterSetting : 2.00,
                                            callTotal : 2.00, 
                                            smsAfterSetting : 1.50, 
                                            smsTotal: 1.50,
                                            totalSettingsAmount : 3.50,
                                            warningLevelAfterSetting : 4.50, 
                                            criticalLevelAfterSetting: 6.50, 
                                            color: '',
   });
 });
  it("the call amount set to R2.00 entered 2 time(s), sms set to R1.00 entered 1 time(s). It should return total bill R5.00. The warning value is reached, and color is set to warning", function(){
     const settingBill = bill();
     settingBill.callSet('2');
     settingBill.smsSet('1');
     settingBill.warningSet('1.50');
     settingBill.criticalSet('6.50');
     settingBill.calculateEntry('call');
     settingBill.calculateEntry('call');
     settingBill.calculateEntry('sms');
     assert.deepEqual(settingBill.result(), {callAfterSetting : 2.00,
                                             callTotal : 4.00, 
                                             smsAfterSetting : 1.00, 
                                             smsTotal: 1.00,
                                             totalSettingsAmount : 5.00,
                                             warningLevelAfterSetting : 1.50, 
                                             criticalLevelAfterSetting: 6.50, 
                                             color: 'warning',
    });
  });
  
  it("the call amount set to empty string and added 3 time(s), sms set to R1.50 and added 5 time(s). It should return total bill R6.50. The critical value(s) are reached, it should return true", function(){
       const settingBill = bill();
       settingBill.callSet('');
       settingBill.smsSet('1.50');
       settingBill.warningSet('5');
       settingBill.criticalSet('6.50');
       settingBill.calculateEntry('call');
       settingBill.calculateEntry('call');
       settingBill.calculateEntry('call');
       settingBill.calculateEntry('sms');
       settingBill.calculateEntry('sms');
       settingBill.calculateEntry('sms');
       settingBill.calculateEntry('sms');
       settingBill.calculateEntry('sms');
       assert.deepEqual(settingBill.result(), {callAfterSetting : 0.00,
                                               callTotal : 0.00, 
                                               smsAfterSetting : 1.50, 
                                               smsTotal: 6.50,
                                               totalSettingsAmount : 6.50,
                                               warningLevelAfterSetting : 5.00, 
                                               criticalLevelAfterSetting: 6.50, 
                                               color: 'danger',
                                              });
  
  });

  it("It should reset all the setting values to initial values", function(){
    const settingBill = bill();
    settingBill.callSet('2');
    settingBill.smsSet('1');
    settingBill.warningSet('1.50');
    settingBill.criticalSet('3');
    settingBill.clear();
    assert.deepEqual(settingBill.result(), {callAfterSetting : '',
                                            callTotal : 0.00, 
                                            smsAfterSetting : '', 
                                            smsTotal: 0.00,
                                            totalSettingsAmount : 0.00,
                                            warningLevelAfterSetting : '', 
                                            criticalLevelAfterSetting: '', 
                                            color: '',
                                          });
  });

});
// describe('The bill-Settings function with actions', function(){
//   it("It should return the actions on Total", function(){
//      const settingBill = bill();
//      settingBill.callSet('2');
//      settingBill.smsSet('1');
//      settingBill.warningSet('1.50');
//      settingBill.criticalSet('6.50');
//      settingBill.calculateEntry('call');
//      settingBill.calculateEntry('call');
//      settingBill.calculateEntry('sms');
//      settingBill.calculateEntry('sms');
//      var newDate = new Date();
//      console.log(settingBill.actions());
//      assert.equal(settingBill.actions(), [ { type: 'call', cost: 2, timestamp: newDate},
//                                            { type: 'call', cost: 2, timestamp: newDate},
//                                            { type: 'sms', cost: 1, timestamp: newDate},
//                                            { type: 'sms', cost: 1, timestamp: newDate}]);
//   });

//   it("It should return the actions on Call Total", function(){

//   });
//   it("It should return the actions on SMS Total", function(){
    
//   });  
// });