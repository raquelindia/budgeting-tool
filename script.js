var app = angular.module('budgetingApp', ["ngRoute", "ngCookies"]);

app.controller('appCtrl', function($scope, $filter, $timeout, $cookies){
//sample accounts data 
$scope.sampleAccountsData = [
    {firstName: "Raquel", lastName: "Cruz", username: 'raquelindia'},
    {firstName: "Chris", lastName: "Mack", username: 'chrismack'},
    {firstName: "Masaya", lastName: "Diaz", username: 'masayadiaz'}
];

  //temp sign in
  $scope.selectedAccount = 'raquelindia';

//index 
$scope.selectedIndex = undefined;
$scope.selectedId = undefined;
$scope.totalSubscriptionsCost = 0;

    //budget data
  $scope.submittedBudgetForms = [
    {id: 1712770499917, index: 0, title: "Subscriptions", amount: 0, spent: $scope.totalSubscriptionsCost, delete: false, author: "raquelindia"}
  ];

  $scope.newBudgetData = {};
  $scope.editedBudgetData = {};

     //subscription data 

     $scope.submittedSubscriptionForms = [
     ];

     $scope.newSubscriptionData = {};

     //to edit budgets and subscriptions 
   $scope.selectedBudget = null;

     //numbers of things 
    $scope.numberOfBudgets = $scope.submittedBudgetForms.length;
    $scope.numberOfSubscriptions = $scope.submittedSubscriptionForms.length;
    $scope.numberOfOtherServices = $scope.numberOfSubscriptions - 1;
  
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
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];
    $scope.currentDate = new Date();
    $scope.milliseconds = $scope.currentDate.getTime();
    $scope.newId = $scope.milliseconds + $scope.numberOfBudgets;
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

//log
$scope.logSelectedBudget = function () {
    console.log($scope.selectedBudget);
}


//find most expensive subscription
$scope.getMostExpensiveSubscription = function () {
    var cost = 0;
    var instancesOfHighestCost = 0;
    var subscriptionName = "";
    var subscriptionsCostsArr = [];
    var otherServices = instancesOfHighestCost - 1;
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++) {
        if ($scope.submittedSubscriptionForms[i].cost > cost){
            cost = $scope.submittedSubscriptionForms[i].cost;
            subscriptionName = $scope.submittedSubscriptionForms[i].service;
        }
    }
    $scope.mostExpensiveSubscriptionCost = cost;

    for (let j = 0; j < $scope.submittedSubscriptionForms.length; j++) {
        subscriptionsCostsArr.push($scope.submittedSubscriptionForms[j].cost);
    }

    for (let k = 0; k < $scope.submittedSubscriptionForms.length; k++) {
       if(subscriptionsCostsArr[k] === $scope.mostExpensiveSubscriptionCost) {
        instancesOfHighestCost = instancesOfHighestCost + 1;
        otherServices = instancesOfHighestCost - 1;
       }
    }

    if ( otherServices > 0 ) {
        $scope.mostExpensiveSubscriptionService = subscriptionName + "and " + otherServices + " others";
    } else {
        $scope.mostExpensiveSubscriptionService = subscriptionName;
    }
  
};

//edit budgets


$scope.saveId = function(id) {
    $scope.selectedId = id;
    console.log($scope.selectedIndex);
    console.log($scope.selectedId);
    $scope.saveAppState();
};

$scope.saveIndex = function (index) {
    $scope.selectedIndex = index;
    console.log($scope.selectedIndex);
    $scope.saveAppState();
}

$scope.deleteBudget = function(index) {
    $scope.saveIndex(index);
    console.log($scope.selectedIndex);
    console.log($scope.submittedBudgetForms[$scope.selectedIndex]);
    $scope.submittedBudgetForms.splice($scope.selectedIndex, 1);
    console.log($scope.submittedBudgetForms);
    $scope.numberOfBudgets = $scope.submittedBudgetForms.length;
    console.log($scope.submittedBudgetForms);
    $scope.saveAppState();
    console.log($scope.selectedIndex);
    window.location.reload();
};

// $scope.saveIndex = function () {
//     $scope.selectedBudget = index;

// };

$scope.refresh = function () {
    $scope.loadAppState();
}

$scope.deleteSubscription = function(index) {
    $scope.submittedSubscriptionForms.splice(index, 1);
    console.log($scope.submittedSubscriptionForms);
    $scope.numberOfSubscriptions = $scope.submittedSubscriptionForms.length;
    $scope.numberOfOtherServices = $scope.numberOfSubscriptions;
    $scope.saveAppState();
    window.location.reload();

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


//get subscriptions cost total 
$scope.getSubscriptionsTotal = function () {
    var count = 0;
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++){
        count = count + $scope.submittedSubscriptionForms[i].cost;
    };
    $scope.totalSubscriptionsCost = count;
}; $scope.getSubscriptionsTotal();


//submit and send budget data to array
$scope.submitNewBudgetForm = function () {
    console.log($scope.submittedBudgetForms.length);
    $scope.newBudgetData.index = $scope.submittedBudgetForms.length;
    $scope.newBudgetData.id = $scope.newId;
    console.log("new id is: " + $scope.newId);
    console.log($scope.submittedBudgetForms);
    $scope.newBudgetData.delete = true;
    console.log($scope.newBudgetData);
     $scope.submittedBudgetForms.push(angular.copy($scope.newBudgetData));
     $scope.newBudgetData = {};
     $scope.numberOfBudgets = $scope.submittedBudgetForms.length;
     console.log($scope.submittedBudgetForms);
     console.log($scope.numberOfBudgets);
     $scope.saveAppState();
    console.log($scope.submittedBudgetForms);

};

//test edit budgets function 
$scope.submitEditBudgetForm = function () {
    // $scope.deleteToEditBudget();
    $scope.editedBudgetData.index = $scope.selectedIndex;
    $scope.editedBudgetData.id = $scope.selectedId;
    if(!$scope.editedBudgetData.title) {
        $scope.editedBudgetData.title = $scope.submittedBudgetForms[$scope.selectedIndex].title;
    } 
    if ($scope.editedBudgetData.amount == null) {
        $scope.editedBudgetData.amount = $scope.submittedBudgetForms[$scope.selectedIndex].amount;
    } 
    if ($scope.editedBudgetData.spent == null) {
        $scope.editedBudgetData.spent = $scope.submittedBudgetForms[$scope.selectedIndex].spent;
    }

    var newData = $scope.editedBudgetData;
  $scope.submittedBudgetForms[$scope.selectedIndex] = newData;
    console.log($scope.submittedBudgetForms);
    // $scope.submittedBudgetForms.push(angular.copy($scope.editedBudgetData));
    $scope.editedBudgetData = {};
    $scope.selectedIndex = undefined;
    $scope.selectedId = undefined;
        $scope.saveAppState();
    };
    

//submit and send subscription data to array
$scope.submitNewSubscriptionForm = function () {
$scope.submittedSubscriptionForms.push(angular.copy($scope.newSubscriptionData));
$scope.totalSubscriptionsCost = $scope.totalSubscriptionsCost + $scope.newSubscriptionData.cost;
$scope.saveAppState();
$scope.newSubscriptionData = {};
$scope.numberOfSubscriptions = $scope.submittedSubscriptionForms.length;
$scope.numberOfOtherServices = $scope.numberOfSubscriptions;
$scope.saveAppState();
};


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
}; 



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
};

// add all costs 
$scope.getTotalCosts = function () {
var count = 0;
count = count + $scope.totalSubscriptionsCost;
count = count + $scope.totalMonthlyBudgetSpent;
$scope.totalMonthlySpent = count;
// console.log($scope.totalMonthlySpent); 
};
    

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
 }; 


 //functions to save state 
//to save state of app
 $scope.saveAppState = function() {
    // Save the state of your app using $cookies.put
    $cookies.putObject('appState', {
        submittedBudgetForms: $scope.submittedBudgetForms,
        submittedSubscriptionForms: $scope.submittedSubscriptionForms,
        numberOfSubscriptions: $scope.numberOfSubscriptions,
        numberOfBudgets: $scope.numberOfBudgets,
        mostExpensiveSubscriptionService: $scope.mostExpensiveSubscriptionService,
        totalSubscriptionsCost: $scope.totalSubscriptionsCost,
        totalSubmittedBudget: $scope.totalSubmittedBudget,
        mostExpensiveSubscriptionCost:  $scope.mostExpensiveSubscriptionCost,
        biggestBudgetTitle: $scope.biggestBudgetTitle,
        biggestBudgetAmount: $scope.biggestBudgetAmount,
        totalMonthlyBudgetSpent: $scope.totalMonthlyBudgetSpent,
        numberOfOtherServices: $scope.numberOfOtherServices,
        selectedIndex: $scope.selectedIndex,
        selectedId: $scope.selectedId,
        totalMonthlySpent:  $scope.totalMonthlySpent 
        // Add other properties you want to save
    });
};

//to load state of app
$scope.loadAppState = function() {
    // Load the saved state from cookies using $cookies.getObject
    var savedState = $cookies.getObject('appState');
    if (savedState) {
        // Restore the state of your app
        $scope.submittedBudgetForms = savedState.submittedBudgetForms;
        $scope.submittedSubscriptionForms = savedState.submittedSubscriptionForms;
        $scope.numberOfSubscriptions = savedState.numberOfSubscriptions;
        $scope.numberOfBudgets = savedState.numberOfBudgets;
        $scope.mostExpensiveSubscriptionService = savedState.mostExpensiveSubscriptionService;
        $scope.totalSubscriptionsCost = savedState.totalSubscriptionsCost;
        $scope.totalSubmittedBudget = savedState.totalSubmittedBudget;
        $scope.mostExpensiveSubscriptionCost = savedState.mostExpensiveSubscriptionCost;
        $scope.biggestBudgetTitle = savedState.biggestBudgetTitle;
        $scope.biggestBudgetAmount = savedState.biggestBudgetAmount;
        $scope.totalMonthlyBudgetSpent = savedState.totalMonthlyBudgetSpent;
        $scope.numberOfOtherServices = savedState.numberOfOtherServices;
        $scope.selectedIndex = savedState.selectedIndex;
        $scope.totalMonthlySpent = savedState.totalMonthlySpent;
        $scope.selectedId = savedState.selectedId;


        
        // Restore other properties
    };
};

//to call saveAppState whenever the state of the app changes 
$scope.$watchGroup([
    'submittedBudgetForms', 
'submittedSubscriptionForms',
 'numberOfBudgets', 
 'numberOfSubscriptions',
  'mostExpensiveSubscriptionService', 
  'totalSubscriptionsCost', 
  'totalSubmittedBudget', 
  'mostExpensiveSubscriptionCost',
  'biggestBudgetTitle',
  'biggestBudgetAmount',
  'totalMonthlyBudgetSpent',
  'numberOfOtherServices',
  'selectedIndex',
  'selectedId',
  'totalMonthlySpent'
], function(newValues, oldValues) {
    // Check if the arrays are different
    if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
        $scope.saveAppState();
    }
});


//call loadAppState whenever controller initializes
$scope.loadAppState();

$scope.getUpdatedValues = function () {
    $scope.getSubscriptionsTotal();
    $scope.getMostExpensiveSubscription();
    $scope.getBiggestBudget();
    $scope.getBudgetsTotalSpent();
    $scope.getTotalCosts();
    $scope.getPercentage($scope.totalMonthlySpent, $scope.totalSubmittedBudget);
    $scope.saveAppState();
}; $scope.getUpdatedValues();

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
    .when("/editbudget", {
        templateUrl : "editBudgetForm.html",
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
            id: "@",
            index: "@",
            delete: '=',
            amountNum: '=',
            spentNum: '=',
            idNum: '=',
            indexNum: '='

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

