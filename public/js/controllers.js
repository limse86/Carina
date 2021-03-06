"use strict";
var crmControllers = angular.module('crmControllers', []);



//function to hide de menu bar when admin has not login yet or when creating admin account
app.run(function($rootScope, $location, $cookies){
	console.log($rootScope);
  	$rootScope.$on('$routeChangeStart', function(event, next, current){
    if ($location.path() == '/' || $location.path() == '/subscribe') {
      $rootScope.hideit = true;
      $rootScope.hideDisconnect = true;
    } else {
    	$rootScope.hideit = false;
    	$rootScope.hideDisconnect = false;
    }
    let cookieAdminObject = $cookies.getObject('infosAdminlog');
    if (cookieAdminObject && ($location.path() == '/' || $location.path() == '/subscribe')) {
    	$rootScope.hideName = true;
    	$rootScope.hideDisconnect = true;
    } else {
    	$rootScope.userAdminName = cookieAdminObject;
    	$rootScope.hideName = false;
    }
  });

});


crmControllers.controller('homeCtrl', ['$scope', '$location','ngDialog', '$cookies', function($scope, $location, ngDialog, $cookies){
	/*let cookieAdObject = {};*/

	$scope.svgHover=function(circleTarget, reset){
		console.log('in');

		if (reset) {
			if (circleTarget == "svgHover1") {
				$scope.Hover1=false;
			}
			if (circleTarget == "svgHover2") {
				$scope.Hover2=false;
			}
			if (circleTarget == "svgHover3") {
				$scope.Hover3=false;
			}
			if (circleTarget == "svgHover4") {
				$scope.Hover4=false;
			}
			if (circleTarget == "svgHover5") {
				$scope.Hover5=false;
			}
			if (circleTarget == "svgHover6") {
				$scope.Hover6=false;
			}
			if (circleTarget == "svgHover7") {
				$scope.Hover7=false;
			}
			if (circleTarget == "svgHover8") {
				$scope.Hover8=false;
			}
			if (circleTarget == "svgHover9") {
				$scope.Hover9=false;
			}
			if (circleTarget == "svgHover10") {
				$scope.Hover10=false;
			}

		}else{
			if (circleTarget == "svgHover1") {
				$scope.Hover1=true;
			}
			if (circleTarget == "svgHover2") {
				$scope.Hover2=true;
			}
			if (circleTarget == "svgHover3") {
				$scope.Hover3=true;
			}
			if (circleTarget == "svgHover4") {
				$scope.Hover4=true;
			}
			if (circleTarget == "svgHover5") {
				$scope.Hover5=true;
			}
			if (circleTarget == "svgHover6") {
				$scope.Hover6=true;
			}
			if (circleTarget == "svgHover7") {
				$scope.Hover7=true;
			}
			if (circleTarget == "svgHover8") {
				$scope.Hover8=true;
			}
			if (circleTarget == "svgHover9") {
				$scope.Hover9=true;
			}
			if (circleTarget == "svgHover10") {
				$scope.Hover10=true;
			}
		}

		

	}

/*	if($cookies.getObject('infosAdminlog')) {
		cookieAdObject = $cookies.getObject('infosAdminlog');
		$scope.adminName = cookieAdObject;
		console.log($scope.adminName);
	}
	*/

	$scope.clickToOpenLogin = function () {
        ngDialog.open({ 
        	id: 'formLogin',
        	template: '/partials/popupTmpl.html',
        	className: 'ngdialog-theme-default',
        	controller: 'loginCtrl'
         	
		});
    };

    $scope.clickToOpenSubscribe = function () {
        ngDialog.open({ 
        	id: 'formLogin',
        	template: '/partials/subscribe.html',
        	className: 'ngdialog-theme-default',
        	controller: 'loginCtrl'
         	
		});
    };

    $scope.disconnect = function () {
    	let cookieAdminObject = $cookies.getObject('infosAdminlog');
    	if (cookieAdminObject) {
    		console.log($cookies.getObject('infosAdminlog'));
    		$cookies.remove('infosAdminlog');
    		//console.log($cookies.getObject('infosAdminlog'));
    	}
    	
    };

  



}]);


crmControllers.controller('listClientsCtrl', ['$scope', 'Client', '$cookies', function($scope, Client, $cookies){

	$scope.nbrCompanies = 0;
	$scope.nbrPrivateprs = 0;
	let listClients = [];
	let listPrivates = [];
	let listCompanies = [];
	$scope.datas = [];


	function refresh() {
		Client.getList(function(result) {
			$scope.clients = result;
			
			// to know how many companies or private persons are
			for(var i = 0; i<$scope.clients.length; i++) {
				listClients.push({'picture' : $scope.clients[i].picture,
							  	  'id' : $scope.clients[i]._id,
							      'name' : $scope.clients[i].name,
							      'isCompany' : $scope.clients[i].isCompany,
							      'nbrQuot' : $scope.clients[i].quotations.length,
							      'nbrBills' : $scope.clients[i].bills.length
				});
				if($scope.clients[i].isCompany == true){
					$scope.nbrCompanies++;
					listCompanies.push({'picture' : $scope.clients[i].picture,
							  	  		'id' : $scope.clients[i]._id,
							      		'name' : $scope.clients[i].name,
							      		'isCompany' : $scope.clients[i].isCompany,
							      		'nbrQuot' : $scope.clients[i].quotations.length,
							      		'nbrBills' : $scope.clients[i].bills.length

					});
				}
				else {
					$scope.nbrPrivateprs++;
					listPrivates.push({'picture' : $scope.clients[i].picture,
							  	  	   'id' : $scope.clients[i]._id,
							      	   'name' : $scope.clients[i].name,
							      	   'isCompany' : $scope.clients[i].isCompany,
							      	   'nbrQuot' : $scope.clients[i].quotations.length,
							      	   'nbrBills' : $scope.clients[i].bills.length

					});
				}
			}
			
			$scope.datas = listClients;
		});
	}
	
	refresh();

	$scope.viewAll = true;
	$scope.viewPrivates = false;
	$scope.viewCompanies= false;

	$scope.showCompanies = function(){
		$scope.datas = listCompanies;
		$scope.viewAll = false;
		$scope.viewPrivates = false;
		$scope.viewCompanies= true;
	}

	$scope.showPrivates = function(){
		$scope.datas = listPrivates;
		$scope.viewAll = false;
		$scope.viewPrivates = true;
		$scope.viewCompanies= false;
	}

	$scope.showAll = function(){
		$scope.datas = listClients;
		$scope.viewAll = true;
		$scope.viewPrivates = false;
		$scope.viewCompanies= false;
	}

	$scope.removingClient = function(id){
		Client.getList(function(result) {
			$scope.clientsList = result;
			for (var i = 0 ; i < $scope.clientsList.length ; i++){
				if($scope.clientsList[i]._id === id) {
					$scope.clientRemove = $scope.clientsList[i];
					//console.log($scope.clientRemove);
				};
			};
			//console.log("remove");
			if(confirm("Delete this client ?")){
				Client.removeClient($scope.clientRemove);
				// use the custom function created before
				refresh();
			}
		});
	};
}]);


crmControllers.controller('detailClientCtrl', ['$scope', '$routeParams', 'Client', function($scope, $routeParams, Client){

	Client.getList(function(result){
		$scope.datas = result;
		// get the item that we want details thx to the id sent in the route
		
		$scope.whichItem = $routeParams.itemId;
		$scope.clId = $scope.datas[$scope.whichItem]._id;
		console.log($scope.datas.length);
		for (var i = 0 ; i < $scope.datas.length ; i++) {
			if($scope.clId == $scope.datas[i]._id) {
				$scope.detailsClient = $scope.datas[i];
			};
		};

		console.log($scope.detailsClient);

			
	});

}]);

crmControllers.controller('loginCtrl', ['$scope', 'Client', '$location', 'ngDialog', '$cookies', function($scope, Client, $location, ngDialog, $cookies){
/*let cookieAdObject = {};

if($cookies.getObject('infosAdminlog')) {
		cookieAdObject = $cookies.getObject('infosAdminlog');
		$scope.adminName = cookieAdObject;
		console.log($scope.adminName);
	}*/


		$scope.error= false;
		Client.getAdmin(function(result) {
			$scope.admin = result;
			console.log(result);
			$scope.login = function(isValid){
				if(isValid){
					let mailOk = false;
					if($scope.admin[0].contactPerson.mail == $scope.userAdmin.mail) {
						mailOk = true;
					};

					Client.loginAdmin($scope.admin[0].contactPerson.pwd, $scope.userAdmin.pwd, function(result){
						
						$scope.resPwdAdmin = result;
						// email ok and password ok
						if(mailOk == true && result[0].data == true){
							console.log("tout ok !!");
							let adminName = { 
									idAdmin : $scope.admin[0]._id,
									firstname : $scope.admin[0].contactPerson.firstname,
									lastname : $scope.admin[0].contactPerson.lastname
							};
							$cookies.putObject ('infosAdminlog', adminName);
							/*let cookieAdObject = $cookies.getObject('infosAdminlog');
							console.log(cookieAdObject);*/
							ngDialog.close('formLogin');
							$location.path('/dashboard_Entreprise/clients/viewclient');
						}
						else if (mailOk == false && result[0].data == true){
							console.log(mailOk+"mail pas bon et pass bon");
							if ($scope.userAdmin) $scope.userAdmin.mail = "";
							$scope.error = true;
							$location.path('/');
						}
						else if (mailOk == true && result[0].data == false){
							console.log("mail bon mais password pas bon");
							if ($scope.userAdmin) $scope.userAdmin.pwd = "";
							$scope.error = true;
							$location.path('/');
						}
						else {
							console.log("aucun n'est bon");
							if ($scope.userAdmin) $scope.userAdmin.mail = "";
							if ($scope.userAdmin) $scope.userAdmin.pwd = "";
							$scope.error = true;
							$location.path('/');
						}
						console.log(result);
							
					});
				}	
				else {
					if ($scope.userAdmin) $scope.userAdmin.mail = "";
					if ($scope.userAdmin) $scope.userAdmin.pwd = "";
					$scope.error = true;
					$location.path('/');
				}
			};

		});
}]);


crmControllers.controller('mainCtrl', ['$scope', 'Client', '$cookies', '$location', function($scope, Client, $cookies, $location){

    $scope.disconnect = function () {
    	let cookieAdminObject = $cookies.getObject('infosAdminlog');
    	if (cookieAdminObject) {
    		console.log($cookies.getObject('infosAdminlog'));
    		$cookies.remove('infosAdminlog');
    		//console.log($cookies.getObject('infosAdminlog'));
    	}
    	
    };
    let cookieAdminObject = $cookies.getObject('infosAdminlog');
    if(!cookieAdminObject){
    	$location.path('/home');
    }


}]);


crmControllers.controller('createNewClientCtrl', ['$scope', 'Client', function($scope, Client){

	function voidArrays(){
		// prepare the object which will contain the new client
		$scope.newClient = {};
		$scope.newClient.billingInfo = {};
		$scope.newClient.deliveryInfo = {};
		$scope.newClient.vat= {};
	}

	// set the differents variables when we load the form
	voidArrays()


	$scope.createClient = function(isValid){
	}

	$scope.addClient = function(newClient, isValid){
		let checkCoord = $scope.checkCoord;

		$scope.uploadFile = function(file){
			console.log(file);
		};

		if (isValid){
			// initialize password for new client
			$scope.newClient.contactPerson.pwd = 'pass456';
			// combine prefixe and tva number
			$scope.newClient.vat.num = $scope.newClientPrefix + $scope.newClient.vat.num;

			if(checkCoord){
				console.log("hey c'est true");

				$scope.newClient.deliveryInfo.civility = $scope.newClient.billingInfo.civility;
				$scope.newClient.deliveryInfo.lastname = $scope.newClient.billingInfo.lastname;
				$scope.newClient.deliveryInfo.firstname = $scope.newClient.billingInfo.firstname;
				$scope.newClient.deliveryInfo.box = $scope.newClient.billingInfo.box;
				$scope.newClient.deliveryInfo.zip = $scope.newClient.billingInfo.zip;
				$scope.newClient.deliveryInfo.country = $scope.newClient.billingInfo.country;
				$scope.newClient.deliveryInfo.town = $scope.newClient.billingInfo.town;
				$scope.newClient.deliveryInfo.number = $scope.newClient.billingInfo.number;
				$scope.newClient.deliveryInfo.street = $scope.newClient.billingInfo.street;
			}
			else{
				console.log("hey c'est false");
			}

			Client.addClient($scope.newClient, function(result){
				// alert(result.message);
				console.log(result);
				alert('Données sauvegardées!')
				// clean the temp Arrays after sending the form for the next one
				voidArrays();
			});

			console.log($scope.newClient);
			console.log($scope.checkCoord);
			
			$scope.error = false;
		}
		else{
			console.log('Erreur! Non valide!');
			$scope.erreur = true;
		}
	}


	///REGEX validation
	$scope.onlyNumbers = /^[0-9,+-.]*$/;
	$scope.onlyLetters = /^[a-zA-ZÀ-ÿ]{1}(?!.*([\s\’-])\1)[a-zA-ZÀ-ÿ\s\’-]{0,28}[a-zA-ZÀ-ÿ]{1}$/;
	$scope.onlyMail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;


	////toggle particlulier/entreprise
	$scope.checkCoord = true;
	$scope.view1 = true;
	$scope.view2 = false;
	$scope.newClient.isCompany = false

	$scope.showView1 = function() {
		$scope.view1 = true;
		$scope.view2 = false;
		$scope.newClient.isCompany = false
	}
	$scope.showView2 = function() {
		$scope.view1 = false;
		$scope.view2 = true;
		$scope.newClient.isCompany = true
	}

	/// get params
	Client.getParams(function(result) {
		$scope.params = result;
		$scope.listContries = $scope.params[0].countries;
		$scope.listVatRate = $scope.params[0].vatRate;
		$scope.listVatPrefix = $scope.params[0].vatPrefix;
	});

}]);




crmControllers.controller('createNewFactureCtrl', ['$scope', 'Client', function($scope, Client){


		$scope.listClients = [];
		$scope.listQuotations = [];

		function voidArray () {
			$scope.articlesDb=[];
			$scope.newFacture = {};
		}

		voidArray();

		Client.getList(function(result) {
			$scope.clients = result;
			
			for (var i = 0; i < $scope.clients.length ; i++){
				$scope.listClients.push({'name' : $scope.clients[i].name,
										'id' : $scope.clients[i]._id});
				for (var j = 0; j < $scope.clients[i].quotations.length ; j++){
					$scope.listQuotations.push({'idCl' : $scope.clients[i]._id,
												'quotLink' : $scope.clients[i].quotations[j].link});
				}
			}

		});


			/// get params
		Client.getParams(function(result) {
			$scope.params = result;
			$scope.listRules = $scope.params[0].rules;
			$scope.listRefunds = $scope.params[0].refunds;
			$scope.listVatRate = $scope.params[0].vatRate;
		});

		Client.getAdmin(function(result) {
			$scope.listPayementInfo = [];
			$scope.admin = result;
			$scope.paymentInfo = $scope.admin[0].paymentInfo;
			$scope.articlesDb = $scope.admin[0].articles;
			for (var i = 0 ; i < $scope.paymentInfo.bank.length ; i++) {
				$scope.listPayementInfo.push($scope.paymentInfo.bank[i]);
			}
			for (var i = 0 ; i < $scope.paymentInfo.paypal.length ; i++) {
				$scope.listPayementInfo.push($scope.paymentInfo.paypal[i]);
			}

			console.log($scope.articlesDb);
		});

	//console.log($scope.listQuotations);
	console.log($scope.newFacture);
	let i= 0;

	$scope.addArticle = function(){
		$scope.articlesDb.push(i);
		i++;
	}

    /*$scope.setClient = function(id){
		alert(id);
	}*/



}]);
