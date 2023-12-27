var app = angular.module('budgetingApp');
/* see if something is wrong with this directive */
app.directive('monthlyBudget', function(){
    return {
        restrict: 'E',
        templateUrl: 'budget-section-files/components/monthlyBudget.html',
        scope: {
            newBudgetData: '='
        },
        controller: 'appCtrl'
       
    };
});

app.directive('something', function(){
    return{
        restrict: "E",
        template: '<div>hello worldddddddd!!!1!!</div>'
    };
});
/*
app.directive('subscription', function() {
    return{
        restrict: 'E',
        scope: {
            service: "=",
            cost: "="
        },
        template: '<div>something</div>'
    }
   
})
*/