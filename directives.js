var app = angular.module('budgetingApp');

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