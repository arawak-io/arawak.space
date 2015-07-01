'use strict';

// Huts controller
angular.module('huts').controller('HutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Huts',
	function($scope, $stateParams, $location, Authentication, Huts) {
		$scope.authentication = Authentication;


		$scope.prop = {
		    'type': 'select',
		    'name': 'Service',
		    'value': 'Service 3',
		    'values': [ 'Service 1', 'Service 2', 'Service 3', 'Service 4']
		  };

		// Create new Hut
		$scope.create = function() {
			// Create new Hut object
			var hut = new Huts ({
				name: this.name,
				product: this.product

			});

			// Redirect after save
			hut.$save(function(response) {
				$location.path('huts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Hut
		$scope.remove = function( hut ) {
			if ( hut ) { hut.$remove();

				for (var i in $scope.huts ) {
					if ($scope.huts [i] === hut ) {
						$scope.huts.splice(i, 1);
					}
				}
			} else {
				$scope.hut.$remove(function() {
					$location.path('huts');
				});
			}
		};

		// Update existing Hut
		$scope.update = function() {
			var hut = $scope.hut ;

			hut.$update(function() {
				$location.path('huts/' + hut._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Huts
		$scope.find = function() {
			$scope.huts = Huts.query();
		};

		// Find existing Hut
		$scope.findOne = function() {
			$scope.hut = Huts.get({
				hutId: $stateParams.hutId
			});
		};
	}
]);
