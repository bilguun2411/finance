var uiController = (function(){
    var x= 200;
    function add(y){
        return x+y
    }
    return {
       
        publicAdd: function(a){
            a=add(a)
            console.log('huleen avsan utga a: ' + a);
        }
    }
})();


var financeController = (function(){
    var y= 12;
    x=1
    console.log('hellooo from finance module');
})();

// console.log(x)

var appController = (function(uiCtrl,fnCtrl){
    uiCtrl.publicAdd(100);
})(uiController,financeController);


var hunController = (function(){
    var bodol = 'hudalch';
    function tsusGuih(){
    }
    return {
        yraih: function(){
            bodol = 'hudlaa ugee uur shan ugeer daldlah';
            tsusGuih();
            console.log('yghiinbe')

        }
    } 
})();