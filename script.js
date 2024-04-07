var app = angular.module('budgetingApp', ["ngRoute"]);

app.controller('appCtrl', function($scope, $filter, $timeout){
//sample accounts data 
$scope.sampleAccountsData = [
    {firstName: "Raquel", lastName: "Cruz", username: 'raquelindia'},
    {firstName: "Chris", lastName: "Mack", username: 'chrismack'},
    {firstName: "Masaya", lastName: "Diaz", username: 'masayadiaz'}
];

  //temp sign in
  $scope.selectedAccount = 'raquelindia';



    //budget data
  $scope.submittedBudgetForms = [
    {title: "Subscriptions", amount: 100, spent: $scope.totalSubscriptionsCost, author: "raquelindia"},
    {title: "Toiletries", amount: 100, spent: 70, author: "chrismack"},
    {title: "Groceries", amount: 220, spent: 200, author: "raquelindia"},
    {title: "Medical", amount: 500, spent: 0, author: "raquelindia"},
    {title: "Car", amount: 800, spent: 850, author: "masayadiaz"}
  ];

  $scope.newBudgetData = {};

     //subscription data 

     $scope.submittedSubscriptionForms = [
        {service: "Netflix", cost: 17, author: "raqueindia"},
        {service: "Hulu", cost: 15, author: "raquelindia"},
        {service: "CrunchyRoll", cost: 10, author: "chrismack"},
        {service: "Disney Plus", cost: 10, author: "masayadiaz"}
     ];

     $scope.newSubscriptionData = {};

     //to edit budgets and subscriptions 
     $scope.selectedBudget = null;

     //numbers of things 
    $scope.numberOfBudgets = $scope.submittedBudgetForms.length;
    $scope.numberOfSubscriptions = $scope.submittedSubscriptionForms.length;
  
    $scope.groceries = [
        {expense: 32},
        {expense: 53},
        {expense: 21}
    ];

     $scope.expenses = [
     $scope.totalSubscriptionsCost,
     $scope.totalGroceriesCost
    ];

    //expenses totals
    $scope.totalMonthlySpent = 0;
    $scope.totalGroceriesCost = 12;
    $scope.totalSubscriptionsCost = 0;
    $scope.totalMonthlyBudgetSpent = 0;
    $scope.totalSubmittedBudget = 0; 
    $scope.mostExpensiveSubscriptionService = "";
    $scope.mostExpensiveSubscriptionCost = 0;
    $scope.biggestBudgetTitle = "";
    $scope.biggestBudgetAmount = 0;
    $scope.barColor = 'green';
    $scope.overviewBarWidth = "";
    $scope.percentageSpent = 0;
    $scope.barWhiteSpaceWidth = "";
    $scope.barTextColor = 'white';
    $scope.leftBarBorderRadius = "12px";
  

    //date 
    $scope.months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    $scope.currentDate = new Date();
    $scope.currentMonth = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear();



    //to show forms on templates 
    $scope.isBudgetFormDisplayed = false;
    $scope.isSubscriptionFormDisplayed = false;
    $scope.isEditBudgetFormDisplayed = false;
    

    //functions

    //function to see if jasmine tests work
    $scope.add = function(a, b) {
        $scope.result = a + b;
      }; 

//submit forms functions 
/* save this to a database or api or something */
$scope.toggleAddBudgetForm = function () {
    $scope.isBudgetFormDisplayed = !$scope.isBudgetFormDisplayed;

};

$scope.toggleAddSubscriptionForm = function () {
    $scope.isSubscriptionFormDisplayed = !$scope.isSubscriptionFormDisplayed;
};

$scope.toggleEditBudgetForm = function () {
    $scope.isEditBudgetFormDisplayed = !$scope.isEditBudgetFormDisplayed;
};

//edit budgets
$scope.submitEditBudgetForm = function () {
    
};

$scope.deleteBudget = function(index) {
    $scope.submittedBudgetForms.splice(index, 1);
    $timeout(function() {
        $scope.$apply();
    });
    console.log($scope.submittedBudgetForms);
};



$scope.getMoneyLeft = function () {
    for (let i = 0; i < $scope.submittedBudgetForms.length; i++){
        var amount = $scope.submittedBudgetForms[i].amount;
        // console.log(amount);
        var spent = $scope.submittedBudgetForms[i].spent;
        // console.log(spent)
        $scope.moneyLeft = amount - spent;
        // console.log($scope.moneyLeft);
    }
}; $scope.getMoneyLeft();


//submit and send budget data to array
$scope.submitNewBudgetForm = function () {
     $scope.submittedBudgetForms.push(angular.copy($scope.newBudgetData));
     $scope.newBudgetData = {};
};

//submit and send subscription data to array
$scope.submitNewSubscriptionForm = function () {
$scope.submittedSubscriptionForms.push(angular.copy($scope.newSubscriptionData));
$scope.newSubscriptionData = {};
};


//filter budgets 
$scope.filterBudgetByUsername = function () {
    $scope.filteredBudgetsByUsername = $filter('filterBudgetsByUsername')($scope.submittedBudgetForms, $scope.selectedAccount);
}; $scope.filterBudgetByUsername();

//get subscriptions cost total 
$scope.getSubscriptionsTotal = function () {
    var count = 0;
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++){
        count = count + $scope.submittedSubscriptionForms[i].cost;
    };
    $scope.totalSubscriptionsCost = count;
}; $scope.getSubscriptionsTotal();

//get budgets total
$scope.getBudgetsTotalSpent = function () {
    var countSpent = 0;
    var countTotalBudget = 0;
    for (let i = 0; i < $scope.submittedBudgetForms.length; i++){
        countSpent = countSpent + $scope.submittedBudgetForms[i].spent;
        countTotalBudget = countTotalBudget + $scope.submittedBudgetForms[i].amount;
    };
    $scope.totalMonthlyBudgetSpent = countSpent;
    $scope.totalSubmittedBudget = countTotalBudget;
}; $scope.getBudgetsTotalSpent();

//find most expensive subscription
$scope.getMostExpensiveSubscription = function () {
    var cost = 0;
    var subscriptionName = "";
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++) {
        if ($scope.submittedSubscriptionForms[i].cost > cost){
            cost = $scope.submittedSubscriptionForms[i].cost;
            subscriptionName = $scope.submittedSubscriptionForms[i].service;
        }
    }
    $scope.mostExpensiveSubscriptionService = subscriptionName;
    $scope.mostExpensiveSubscriptionCost = cost;
}; $scope.getMostExpensiveSubscription();

//get most expensive budget
$scope.getBiggestBudget = function (){
    var amount = 0;
    var budgetTitle = "";
    for (let i = 0; i < $scope.submittedBudgetForms.length; i++) {
        if ($scope.submittedBudgetForms[i].amount > amount){
            amount = $scope.submittedBudgetForms[i].amount;
            budgetTitle = $scope.submittedBudgetForms[i].title;
        }
    }
    $scope.biggestBudgetTitle = budgetTitle;
    $scope.biggestBudgetAmount = amount;
}; $scope.getBiggestBudget();

// add all costs 
$scope.getTotalCosts = function () {
var count = 0;
count = count + $scope.totalSubscriptionsCost;
count = count + $scope.totalMonthlyBudgetSpent;
$scope.totalMonthlySpent = count;
// console.log($scope.totalMonthlySpent); 
}; $scope.getTotalCosts();
    

$scope.getGroceriesTotal = function () {
        var groceriesCount = 0;
        for(let j = 0; j < $scope.groceries.length; j++){
            var groceriesCost = $scope.groceries[j].expense;
            groceriesCount = groceriesCount  + groceriesCost;
        }
        $scope.totalGroceriesCost = groceriesCount;
     }; $scope.getGroceriesTotal();

    $scope.changeBarColor = function () {
        if($scope.spent === 0) {
            $scope.barColor = 'lightgrey';
            $scope.barTextColor = 'green';
        }
       else if ($scope.spent >= $scope.budget) {
            $scope.barColor = '#c30010';
        } else if ($scope.budget - $scope.spent < $scope.budget - $scope.budget / 2) {
            $scope.barColor = '#FA9C1B';
        } else {
            $scope.barColor = 'green';
        }
    }
    $scope.changeBarColor();

 //calculate percentage 
 $scope.getPercentage = function (spent, budget) {
   var spent = spent;
   var amount = budget;
   var percentage = spent / amount * 100;
   var round = Math.floor(percentage);
   $scope.percentageSpent = round;
 }; $scope.getPercentage($scope.totalMonthlySpent, $scope.totalSubmittedBudget);

});


app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "overview.html",
        controller: 'appCtrl'
    })
    .when("/budget", {
        templateUrl : "budgetSection.html",
        controller: 'appCtrl'
    })
    .when("/newbudget", {
        templateUrl : "newBudgetForm.html",
        controller: 'appCtrl'
    })
    .when("/overview", {
        templateUrl : "overview.html",
        controller: 'appCtrl'
    })
    .when("/subscriptions", {
        templateUrl : "subscriptions.html",
        controller: 'appCtrl'
    })
    .when("/account", {
        templateUrl : "account.html",
        controller: 'appCtrl'
    })
    .when("/addsubscription", {
        templateUrl : "newSubscriptionForm.html",
        controller: 'appCtrl'
    })
    .otherwise({
        templateUrl : "overview.html",
        controller: 'appCtrl'
    });
});

//filters 
app.filter('filterBudgetsByUsername', function() {
    return function(budgets, selectedAccount) {
        if(!selectedAccount) {
            return budgets;
        }

        return budgets.filter(function(budget) {
            return budget.author === selectedAccount;
        });
    };
});



//directives

//directive for budget components
app.directive('monthlyBudget', function(){
    return {
        restrict: 'E',
        templateUrl: 'budget-section-files/components/monthlyBudget.html',
        scope: {
            title: "@",
            amount: "@",
            spent: "@",
        },
        controller: 'appCtrl'
       
    };
});


app.directive('monthlySubscriptions', function(){
    return {
        restrict: 'E',
        templateUrl: 'subscriptions-files/components/subscriptionComponent.html',
        scope: {
            service: '@',
            cost: '@'
        },
    controller: 'appCtrl'
    };
});

