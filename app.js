
//Delgetstei ajillah conroller
var uiController = (function(){
    var DOMstrings  = {
        inputType :".add__type",
        inputDescription : ".add__description",
        inputValue : ".add__value",
        addBtn : ".add__btn",
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        tusuvLabel: '.budget__value',
        incomeLabe: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage'
    }
    return {
        getInput: function() {
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt( document.querySelector(DOMstrings.inputValue).value),
            // addBtn: document.querySelector(DOMstrings.addBtn).value
            }
        },
        
        domStrings: function(){
            return DOMstrings
        },

        clearFields: function(){
            //ene list butsaadag
            var fields = document.querySelectorAll(
                DOMstrings.inputDescription + ',' + DOMstrings.inputValue 
                )
            //list g massive ruu shiljuuldeg   field.slice gej bichihgui bgaa shaltgaan ni slice ni LIST dotor bhgui 
            var fieldsArr = Array.prototype.slice.call(fields);
            // console.log(fieldsArr);
            // for (var i = 0 ; i < fieldsArr.length; i++){
            //     fieldsArr[i].value = ""
            // }
            //ahisan davtalt
            fieldsArr.forEach(function(el,index,array){
                el.value = ""
            });

            fieldsArr[0].focus();
        },
        tusuvUzuuleh: function(tusuv){
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
            document.querySelector(DOMstrings.incomeLabe).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
        },

        addListItem: function(item,type){
            //1. orlogog zarlagin elemnt aguulsan HTML -g beltgene
            var html,list;
            if (type==='inc') {
                list = DOMstrings.incomeList
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$Value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$Value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //2. ter HTML dotroo orlogo zarlgaiin utguudiig Replace ashiglan uurchlunu
            html = html.replace('%id%', item.id);
            html = html.replace('$$Description$$', item.description);
            html = html.replace('$$Value$$', item.value);
            //3. beltgesen HTML iin DOM ruu oruulj ugnu
            document.querySelector(list).insertAdjacentHTML('beforeend',  html);
        }
    }
})();

//Sanhuutei ajillah controller
var financeController = (function(){
    var Income  = function(id, description,value){
        this.id = id;
        this.description=description;
        this.value= value;
    };
    var Expense = function(id, description,value){
        this.id = id;
        this.description=description;
        this.value= value;
    };

    // i1 = new Income(1, "Salary",200)
    // i2 = new Expense(1,"cost",100)

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
        },
        tusuv: 0
    }
    var calculateTotal = function(type){
        var sum=0;
        data.items[type].forEach(function(el){
            sum = sum + el.value
        });
        data.total[type] = sum
    }


    return {
        addItem: function(type, desc, val) {

            var item,id;

            if(data.items[type].length === 0) id = 1 ;
            else {
                id = data.items[type][data.items[type].length -1].id + 1;
            }
            if(type === "inc"){
                item = new Income (id,desc,val);
            } else {
                item = new Expense(id,desc,val); 
            };
            data.items[type].push(item);

            return item;
            
        },

        seeData: function(){
            return data;
        },

        tusuvCal: function (){
            //niit orologo
            calculateTotal('inc');
            //niit zarlaga
            calculateTotal('exp');
            //tusviig shineer tootsno
            data.tusuv = data.total.inc - data.total.exp
            //orlogo zarlgaini huvi
            data.huvi =  Math.round((data.total.exp/ data.total.inc )*100);
        },

        tusuvAvah: function (){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.total.inc,
                totalExp: data.total.exp
            }

        }
    }

})();


//Programiin holbogch controller

var appController = (function(uiController,financeController){
    

    var ctrlAddItem = function(){
        // console.log('uusgesen function ajillaj bn')
        //1. oruulah ugugdliig delgetees avah
        var input = uiController.getInput();
        if (input.description !=="" && input.value !== ""){
            //2. olj avsan utgaa sanhuugiin controllert damjuulah
            var item = financeController.addItem(input.type,input.description,input.value);
            // console.log(financeController.data());
            //3. olj avsan utgaa web tohirgoo hesegt haragduulna
            uiController.addListItem(item, input.type);
            uiController.clearFields();
            //4. Tusviig tootsoolno
            financeController.tusuvCal();
            
            //5. etssiin uldegdel tootsoolno
            var tusuv = financeController.tusuvAvah();
            console.log(tusuv)
            //6.Tusviin tootsoog delgetsend gargana
            uiController.tusuvUzuuleh(tusuv);
            
        }
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
            
            uiController.tusuvUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });

            setupEventListener();
        }
    }
})(uiController,financeController);

appController.init();





