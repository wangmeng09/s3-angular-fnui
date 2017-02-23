/**
 * Created by chent on 2017/1/18.
 */
var config = {
    'custid':'s3',
    'userservice':'usermanage'
};


var myApp = angular.module("myApp",['ui.router','oc.lazyLoad','ngAnimate','icbc.espresso'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/app');
        $stateProvider

        //公共部分
            .state('app',{
                url:'/app',
                title:'首页',
                templateUrl:'views/public/app.html',
                resolve:{
                    MyappService:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/public/js/app-ctrl.js',
                            'views/public/js/app-serv.js'
                        ])
                    }]
                }
            })
            .state('about', {
                url:'/about',
                templateUrl:'views/public/about.html'
            })
            .state('error',{
                url:'/error',
                templateUrl:'404.html'
            })


            //产品模块
            .state('product',{
                url:'/product',
                templateUrl: 'views/public/main.html',
                abstract:true,
                resolve:{
                    orderService:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/product/js/product-ctrl.js',
                            'views/product/js/product-serv.js',
                            'views/product/js/product-dire.js',
                            'views/product/css/product.css'
                        ])
                    }]
                },
                controller:function($scope){
                    $scope.showCart = true;
                }
            })
            .state('product.productList',{
                url:'/productList',
                title:'产品',
                templateUrl:'views/product/productList.html',
                controller:'ProductCtrl'
            })
            .state('product.productSearch',{
                url:'/productSearch',
                title:'产品搜索',
                backState:'product.productList',
                templateUrl:'views/product/productSearch.html'
            })
            .state('product.productDetail',{
                url:'/productDetail/:productId',
                backState:'product.productList',
                title:'产品详情',
                templateUrl:'views/order/productDetail.html',
                controller:'ProductDetailCtrl'
            })

            //购物车和订单部分
            .state('order',{
                url:'/order',
                templateUrl: 'views/public/main.html',
                abstract:true,
                resolve:{
                    orderService:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/order/css/order.css',
                            'views/order/js/order-ctrl.js',
                            'views/order/js/order-dire.js',
                            'views/order/js/order-serv.js'
                        ])
                    }]
                }
            })

            //购物车
            .state('order.cart',{
                url:'/cart',
                title:'购物车',
                backState:'product.productList',
                templateUrl:'views/order/cart.html'
            })

            //提交订单
            .state('order.addOrder',{
                url:'/addOrder',
                templateUrl: 'views/order/addOrder.html',
                title:"提交订单",
                backState:"order.cart",
                //controller:'addOrderCtrl'
            })

            //确认订单
            .state('order.confirm',{
                url:'/confirm',
                templateUrl: 'views/order/orderConfirm.html',
                title:'确认订单',
                backState:'order.cart'
            })
            //订单成功
            .state('order.sucess',{
                url:'/sucess',
                templateUrl: 'views/order/orderSucess.html',
                title:'订单成功',
                backState:'product.productList'
            })

        /**
         *  我的订单
         */
                .state('myorder',{
                    url:'/myorder',
                    templateUrl:'views/public/main.html',
                    abstract:true,
                    resolve:{
                        myorderService:['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'views/myorder/js/myorder-ctrl.js',
                                    'views/myorder/js/myorder-serv.js',
                                    'views/myorder/js/myorder-dire.js',
                                    'views/myorder/css/myorder.css'
                                ]);
                        }]
                    }
                })
                .state('myorder.orderList',{
                    url:'/orderList',
                    title:'订单',
                    templateUrl:'views/myorder/orderList.html',
                    controller:'OrderListCtrl'
                })
                .state('myorder.orderDetail',{
                    url:'/orderDetail/:orderId',
                    backState:'myorder.orderList',
                    title:'订单详情',
                    templateUrl:'views/myorder/orderDetail.html',
                    controller:'OrderDetailCtrl'
                })
                .state('search',{
                url:'app/search',
                    title:'查找订单',
                templateUrl:'views/public/search.html',
                controller:'SearchCtrl'
                    //controller:'OrderListCtrl'
                })


        /**
         *         支付信息
         */
                .state('payment',{
                    url:'/payment',
                    templateUrl:'views/public/main.html',
                    abstract:true,
                    resolve:{
                        paymentService:['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'views/payment/js/payment-ctrl.js',
                                'views/payment/js/payment-serv.js',
                                'views/payment/js/payment-dire.js',
                                'views/payment/css/payment.css'
                            ]);
                        }]
                    }
                })
                .state('payment.paymentList',{
                    url:'/paymentList',
                    title:'付款',
                    backState:'app',
                    templateUrl:'views/payment/paymentList.html',
                    controller:'PaymentListCtrl'
                })
                .state('payment.paymentDetail',{
                    url:'/paymentdetail/:paymentId',
                    title:'付款详情',
                    backState:'payment.paymentList',
                    templateUrl:'views/payment/paymentDetail.html',
                    controller:'PaymentDetailCtrl'
                })

            /**
             * 发货信息
             */
                .state('delivery',{
                    url:'/delivery',
                    templateUrl:'views/public/main.html',
                    abstract:true,
                    resolve:{
                        deliveryService:['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'views/delivery/js/delivery-ctrl.js',
                                'views/delivery/js/delivery-serv.js',
                                'views/delivery/js/delivery-dire.js',
                                'views/delivery/css/delivery.css'
                            ]);
                        }]
                    }
                })
                .state('delivery.deliveryList',{
                    url:'/deliveryList',
                    title:'我的发货单',
                    templateUrl:'views/delivery/deliveryList.html',
                    controller:'DeliveryListCtrl'
                })
                .state('delivery.deliveryDetail',{
                url:'/deliveryDetail',
                    title:'发货详情',
                    backState:'delivery.deliveryList',
                    templateUrl:'views/delivery/deliveryDetail.html',
                    controller:'DeliveryDetailCtrl'
                })



            /**
             * 个人信息
             */
            .state('profile',{
                url:'/profile',
                templateUrl:'views/public/main.html',
                abstract:true,
                resolve:{
                    profileService:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/profile/js/profile-ctrl.js',
                            'views/profile/css/personal_center.css'
                        ]);
                    }]
                }
            })
            .state('profile.info',{
                url:'/info',
                title:'个人信息',
                templateUrl:'views/profile/info.html',
                //controller:'InfoCtrl'
            })
            .state('profile.myAccount',{
                url:'/myAccount',
                title:'账户信息',
                backState:'profile.info',
                templateUrl:'views/profile/myAccount.html',
                //controller:'addAddressCtrl'
            })
            .state('profile.myAddress',{
                url:'/info',
                title:'地址管理',
                backState:'profile.info',
                templateUrl:'views/profile/myAddress.html',
                //controller:'addAddressCtrl'
            })
            .state('profile.changePw',{
                url:'/info',
                title:'修改密码',
                backState:'profile.info',
                templateUrl:'views/profile/changePw.html',
            //    controller:'InfoCtrl'
            })
            .state('profile.addAddress',{
                url:'/addAddress',
                title:'新增地址',
                backState:'profile.addAddress',
                templateUrl:'views/profile/addAddress.html',
                //controller:'InfoCtrl'
            })
            .state('profile.editAddress',{
                url:'/editAddress',
                title:'编辑收货地址',
                backState:'profile.addAddress',
                templateUrl:'views/profile/editAddress.html',
                //controller:'InfoCtrl'
            })

            /**
             * 认证
             */
            .state('account',{
                url:'/account',
                template:'<div class="main-view" ng-view ui-view></div>',
                abstract:true,
                resolve:{
                    accountService:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/account/assets/rsaoath.min.js',
                            'views/account/css/account.css',
                            'views/account/js/account-dire.js',
                            'views/account/js/account-ctrl.js',
                            'views/account/js/account-serv.js'
                        ]);
                    }]
                }
            })
            .state('account.login',{
                url:'/login',
                templateUrl:'views/account/login.html',
                controller:'LoginCtrl'
            })
            .state('account.checkMobile',{
                url:'/checkMobile',
                templateUrl:'views/account/getCode.html'
            })
            .state('account.checkSuccess',{
                url:'/checkSuccess',
                templateUrl:'views/account/checkCode.html'
            })

    }])
    .run(['$rootScope', '$state', '$stateParams','$es', function($rootScope, $state, $stateParams,$es) {
        for(var key in config){
            $es.setConfig(key,config[key]);
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;

            $rootScope.title = toState.title;
            $rootScope.showBack = toState.backState != null;
            $rootScope.backState = toState.backState;
        });

        var loginState = "account.login";
        var rootState = "app";

        //userinfo checking part
        $rootScope.$on("$stateChangeStart", function(event,toState,toParams,fromState,fromParams){
            var valid =  false;
            if(toState.name === loginState)
                valid = true;
            else if(!valid){
                //TESTSTART
                if(true){

                }else{
                //TESTEND

                //check userinfo
                 $es.userinfo = $es.java("userInfoBean.getUserData");
                 if($es.userinfo.status == "000" || $es.userinfo.retCode == "200"){
                 $es.userinfo = $es.userinfo.data.user;

                     $rootScope.username = $es.userinfo.userName;
                     $rootScope.customerId = $es.userinfo.customerId;


                 //角色
                 var roleId = $es.userinfo.roles[0].id;
                 //根据角色判断首页的不同显示
                 //应该是来自后台的状态才比较合理
                 //新增一个状态表，来保存状态
                 }else {
                event.preventDefault();
                $state.go(loginState);
            }
                //TESTSTART
                }
                //TESTEND
            }
        });
    }])
    .controller("RootCtrl",['$scope','$state','$es',function ($scope,$state,$es) {
        //用户信息
        var userInfo = $es.userinfo;
        $scope.userName = userInfo.userName;
        $scope.unionId = userInfo.unionId;

        //展示首页

        //如果角色不同，首页内容照例也不同
        var main = {
            1:[
                {name:'',state:''}
            ],
            2:[],
            3:[]
        };

        var footer = {
            1:[
                {name:'首页',state:''}
            ],
            2:[],
            3:[]
        };
    }]);