
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
        percentageLabel:'.budget__expenses--percentage',
        containerDiv:'.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var nodeListForeach = function(list,callback){
        for ( var i=0; i<list.length ; i++){
            callback(list[i],i);
        };
    };

    var formatMoney = function(too,type){
        too=""+too;
        var x = too
        .split("")
        .reverse()
        .join("");

        var y = ""
        var count = 1
        for ( var i = 0; i < x.length; i++){
            y = y + x[i]

            if(count % 3 === 0  ) y = y+",";
            count++;
        };

        var z = y
        .split("")
        .reverse()
        .join("");

        if(z[0]===",") z = z.substr(1,z.length-1);

        if(type==='inc') z= "+ " + z;
        else  z= "- " + z;
        return z

    };

    return {
        displayDate: function(){
            var unuudur = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getMonth() + " -р сарын Өрхийн санхүү"
        },
        getInput: function() {
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt( document.querySelector(DOMstrings.inputValue).value),
            // addBtn: document.querySelector(DOMstrings.addBtn).value
            }
        },
        
        displayPercentage: function(allPercentages) {
            var elements = document.querySelectorAll(DOMstrings.expensePercentageLabel);
            console.log(elements)
            //elements bolgonii huvid zarlagain huviig massive s avch oruulah
            nodeListForeach(elements,function(el,index){
                el.textContent = allPercentages[index];
                
            });
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
            var type;
            if( tusuv.tusuv>0) type  = 'inc';
            else type = 'exp';
            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv,type);
            document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney (tusuv.totalExp,'exp');
            document.querySelector(DOMstrings.incomeLabe).textContent = formatMoney(tusuv.totalInc,"inc");
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
        },

        addListItem: function(item,type){
            //1. orlogog zarlagin elemnt aguulsan HTML -g beltgene
            var html,list;
            if (type==='inc') {
                list = DOMstrings.incomeList
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$Value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$Value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //2. ter HTML dotroo orlogo zarlgaiin utguudiig Replace ashiglan uurchlunu
            html = html.replace('%id%', item.id);
            html = html.replace('$$Description$$', item.description);
            html = html.replace('$$Value$$', formatMoney(item.value,type) );
            //3. beltgesen HTML iin DOM ruu oruulj ugnu
            document.querySelector(list).insertAdjacentHTML('beforeend',  html);
        },
        deleteListItems: function(id){
            var el  = document.getElementById(id);
            el.parentNode.removeChild(el);
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
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc){
        if(totalInc > 0)
        this.percentage = Math.round((this.value / totalInc) *100,1);
        else this.percentage  = 0;
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
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
        calculatePercentages: function(){
            data.items.exp.forEach(function(el){
                el.calcPercentage(data.total.inc);
            });
        },

        getPercentages: function(){
            var allPercentages = data.items.exp.map(function(el){
                return el.getPercentage();
            });
            return allPercentages;
            
        },

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
            if(data.total.inc > 0 ){
            data.huvi =  Math.round((data.total.exp/ data.total.inc )*100);
            } else {data.huvi = 0 }
        },

        tusuvAvah: function (){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.total.inc,
                totalExp: data.total.exp
            }

        },
        deleteItem: function(type,id){
            var ids = data.items[type].map(function(el){
                return el.id;
            });
            var index = ids.indexOf(id);
            if(index !== -1) {
                data.items[type].splice(index,1);
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
            
            updateTusuv();
        }
    };

    var updateTusuv = function(){
        //4. Tusviig tootsoolno
        financeController.tusuvCal();
            
        //5. etssiin uldegdel tootsoolno
        var tusuv = financeController.tusuvAvah();
        // console.log(tusuv)
        //6.Tusviin tootsoog delgetsend gargana
        uiController.tusuvUzuuleh(tusuv);

        //7. huviig tootsoolno
        financeController.calculatePercentages();
        //8. elementuudiin huvig huleej avna
        var allPercentages = financeController.getPercentages();
        //9. edgeer huviig delgetsend gargana
        uiController.displayPercentage(allPercentages);
        console.log(allPercentages)
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

        document.querySelector(DOM.containerDiv).addEventListener('click',function(event){
            
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
            // console.log(id);
            if(id){
                var arr = id.split("-");
                var type = arr[0];
                var itemId = parseInt(arr[1]);
                console.log(type + " >>>> " + itemId);
               
                //1.sanhuugiin modulias ustgana
                financeController.deleteItem(type,itemId);
                //2.degetsees arilgana
                uiController.deleteListItems(id);
                //uldegdel tootsoog shinchlene
                updateTusuv();
            }
            
        });
    }
    return {
        init: function(){ 
            uiController.displayDate();
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





