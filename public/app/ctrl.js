app.controller('NaviCtrl', function($scope, $timeout, $http, cats, courses, $localStorage, func, $location) {

  $scope.getOthers = function() {
    for(key in $scope.courses) {
      if($scope.courses[key].productname == 'CSCS Cards') {
        $scope.cscsCourse = $scope.courses[key];
      }
      if($scope.courses[key].productname == 'Health & Safety Test') {
        $scope.cscsTest = $scope.courses[key];
      }
    }
    console.log($scope.cscsTest);
  }

  if($localStorage.bh !== undefined && $localStorage.bh.courses) {
    courses = $localStorage.bh.courses;
    $scope.courses = courses;

    $scope.getOthers();
  } else {
    $localStorage.bh = {};
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
      $scope.getOthers();
    })
  }

  var paramValue = $location.search().src;
  if(paramValue == 'sent') {
    $location.url($location.path());
    alert('Email sent! We will reply shortly. Thank you.');
  }

  if($location.path() == '/') {
    //$localStorage.bh = {};
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
    })
  }

  $scope.addCartSubmit = function(prodID) {
    func.addCart(prodID, function() {
      $location.path('/cart');
    })
  }

  if($location.path() == '/') {
    $('.nav-top-menu').removeClass('active');
    $('#home-menu').addClass('active')
  }
  if($location.path() == '/about') {
    $('.nav-top-menu').removeClass('active');
    $('#about-menu').addClass('active')
  }
  if($location.path() == '/cscs-cards') {
    $('.nav-top-menu').removeClass('active');
    $('#card-menu').addClass('active')
  }
  if($location.path() == '/cscs-test') {
    $('.nav-top-menu').removeClass('active');
    $('#test-menu').addClass('active')
  }

  $timeout(function() {
    $('body').show();
  }, 600)




})

app.controller('HomeCtrl', function($scope, $timeout, $http, cats, courses, details) {

  $scope.cats = cats;
  $scope.details = details;


  $scope.presentShow = function(catName) {
    console.log(catName);
    $('.pres-menu').removeClass('active');
    $('[data-presmenu="'+catName+'"]').addClass('active');
    $scope.presentCat = catName;
  }



  $timeout(function () {
    for(key in cats) {
      var eles = $('[data-row="'+cats[key].name+'"]');
      for(k in eles) {
        if(k > 3) {
          //$(eles[k])[0].remove();
        }
      }
    }
    $scope.presentShow('Construction');
  }, 500);

  $timeout(function () {

    /*if(loadCount == 1) {
      $scope.getProd();
    }

    loadCount++;*/

    // -------------------------------------------------------------
    //  select options
    // -------------------------------------------------------------

    $('.select-cat').on('click', function() {
      $('this').closest('div').find('select').slideToggle(110)
    });


     // -------------------------------------------------------------
    //  Home Carousel
    // -------------------------------------------------------------

        //Function to animate slider captions
        function doAnimations( elems ) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';

            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $myCarousel = $('#home-section'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

        //Initialize carousel
        $myCarousel.carousel();

        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);

        //Pause carousel
        $myCarousel.carousel('pause');

        //Other slides to be animated on carousel slide event
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });


    // -------------------------------------------------------------
    //  language Select
    // -------------------------------------------------------------


        $('.category-dropdown').on('click', '.category-change a', function(ev) {
            if ("#" === $(this).attr('href')) {
                ev.preventDefault();
                var parent = $(this).parents('.category-dropdown');
                parent.find('.change-text').html($(this).html());
            }
        });




    // -------------------------------------------------------------
    // Accordion
    // -------------------------------------------------------------

        $('.collapse').on('show.bs.collapse', function() {
            var id = $(this).attr('id');
            $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
            $('.list-title span').html('<i class="fa fa-minus"></i>');
        });

        $('#advanced-filter').on('hide.bs.collapse', function() {
            var id = $(this).attr('id');
            $('.list-title span').html('<i class="fa fa-plus"></i>');
        });


    // -------------------------------------------------------------
    //  Checkbox Icon Change
    // -------------------------------------------------------------


      $('input[type="checkbox"]').change(function(){
          if($(this).is(':checked')){
              $(this).parent("label").addClass("checked");
          } else {
              $(this).parent("label").removeClass("checked");
          }
      });



   // -------------------------------------------------------------
    //  tab view change
    // -------------------------------------------------------------

    $('.tab-view .grid-view-tab').on('click', function() {
        $('.tab-view .grid-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab small-view-tab').addClass('grid-view-tab');
    });

     $('.tab-view .small-view-tab').on('click', function() {
        $('.tab-view .small-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .grid-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab grid-view-tab').addClass('small-view-tab');
    });

    $('.tab-view .list-view-tab').on('click', function() {
        $('.tab-view .list-view-tab').addClass('active');
        $('.tab-view .grid-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('grid-view-tab small-view-tab').addClass('list-view-tab');

    });



  }, 500);





  $timeout(function () {

    $("#top-featured").owlCarousel({
        items:4,
        nav:true,
        autoplay:true,
        dots:true,
        autoplayHoverPause:true,
        loop:true,
        nav:false,
        navText: [
    "<i class='fa fa-angle-left '></i>",
    "<i class='fa fa-angle-right'></i>"
    ],
        responsive: {
            0: {
                items: 1,
                slideBy:1
            },
            480: {
                items: 2,
                slideBy:1
            },
            991: {
                items: 3,
                slideBy:1
            },
            1000: {
                items: 4,
                slideBy:1
            },
        }

    });
  }, 3200);




}) // ctrl end


app.controller('CatCtrl', function($scope, $timeout, $http, cats, $location, $routeParams, Slug, courses, $localStorage, func) {
    $scope.catCourse = [];
    $scope.catName = $routeParams.catName;
    $scope.catNameDispay = func.unslug($scope.catName);
    if($localStorage.bh !== undefined && $localStorage.bh.courses !== undefined) {
      courses = $localStorage.bh.courses;
      $scope.courses = courses;
    } else {
      func.getCourses(function(respCourses) {
        courses = respCourses;
        $localStorage.bh.courses = courses;
        $scope.courses = courses;
      })
    }

    $scope.cats = cats;


    var loadCourse = function(everythingElse){
      var interval = setInterval(function(){
        if(typeof $scope.courses !== 'undefined'){
          clearInterval(interval);
          everythingElse();
        }
      },1);
    };

    loadCourse(function(){
      for(key in $scope.courses) {
          if(Slug.slugify($scope.courses[key].productcategory) == $scope.catName) {
            $scope.catCourse.push($scope.courses[key]);
          }
      }
    });

})

app.controller('CourseCtrl', function($scope, $timeout, $http, cats, $location, $routeParams, courses, Slug, $localStorage, func) {

  $scope.courseSlug = $routeParams.courseName;

  if($localStorage.bh !== undefined && $localStorage.bh.courses !== undefined) {
    courses = $localStorage.bh.courses;
    $scope.courses = courses;
  } else {
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
    })
  }

  var loadCourse = function(everythingElse){
    var interval = setInterval(function(){
      if(typeof $scope.courses !== 'undefined'){
        clearInterval(interval);
        everythingElse();
      }
    },1);
  };

  loadCourse(function(){
    for(key in $scope.courses) {
        if(Slug.slugify($scope.courses[key].productname) == $scope.courseSlug) {
            $scope.currCourse = $scope.courses[key];
        }
    }
    console.log($scope.currCourse);
  });


})

app.controller('CartCtrl', function($scope, $localStorage, $location, func, $timeout, $http) {
  $scope.location = $location;
  $scope.customerData = {};
  $scope.cardDetails = {};
  if($localStorage.bh !== undefined && $localStorage.bh.cart) {
    $scope.cart = $localStorage.bh.cart;
    if($localStorage.bh.customerData !== undefined) {
        $scope.customerData = $localStorage.bh.customerData;
    }
  }



  $scope.changeQty = function(key) {
    console.log($scope.cart);
  }

  $scope.removeItem = function(key) {
    $scope.cart.splice(key, 1);
    $localStorage.bh.cart = $scope.cart;
  }

  $scope.cartTotal = function() {
    var total = 0;
    for(var i = 0; i < $localStorage.bh.cart.length; i++){
        var product = $localStorage.bh.cart[i];
        total += (product.unit_price * product.qty);
    }
    total = Math.round(total * 100) / 100;
    $scope.customerData.totalCost = Math.round(total * 100) / 100;
    if($localStorage.bh.customerData !== undefined) {
      $localStorage.bh.customerData.totalCost = total;
    }


    total = Math.round(total * 100) / 100;
    return total;
  }

  $scope.getPaypalToken = function(cb) {
    func.getPaypalToken(function(resp) {
      $scope.paypalToken = resp.data.token;
      cb($scope.paypalToken);
    });
  }

  $scope.goPayment = function() {
    var dateSplit = $scope.customerData.dob.split('-');
    $scope.customerData.dob = dateSplit[2]+'-'+dateSplit[1]+'-'+dateSplit[0];
    var cartString = ''
    for(key in $localStorage.bh.cart) {
      cartString += $localStorage.bh.cart[key].qty+' x '+$localStorage.bh.cart[key].productname+' ('+$localStorage.bh.cart[key].product_no+'), ';
    }
    $scope.customerData.cart = cartString;
    func.addLead($scope.customerData, function(resp) {
      $scope.customerData.crmID = resp.data.replace(/\s/g,'');
      $scope.getPaypalToken(function(token) {
        $scope.customerData.paypalToken = token;
        $localStorage.bh.customerData = $scope.customerData;
        $location.path('/payment');
      })
    })
  }

  $scope.cardTypes = [
    {name: 'Please Select Card Type', value: 0},
    {name: 'Mastercard', value: 'mastercard'},
    {name: 'Visa',  value: 'visa'}
  ];
  $scope.cardDetails.type = $scope.cardTypes[0];

  $scope.pay = function() {

    $('#spinner').removeClass('hide');
    $scope.paypalVaultObj = {
      "number": $scope.cardDetails.number,
      "type": $scope.cardDetails.type.value,
      "expire_month": $scope.cardDetails.expire_month,
      "expire_year": $scope.cardDetails.expire_year,
      "cvv2": $scope.cardDetails.cvv2,
      "first_name": $scope.customerData.first_name,
      "last_name": $scope.customerData.last_name,
      "billing_address":{
        "line1": $scope.customerData.billingAddress,
        "city": $scope.customerData.city,
        "country_code":"GB",
        "postal_code": $scope.customerData.postcode,
        "state": $scope.customerData.county,
        "phone": $scope.customerData.phone
      },
      "external_customer_id": $scope.customerData.crmID
    };

    $http({
      method: 'POST',
      //url: 'https://api.sandbox.paypal.com/v1/vault/credit-cards/',
      url: 'https://api.paypal.com/v1/vault/credit-cards/',
      data: $scope.paypalVaultObj,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$scope.customerData.paypalToken
      }}).then(function(result) {
           $scope.customerData.vaultID = result.data.id;
           $scope.paypalChargeObj = {
              "id":"CPPAY-13U467758H032001PKPIFQZI",
              "intent":"sale",
              "payer":{
                "payment_method":"credit_card",
                "funding_instruments":[{
                    "credit_card_token":{
                      "credit_card_id": $scope.customerData.vaultID,
                      "external_customer_id": $scope.customerData.crmID
                    }
                  }
                ]
              },
              "transactions":[ {
                  "amount":{
                    "total": $scope.customerData.totalCost,
                    "currency":"GBP"
                  },
                  "description":"Payment by vaulted credit card."
                }
              ]
            }

            $http({
              method: 'POST',
              //url: 'https://api.sandbox.paypal.com/v1/payments/payment',
              url: 'https://api.paypal.com/v1/payments/payment',
              data: $scope.paypalChargeObj,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+$scope.customerData.paypalToken
              }}).then(function(result) {
                console.log(result);
                $('#spinner').addClass('hide');
                $scope.customerData.payID = result.data.transactions[0].related_resources[0].sale.id;
                $scope.customerData.payState = result.data.transactions[0].related_resources[0].sale.state;
                $scope.customerData.time = result.data.create_time;
                $location.path('/checkout-success');
                func.addPayDetails($scope.customerData, function() {

                })
              }, function(error) {
                $location.path('/checkout-error');
              });



       }, function(error) {
         if(error.data.name == 'VALIDATION_ERROR') {
           alert(error.data.details[0].field+' Field: '+error.data.details[0].issue);
           $('#spinner').addClass('hide');
           return false;
         }
       });

  }




})
