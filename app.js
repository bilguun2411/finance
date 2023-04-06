
//Delgetstei ajillah conroller
var uiController = (function(){
    var a = 10
})();

//Sanhuutei ajillah controller
var financeController = (function(){
    var a=10
})();


//Programiin holbogch controller

var appController = (function(uiController,financeController){
    var ctrlAddItem = function(){
        console.log('uusgesen function ajillaj bn')
        //1. oruulah ugugdliig delgetees avah
        //2. olj avsan utgaa sanhuugiin controllert damjuulah
        //3. olj avsan utgaa web tohirgoo hesegt haragduulna
        //4. Tusviig tootsoolno
        //5. etssiin uldegdel tootsoolno
    };
    document.querySelector(".add__btn").addEventListener("click",function(){
        ctrlAddItem();
    });
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13) 
        ctrlAddItem();

    });
})(uiController,financeController);

