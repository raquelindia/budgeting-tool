var app = angular.module('budgetingApp');
/* see if something is wrong with this directive */
app.directive('monthlyBudget', function(){
    return {
        restrict: 'E',
        scope: {
            title: "=",
            amount: "=",
            spent: '='
        },
        templateUrl: './budget-section-files/components/monthlyBudget.html'
    }
})