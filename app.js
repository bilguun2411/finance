
//Delgetstei ajillah conroller
var uiController = (function(){
    var DOMstrings  = {
        inputType :".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        addBtn : ".add__btn"
    }
    return {
        getInput: function() {
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
            // addBtn: document.querySelector(DOMstrings.addBtn).value
            }
        },
        domStrings: function(){
            return DOMstrings
        }
    }
})();

//Sanhuutei ajillah controller
var financeController = (function(){
    var Income = function(id, description,value){
        this.id = id;
        this.description=description;
        this.value= value;
    };
    var Expense = function(id, description,value){
        this.id = id;
        this.description=description;
        this.value= value;
    };

    i1 = new Income(1, "Salary",200)
    i2 = new Expense(1,"cost",100)

    // var incomes = []
    // var expenses = []

    // incomes.push(i1)
    // console.log(incomes[1].value)

    var data = {
        items: {
            inc: [],
            exp: []
        },
        total:{
            inc: 0,
            exp: 0
        }
    }
    return {
        addItem: function(type, desc,val){
            
            var item,id;
            if( data.items[type].lenght === 0 ) {
                id = 1; 
            } else {
                id = data.items[type][data.items[type].lenght-1] + 1 ;
            };

            if(type === "inc"){
                item = new Income(id,desc,val);
            } else {
                item = new Expense(id,desc,val); 
            };

            data.items[type].push(item);
        },
        seeData: function(){
            return data;
        }
    }

})();


//Programiin holbogch controller

var appController = (function(uiController,financeController){
    

    var ctrlAddItem = function(){
        // console.log('uusgesen function ajillaj bn')
        //1. oruulah ugugdliig delgetees avah
        var input = uiController.getInput();
        console.log(input)
        //2. olj avsan utgaa sanhuugiin controllert damjuulah
        financeController.addItem(input.type,input.description,input.value);
        // console.log(financeController.data());
        //3. olj avsan utgaa web tohirgoo hesegt haragduulna
        //4. Tusviig tootsoolno
        //5. etssiin uldegdel tootsoolno
    };
    
    var setupEventListener = function(){
        var DOM = uiController.domStrings();
        document.querySelector(DOM.addBtn).addEventListener("click",function(){
            ctrlAddItem();
        });
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13) 
            ctrlAddItem();
    
        });
    }
    return {
        init: function(){ 
            setupEventListener();
            console.log(addEventListener.DOM);
            // ctrlAddItem
        }
    }
    
})(uiController,financeController);

appController.init();





