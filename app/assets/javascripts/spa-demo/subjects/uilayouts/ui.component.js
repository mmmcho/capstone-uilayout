(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdUiImages", {
      templateUrl: uiImagesTemplateUrl,
      controller: UiImagesController,
      require: {
        areas:"^sdAreas"
      }
    })
    .component("sdUiThings", {
      templateUrl: uiThingsTemplateUrl,
      controller: UiThingsController,
      require: {
        tabsController: "^^sdTabs",
         areas: "^sdAreas"
      }
    })
    ;

  uiImagesTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function uiImagesTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.ui_images_html;
  }    
  
  uiThingsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function uiThingsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.ui_things_html;
  }   

  UiImagesController.$inject = ["$scope",
                                     "spa-demo.subjects.Image", 
                                     "spa-demo.subjects.uiSubjects"];
  function UiImagesController($scope, Image, uiSubjects) {
    var vm=this;
    vm.imageClicked = imageClicked;
    vm.isCurrentImage = uiSubjects.isCurrentImageIndex;

    vm.$onInit = function() {
      console.log("UiImagesController",$scope);
      vm.images = Image.query();
    }

    return;
    //////////////
    function imageClicked(imageid) {
      console.log("image clicked:", imageid);
      uiSubjects.setCurrentImage(imageid);
      //vm.areas.showThings(true);
    }
  }

UiThingsController.$inject = ["$scope",
                                     "spa-demo.subjects.uiSubjects",
                                     "spa-demo.subjects.ImageThing"];
  function UiThingsController($scope,uiSubjects,ImageThing) {
    var vm=this;
    vm.things = null;

    vm.$onInit = function() {
      console.log("UiThingsController",$scope);
      vm.areas.showThings(false);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return uiSubjects.getCurrentImageIndex(); }, 
        function(imageid) { 
          if (imageid != null) {
            ImageThing.query({image_id:imageid}).$promise.then(
              function(things) {
                console.log("inside function things ", things);
                if (things.length === 0) {
                  vm.areas.showThings(false);
                } else {
                  vm.areas.showThings(true);
                }
                  vm.tabsController.refreshTabs();
                  vm.things = things;
                  })
                }
              },
              function(error) {
                console.log(error);
              }); 
            }; 
            
           
         
    return;

    //////////////  

   
  }
  

})();
