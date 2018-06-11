(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .service("spa-demo.subjects.uiSubjects", UiSubjects);

  UiSubjects.$inject = ["$rootScope"];

  function UiSubjects($rootScope) {
   
    var service = this;
    service.imageIdx = null;
    service.isCurrentImageIndex = isCurrentImageIndex;
    service.setCurrentImage = setCurrentImage;
    service.getCurrentImageIndex = getCurrentImageIndex;

    return;
    ////////////////

    function isCurrentImageIndex(imageid) {
      return service.imageIdx === imageid;
    }
    
    function setCurrentImage(imageid) {
      service.imageIdx = imageid;
    }   

    function getCurrentImageIndex() {
      return service.imageIdx;
    }
  }

})();
