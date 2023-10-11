$(function () {
  // 切換PC/Mobile 選單
  // var switchMainMenu = true; //true顯示漢堡選單，false隱藏漢堡選單
  // var switchDefaultMenu = true; //true顯示預設選單，false隱藏預設選單
  // var menuSwitch = true; //開啟選單切換功能

  //此為方便前台觀看版型變化用，實際請更改上方的參數
  // if (menuSwitch) {
  //   $('.menu').addClass('active');
  // }

  // $('.controlMenu').on('click', '#switch1', function () {
  //   if ($(this).prop('checked')) {
  //     switchMainMenu = true;
  //     menuCheck();
  //   } else {
  //     switchMainMenu = false;
  //     menuCheck();
  //   }
  // });
  // $('.controlMenu').on('click', '#switch2', function () {
  //   if ($(this).prop('checked')) {
  //     switchDefaultMenu = true;
  //     menuCheck();
  //   } else {
  //     switchDefaultMenu = false;
  //     menuCheck();
  //   }
  // });

  document.createElement('picture');
  let checkMenu = document.querySelector('body').classList.contains('pcMenuUse');
  /*-----------------------------------*/
  ///////////////// 變數 ////////////////
  /*-----------------------------------*/
  var _window = $(window),
    ww = _window.outerWidth(),
    wh = _window.height(),
    _body = $('body'),
    wwNormal = 1400,
    wwMedium = 992,
    wwSmall = 768,
    wwxs = 576;
  // /*-----------------------------------*/
  //////////// nojs 先移除////////////////
  /*-----------------------------------*/
  $('html').removeClass('no-js');
  /*-----------------------------------*/
  /////// header選單 tab及 fix設定////////
  /*-----------------------------------*/
  var _menu = $('.menu'),
    _megamenu = $('.megamenu');
  _menu.find('li').has('ul').addClass('hasChild');
  _megamenu.find('li').has('ul').addClass('hasChild');
  var liHasChild = _menu.find('li.hasChild'),
    liHasChild2 = _megamenu.children('ul').children('li.hasChild');
  /*-----------------------------------*/
  ////////////// 行動版選單切換////////////
  /*-----------------------------------*/
  _body.prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>');
  $('header .container').prepend('<button type="button" class="searchCtrl">查詢</button>');
  $('.secNavList').append('<button type="button" class="sidebarCtrl">側欄選單</button>');

  var menu_status = false,
    _sidebar = $('.sidebar'),
    _search = $('.search'),
    _nav = $('.navigation'),
    _sidebarClose = $('.sidebarClose'),
    _sidebarCtrl = $('.sidebarCtrl'),
    _overlay = $('.menu_overlay'),
    _mArea = $('.m_area');
  _sidebarCtrl.append('<span></span><span></span><span></span>');
  _mArea = $('.m_area');
  // -------------------------------------------- 打開選單 function

  $(window).on('load', () => {
    $('.sidebarCtrl').on('keydown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      showSidebar();
      setTimeout(() => {
        // $('.menu > ul > li:first-child > a').focus();
        $('.sidebar .sidebarClose').focus();
      }, 100);
    });
    $('.menu > ul > li > a').on('keydown', function (e) {
      if (e.originalEvent.key === 'Tab' && !e.originalEvent.shiftKey) {
        if ($(this).parent('li').is('.hasChild')) {
          $(this).parent('li').siblings('li').find('ul').slideUp('fast');
          $(this).siblings('ul').slideToggle('fast');
        }
      } else if (e.originalEvent.key === 'Tab' && e.originalEvent.shiftKey) {
        $(this).parent('li').siblings('li').find('ul').slideUp('fast');
        if ($(this).parent('li').is('.hasChild')) {
          e.preventDefault();
          $(this).siblings('ul').slideToggle('fast');
          $(this).siblings('ul').find('a').last().focus();
        } else if ($(this).parent('li').index() === 0) {
          e.preventDefault();
          $('.sidebar .sidebarClose').focus();
        }
      }
    });
    $('.menu > ul > li > ul > li > a').on('keydown', function (e) {
      if (e.originalEvent.key === 'Tab' && e.originalEvent.shiftKey) {
        if ($(this).parent('li').index() === 0 && $(this).parent('li').parents('li').index() !== 0) {
          e.preventDefault();
          $(this)
            .parents('ul')
            .parents('ul')
            .children('li')
            .eq($(this).parent('li').parents('li').index() - 1)
            .children('a')
            .last()
            .focus();
        } else if ($(this).parent('li').index() === 0 && $(this).parent('li').parents('li').index() === 0) {
          e.preventDefault();
          $('.sidebar .sidebarClose').focus();
          $('.menu > ul ul').slideUp('fast');
        }
      }
    });
    $('.sidebar .sidebarClose').on('keydown', function (e) {
      if (e.originalEvent.key === 'Tab' && !e.originalEvent.shiftKey) {
        e.preventDefault();
        $('.menu > ul > li > a').eq(0).focus();
      } else if (e.originalEvent.key === 'Tab' && e.originalEvent.shiftKey) {
        e.preventDefault();
      } else {
        e.preventDefault();
        hideSidebar();
        setTimeout(() => {
          $('#aC').focus();
        }, 100);
      }
    });
    $('.sidebar .navlist a')
      .last()
      .on('keydown', function (e) {
        if (e.originalEvent.key === 'Tab' && !e.originalEvent.shiftKey) {
          e.preventDefault();
          hideSidebar();
          setTimeout(() => {
            $('#aC').focus();
          }, 100);
        }
      });
  });

  function showSidebar() {
    _sidebar.show();
    _mArea.show().addClass('open');
    _mArea.animate({ 'margin-right': 0 }, 400, 'easeOutQuint');
    _body.addClass('noscroll');
    _overlay.fadeIn();
    $('.m_search').hide();
    search_mode = false;
  }
  // -------------------------------------------- 縮合選單 function
  function hideSidebar() {
    _mArea.animate({ 'margin-right': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function () {
      _sidebar.fadeOut(200);
      _mArea.removeClass('open');
      _mArea.hide();
    });
    _body.removeClass('noscroll');
    _overlay.fadeOut();
    liHasChild.children('ul').hide();
  }
  // -------------------------------------------- 打開選單動作
  _sidebarCtrl.off().click(function (e) {
    showSidebar();
    e.preventDefault();
  });
  // -------------------------------------------- overlay關閉選單
  _overlay
    .add(_sidebarClose)
    .off()
    .click(function () {
      hideSidebar();
    });
  _overlay.off('mouseenter');
  // -------------------------------------------- 無障礙tab設定
  // -------------------------------------------- menu
  liHasChild.children('a').keyup(function () {
    $(this).siblings('ul').fadeIn();
    $(this).parent('li').siblings().find('ul').hide();
  });
  _menu.find('li').keyup(function () {
    $(this).siblings().children('ul').hide();
  });
  _menu.find('li:last>a').focusout(function () {
    _menu.find('li ul').hide();
  });
  // megamenu
  liHasChild2.children('a').keyup(function () {
    $(this).siblings('ul').fadeIn();
    $(this).siblings('ul').find('ul').fadeIn();
    $(this)
      .parent('li')
      .siblings()
      .focus(function () {
        $(this).hide();
      });
  });
  _megamenu
    .children('ul')
    .children('li')
    .keyup(function () {
      $(this).siblings().children('ul').hide();
    });
  _megamenu.find('li:last>a').focusout(function () {
    _menu.find('li ul').hide();
  });

  // 先複製過去
  _nav.clone().prependTo(_mArea);
  _menu.clone().prependTo(_mArea);
  _megamenu.clone().prependTo(_mArea);
  _search.clone().prependTo(_body).removeClass('search').addClass('m_search');
  $('.sidebar').find('.sidebarCtrl,.loginBtn').remove();
  var liHasChild_level1 = $('aside .menu ul').children('li.hasChild'),
    liHasChild_level2 = $('aside .menu ul ul').children('li.hasChild'),
    liHasChild_level3 = $('aside .menu ul ul ul').children('li.hasChild'),
    subMenuWidth = liHasChild.first().children('ul').outerWidth();
  // megamenu
  var liHasChild2_level1 = $('aside .megamenu ul').children('li.hasChild'),
    liHasChild2_level2 = $('aside .megamenu ul ul').children('li.hasChild'),
    liHasChild2_level3 = $('aside .megamenu ul ul ul').children('li.hasChild'),
    subMenuWidth2 = liHasChild2.first().children('ul').outerWidth();
  var stickyMenuTop = Math.floor($('.header .menu').offset().top);

  // $('.sidebarCtrl').keyup(function () {
  //   showSidebar();
  //   $('.sidebar .m_area .menu ul li:first a').focus();
  // });
  // $('.sidebar .navigation ul li:last a').blur(function () {
  //   hideSidebar();
  // });

  function mobileUse() {
    ww = _window.outerWidth();
    if (ww < wwSmall) {
      _body.addClass('onMobile');
      _body.removeClass('pcMenuUse');
    } else if (checkMenu) {
      _body.addClass('pcMenuUse');
      _body.removeClass('onMobile');
    }
    /*-----------------------------------*/
    /////////////// 手機版設定 /////////////
    /*-----------------------------------*/
    menu_status = false;
    // _sidebar.hide();
    // _overlay.hide();
    _mArea.css({
      'margin-right': _mArea.width() * -1 + 'px',
    });
    liHasChild_level1.on({
      mouseenter: function () {
        $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
      },
      mouseleave: function () {
        $(this).parent().siblings('ul').hide();
        $(this).children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      },
    });
    // 副選單點出
    liHasChild.off().on('mouseenter,mouseleave');
    liHasChild.on('touchstart', function () {
      $(this).off('mouseenter,mouseleave');
    });
    // 第一層選單
    liHasChild_level1.off().on('click', function (e) {
      $(this).siblings('li').find('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
    });
    // 第二層選單
    liHasChild_level2.off().on('click', function (e) {
      $(this).siblings('li').children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
    });
    // 第三層選單
    liHasChild_level3.off().on('click', function (e) {
      e.preventDefault();
    });
    //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
    $('.sidebar .menu .hasChild')
      .children('a')
      .off()
      .on('click', function (e) {
        e.preventDefault();
      });
    // megamenu
    liHasChild2_level1.on({
      mouseenter: function () {
        $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
      },
      mouseleave: function () {
        $(this).parent().siblings('ul').hide();
        $(this).children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      },
    });
    // 副選單點出
    liHasChild2.off().on('mouseenter,mouseleave');
    liHasChild2.on('touchstart', function () {
      $(this).off('mouseenter,mouseleave');
    });
    // 第一層選單
    liHasChild2_level1.off().on('click', function (e) {
      $(this).siblings('li').find('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
    });
    // 第二層選單
    liHasChild2_level2.off().on('click', function (e) {
      $(this).siblings('li').children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
      $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
    });
    // 第三層選單
    liHasChild2_level3.off().on('click', function (e) {
      e.preventDefault();
    });
    //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
    $('.sidebar .megamenu .hasChild')
      .children('a')
      .off()
      .on('click', function (e) {
        e.preventDefault();
      });
    //
    _body.off('touchmove');
    $('.m_search').hide();
    $('.language').find('ul').hide();
  }
  function pcUse() {
    if (ww > wwSmall) {
      _body.removeClass('noscroll');
      // $('.m_search').hide();
      // $('.language').find('ul').hide();
    }
    /*-----------------------------------*/
    /////////////// PC版設定 /////////////
    /*-----------------------------------*/
    search_mode = false;
    // 副選單滑出
    liHasChild.on({
      mouseenter: function () {
        $(this).children('ul').stop(true, false).fadeIn();
      },
      mouseleave: function () {
        $(this).parent().siblings('ul').hide('fast');
        $(this).children('ul').stop(true, false).fadeOut('fast');
      },
    });
    liHasChild.off('click');
    // megamenu
    // 副選單滑出
    liHasChild2.on({
      mouseenter: function () {
        $(this).children('ul').stop(true, false).fadeIn();
      },
      mouseleave: function () {
        $(this).parent().siblings('ul').hide();
        $(this).children('ul').stop(true, false).fadeOut();
      },
    });
    liHasChild2.off('click');
    $('.megamenu').children('ul').children('li').children('ul').hide();
    // 傳統menu
    if (_menu.lenght > 0) {
      liHasChild.on({
        mouseenter: function () {
          $(this).children('ul').stop(true, false).fadeIn();
        },
        mouseleave: function () {
          $(this).parent().siblings('ul').hide();
          $(this).children('ul').stop(true, false).fadeOut();
        },
      });
    }
    // megamenu
    if (_megamenu.lenght > 0) {
      liHasChild2.on({
        mouseenter: function () {
          $(this).children('ul').stop(true, false).fadeIn();
        },
        mouseleave: function () {
          $(this).parent().siblings('ul').hide();
          $(this).children('ul').stop(true, false).fadeOut();
        },
      });
    }
    // 如果點在外面
    // $(document).on('touchend click', function(e) {
    //     var target = e.target;
    //     if (!$(target).is('.menu li a')) {
    //         $('.menu').find('li ul').hide();
    //     }
    // });
  }
  function menuCheck() {
    ww = _window.outerWidth();

    if (ww < wwSmall) {
      mobileUse();
      pcUse();
    } else {
      mobileUse();
      pcUse();
    }
  }
  //行動版/電腦版切換
  var resizeTimer;
  _window.on('resize', function (event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // search_mode = true;
      hideSidebar();
      $('.m_search').hide();
      menuCheck();
    }, 50);
  });
  menuCheck();
  // search設定
  var search_mode = false;
  var _searchCtrl = $('.searchCtrl');
  $('.m_search').hide();

  function searchToggle() {
    if (!search_mode) {
      $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
      // $('.m_search').find('input[type="text"]').focus();
      search_mode = true;
      // prevent Android sofr Keyboard
      var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
      if (isAndroid) {
        _window.off('resize');
      }
    } else {
      $('.m_search').hide();
      search_mode = false;
    }
  }
  _searchCtrl.off().on('click', function (e) {
    searchToggle();
  });
  // 如果點在外面
  $(document.body).click(function (e) {
    if (search_mode) {
      searchToggle();
      search_mode = false;
    }
  });
  $('.m_search ,.searchCtrl').click(function (e) {
    e.stopPropagation();
  });
  // fixed navbar
  var resizeNavTimer;
  if ($('header .menu').length > 0) {
    menuH = Math.floor(_menu.outerHeight());

    function stickynavBar() {
      windowW = _window.outerWidth();
      if (windowW >= wwSmall && _window.scrollTop() > stickyMenuTop) {
        $('body').addClass('sticky');
      } else {
        $('body').removeClass('sticky');
        $('.main').removeAttr('style');
      }
    }
    _window.on('scroll', function (event) {
      stickynavBar();
    });

    _window.on('resize', function (event) {
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(function () {
        stickyMenuTop = Math.floor($('header .menu').offset().top);
        $('.main').removeAttr('style');
        stickynavBar();
      }, 200);
    });
    stickynavBar();
  }

  if ($('header .megamenu').length > 0) {
    var stickyMegamenuTop = Math.floor($('header .megamenu').offset().top),
      megamenuH = Math.floor($('header .megamenu').outerHeight());

    function stickyMegaNavBar() {
      windowW = _window.outerWidth();
      if (switchMenu == false) {
        if (windowW >= wwSmall && $(this).scrollTop() > stickyMegamenuTop) {
          $('header .megamenu').addClass('sticky');
          $('.main').css('padding-top', megamenuH);
        } else {
          $('header .megamenu').removeClass('sticky');
          $('.main').removeAttr('style');
        }
      }
    }
    _window.on('scroll', function (event) {
      stickyMegaNavBar();
    });
    _window.on('resize', function (event) {
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(function () {
        stickyMenuTop = Math.floor($('header .megamenu').offset().top);
        $('.main').removeAttr('style');
        stickyMegaNavBar();
      }, 200);
    });
    stickyMegaNavBar();
  }

  /*-----------------------------------*/
  //////////// notice訊息區塊 ////////////
  /*-----------------------------------*/
  $('[class*="notice"] a.close').click(function (e) {
    $(this).parent('[class*="notice"]').hide();
    e.preventDefault();
  });
  /*-----------------------------------*/
  //////////// Accordion設定 ////////////
  /*-----------------------------------*/
  $('.accordion').each(function () {
    $(this).find('.accordion-content').hide();
    var _accordionItem = $(this).children('ul').children('li').children('a');
    _accordionItem.each(function () {
      function accordion(e) {
        $(this).parent('li').siblings().children('a').removeClass('active');
        $(this).toggleClass('active');
        $(this).parent('li').siblings().children('.accordion-content').slideUp();
        $(this).next('.accordion-content').slideToggle();
        e.preventDefault();
      }
      $(this).click(accordion);
      $(this).keyup(accordion);
    });
  });
  /*-----------------------------------*/
  /////////////fatfooter開關/////////////
  /*-----------------------------------*/
  $('.btn-fatfooter').click(function (e) {
    $(this)
      .parent('.container')
      .find('nav>ul>li>ul')
      .stop(true, true)
      .slideToggle(function () {
        if ($(this).is(':visible')) {
          $('.btn-fatfooter').html('收合/CLOSE');
          $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
        } else {
          $('.btn-fatfooter').html('展開/OPEN');
          $('.btn-fatfooter').attr('name', '展開選單/OPEN');
        }
      });
    $(this).stop(true, true).toggleClass('close');
  });
  /*-----------------------------------*/
  ////////////////多組Tab////////////////
  /*-----------------------------------*/
  function tabFun() {
    var activeClass = 'active'; //啟動的 class
    var tabSet = $('.tabSet'); //tab名稱

    tabSet.each(function () {
      var _tabBtnBlock = $(this).find('.tabItems'); //頁籤按鈕區塊
      var _checkItem = _tabBtnBlock.find('.active').index(); //頁籤按鈕區塊
      var _tabBtn = _tabBtnBlock.find('button'); //頁籤按鈕
      var _tabBtnLength = _tabBtn.length; //頁籤按鈕數量
      var _tabContentBlock = $(this).find('.tabContentGroup'); //頁籤內容區塊
      var _tabContent = _tabContentBlock.find('.tabContent'); //頁籤內容
      var _tabContentLength = _tabContent.length; //頁籤內容數量
      // _tabBtn.eq(1).addClass(activeClass); //第一個頁籤按鈕active
      _tabContent.eq(_checkItem).show(); //第一個頁籤內容顯示

      for (var i = 0; i < _tabBtnLength; i++) {
        //綁定是哪一個頁籤
        (function (i) {
          var _this = _tabBtn.eq(i); //綁定這一個頁籤按鈕
          var _thisContent = _tabContent.eq(i); //綁定這一個頁籤內容
          var _thisPrevItem = _tabContent.eq(i - 1); //綁定前一個頁籤按鈕
          var _itemAllA = _thisContent.find('[href], input'); //這一個頁籤內容所有a和input項目
          var _prevItemAllA = _thisPrevItem.find('[href], input'); //前一個頁籤內容所有a和input項目
          var _isFirstTab = i === 0; //如果是第一個頁籤
          var _isLastTab = i === _tabBtnLength - 1; //如果是最後一個頁籤
          var _itemFirstA = _itemAllA.eq(0); //頁籤內容第一個a或是input
          var _itemLastA = _itemAllA.eq(-1); //頁籤內容最後一個a或是input
          var _prevItemLastA = _prevItemAllA.eq(-1); //前一個頁籤的最後一個a或是input

          // _this頁籤觸發focus內容裡的第一個a
          _this.on('keydown', function (e) {
            //頁籤第幾個按鈕觸發時
            if (e.which === 9 && !e.shiftKey) {
              //e.which偵測按下哪個案件，9代表tab，shiftKey代表shift
              e.preventDefault();
              startTab(i); //啟動頁籤切換功能
              if (_itemAllA.length) {
                //type number = true，0是false
                _itemFirstA.focus(); //第一個a或是input focus
              } else {
                _tabBtn.eq(i + 1).focus(); //當內容沒有a或是input跳轉下一個tab
              }
            } else if (e.which === 9 && e.shiftKey && !_isFirstTab) {
              e.preventDefault();

              startTab(i - 1); //啟動頁籤切換功能

              if (_prevItemAllA.length) {
                _prevItemLastA.focus(); //前一個頁籤內容的最後一個a或是input focus
              } else {
                _tabBtn.eq(i - 1).focus(); //當內容沒有a或是input跳轉上一個tab
              }
            }
          });

          //當按下shift+tab且為該內容的第一個a或是input
          //將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
          _itemFirstA.on('keydown', function (e) {
            if (e.which === 9 && e.shiftKey) {
              e.preventDefault();
              _tabBtn.eq(i).focus();
            }
          });

          //當按下shift+tab且為該內容的最後一個a或是input
          //focus到下一個頁籤
          _itemLastA.on('keydown', function (e) {
            if (e.which === 9 && !e.shiftKey && !_isLastTab) {
              e.preventDefault();
              _tabBtn.eq(i + 1).focus();
            }
          });
        })(i);

        //滑鼠點擊事件
        _tabBtn.on('click', function (e) {
          e.preventDefault();
          var _nowBtn = $(this).index();
          startTab(_nowBtn);
        });

        //切換tab
        function startTab(_now) {
          _tabBtn.eq(_now).addClass(activeClass).siblings().removeClass(activeClass);
          //頁籤按鈕增加指定class(active)，其他頁籤移除指定class
          _tabContent.eq(_now).show().siblings().hide();
          //顯示當下頁籤內，隱藏其他內容
        }
      }
    });
  }
  tabFun();

  /*-----------------------------------*/
  ///////////////置頂go to top////////////
  /*-----------------------------------*/
  var footerTop = 0;
  $(window).on('load resize', function () {
    footerTop = $('footer').offset().top - $('footer').outerHeight() - 300;
  });
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
    if ($(this).scrollTop() > footerTop) {
      $('.scrollToTop').addClass('infooter');
    } else {
      $('.scrollToTop').removeClass('infooter');
    }
  });
  /*-----------------------------------*/
  /////click event to scroll to top//////
  /*-----------------------------------*/
  $('.scrollToTop')
    .off()
    .click(function (e) {
      $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
      // $('a.goCenter').focus(); //加入這行
      e.preventDefault();
    });
  $('.scrollToTop').keydown(function (e) {
    $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
    _body.find('a.goCenter').focus();
    e.preventDefault();
  });
  /*--------------------------------------------------------*/
  /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
  /*--------------------------------------------------------*/
  var userAgent, ieReg, ie;
  userAgent = window.navigator.userAgent;
  ieReg = /msie|Trident.*rv[ :]*11\./gi;
  ie = ieReg.test(userAgent);
  if (ie) {
    $('.img-container').each(function () {
      var imgUrl = $(this).find('img').attr('data-src');
      var $container = $(this);
      $container.has('.none').addClass('ie-object-none');
      $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.cover').addClass('ie-object-cover');
      $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.fill').addClass('ie-object-fill');
      $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.contain').addClass('ie-object-contain');
      $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
    });
  }
  /*-----------------------------*/
  /////form表單 placeholder隱藏/////
  /*-----------------------------*/
  // $('input,textarea').focus(function() {
  //     $(this).removeAttr('placeholder');
  // });
  $('input[type="checkbox"]')
    .off()
    .click(function (e) {
      $(this).blur();
    });
  /*------------------------------------*/
  /////form表單 單個檔案上傳+多個檔案上傳/////
  /*------------------------------------*/
  $(document).on('change', '.check_file', function () {
    var names = [];
    var length = $(this).get(0).files.length;
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      names.push($(this).get(0).files[i].name);
    }
    // $('input[name=file]').val(names);
    if (length > 2) {
      var fileName = names.join(', ');
      $(this)
        .closest('.upload_grp')
        .find('.upload_file')
        .attr('value', length + ' files selected');
    } else {
      $(this).closest('.upload_grp').find('.upload_file').attr('value', names);
    }
  });
  /*------------------------------------*/
  //////////分享按鈕 share dropdwon////////
  /*------------------------------------*/
  $('.function_panel .share').children('ul').hide();
  $('.function_panel .share').prepend('<a href="#" class="shareButton">share分享按鈕</a>');
  var _shareButton = $('.shareButton');
  _shareButton.off().click(function (e) {
    $(this).siblings('ul').stop(true, true).slideToggle();
    e.preventDefault();
  });
  _shareButton.keyup(function (event) {
    $(this).siblings('ul').stop(true, true).slideDown();
  });
  $('.function_panel .share')
    .find('li:last>a')
    .focusout(function (event) {
      $(this).parent().parent('ul').hide();
    });
  // 點外面關閉share
  $(document).on('touchend click', function (e) {
    var container = $('.function_panel .share');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.function_panel .share ul').hide();
    }
  });
  /*------------------------------------*/
  /////////////字型大小 font-size//////////
  /*------------------------------------*/
  $('.font_size')
    .find('.small')
    .click(function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('large_size').addClass('small_size');
      $(this).addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'small', 356);
    });
  $('.font_size')
    .find('.medium')
    .click(function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('large_size small_size');
      $(this).addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'medium', 356);
    });
  $('.font_size')
    .find('.large')
    .click(function (e) {
      $(this).parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('small_size').addClass('large_size');
      $(this).addClass('active');
      e.preventDefault();
      createCookie('FontSize', 'large', 356);
    });

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  window.onload = function (e) {
    var cookie = readCookie('FontSize');
    //alert('cookie='+cookie);
    if (cookie == 'small') {
      //$('.font_size').find('.small').click();
      $('.font_size').find('.small').parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('large_size medium_size').addClass('small_size');
      $('.font_size').find('.small').addClass('active');
      e.preventDefault();
    } else if (cookie == 'large') {
      $('.font_size').find('.large').parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('small_size medium_size').addClass('large_size');
      $('.font_size').find('.large').addClass('active');
      e.preventDefault();
    } else {
      $('.font_size').find('.medium').click();
      $('.font_size').find('.medium').parent('li').siblings('li').find('a').removeClass('active');
      $('body').removeClass('large_size small_size');
      $('.font_size').find('.medium').addClass('active');
      e.preventDefault();
    }
  };
  /*-----------------------------------*/
  /////////// category active  //////////
  /*-----------------------------------*/
  $('.category')
    .find('a')
    .off()
    .click(function (event) {
      $(this).parent('li').siblings().find('a').removeClass('active');
      $(this).addClass('active').blur();
    });
  /*-----------------------------------*/
  /////////// 無障礙快捷鍵盤組合  //////////
  /*-----------------------------------*/
  $(document).on('keydown', function (e) {
    // alt+S 查詢
    if (e.altKey && e.keyCode == 83) {
      $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
      $('.search').find('input[type="text"]').focus();
    }
    // alt+U header
    if (e.altKey && e.keyCode == 85) {
      $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
      $('header').find('.accesskey').focus();
    }
    // alt+C 主要內容區
    if (e.altKey && e.keyCode == 67) {
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('.main').find('.accesskey').offset().top - 70 }, 800, 'easeOutExpo');
      $('.main').find('.accesskey').focus();
    }
    // alt+Z footer
    if (e.altKey && e.keyCode == 90) {
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
      $('footer').find('.accesskey').focus();
    }
  });
  //無障礙切換slick箭頭語系
  if ($('html')[0].hasAttribute('lang')) {
    var weblang = $('html').attr('lang');
    if (weblang.substring(0, 2) == 'zh') {
      $('.slick-prev').attr('title', '上一筆');
      $('.slick-next').attr('title', '下一筆');
    } else if (weblang.substring(0, 2) !== 'zh') {
      $('.slick-prev').attr('title', 'previous');
      $('.slick-next').attr('title', 'next');
    }
  }
  // 無障礙錨點切換語系，更改accesskey的title名稱
  var weblang = $('html').attr('lang');
  if (weblang.substring(0, 2) == 'zh') {
    $('header').find('.accesskey').attr('title', '上方功能區塊');
    $('.main').find('.accesskey').attr('title', '中央內容區塊');
    $('footer').find('.accesskey').attr('title', '下方功能區塊');
    $('.search').find('.accesskey').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
  } else if (weblang.substring(0, 2) !== 'zh') {
    $('header').find('.accesskey').attr('title', 'header');
    $('.main').find('.accesskey').attr('title', 'content');
    $('footer').find('.accesskey').attr('title', 'footer');
    $('.search').find('.accesskey').attr('title', 'search');
  }
  /*------------------------------------*/
  /////gotoCenter on focus跳到 content/////
  /*------------------------------------*/
  $('a.goCenter').keydown(function (e) {
    if (e.which == 13) {
      $('#aC').focus();
      // $('html, body')
      //   .stop(true, true)
      //   .animate({ scrollTop: $('.main').find('.accesskey').offset().top }, 800, 'easeOutExpo');
    }
  });
  /*-----------------------------------*/
  //////// 語言模組 無障礙遊走設定  ////////
  /*-----------------------------------*/
  $('.language').find('ul').hide();
  var openLang = $('.language').children('a');
  openLang.off().click(function (e) {
    $(this).next('ul').stop(true, true).slideToggle();
    e.preventDefault();
  });
  openLang.keyup(function () {
    $(this).next('ul').stop(true, true).slideDown();
  });
  $('.language')
    .find('ul li:last>a')
    .focusout(function () {
      $('.language').find('ul').hide();
    });
  $(document).on('touchend click', function (e) {
    var target = e.target;
    if (!$(target).is('.language a')) {
      $('.language').find('ul').hide();
    }
  });
  // /*------------------------------------*/
  // ///////table 加上響應式 scroltable-wrapper/////
  // /*------------------------------------*/
  // $('table').each(function (index, el) {
  //   //判斷沒有table_list
  //   if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
  //     $(this).scroltable();
  //   }
  // });
  // // tablearrow arrow，為了設定箭頭
  // $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
  // $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
  // // 固定版頭
  // function table_Arrow() {
  //   if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
  //     if ($('.scroltable-wrapper').length > 0) {
  //       var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
  //         thisScroll = Math.floor($(this).scrollTop());
  //       if (thisScroll > stickyArrowTop - 230) {
  //         $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
  //         $('.scroltable-wrapper .tablearrow_left').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
  //         $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
  //         $('.scroltable-wrapper .tablearrow_right').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
  //       } else {
  //         $('.scroltable-wrapper .tablearrow_left').css({
  //           top: '10px',
  //           display: 'none',
  //         });
  //         $('.scroltable-wrapper .tablearrow_right').css({
  //           top: '10px',
  //           display: 'none',
  //         });
  //       }
  //     }
  //   }
  // }
  // $(window).scroll(function (event) {
  //   table_Arrow();
  // });
  // var scrollTimer;
  // _window.scroll(function () {
  //   clearTimeout(scrollTimer);
  //   scrollTimer = setTimeout(function () {
  //     table_Arrow();
  //   }, 50);
  // });
  // /*------------------------------------*/
  // //////////table 加上 data-title//////////
  // /*------------------------------------*/
  function rwdTable() {
    $('.table_list')
      .find('table')
      .each(function () {
        var $row = $(this).find('tr');
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
          ``;
          $(this)
            .find('th')
            .each(function (index) {
              var thText = $(this).text();
              $row.eq(n).find('td').eq(index).attr('data-title', thText);
            });
        }
      });
  }
  rwdTable();

  function rwdTableOther() {
    $('.tableList')
      .find('table')
      .each(function () {
        var $row = $(this).find('tr');
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
          $(this)
            .find('th')
            .each(function (index) {
              var thText = $(this).text();
              $row.eq(n).find('td').eq(index).attr('data-title', thText);
            });
        }
      });
  }
  rwdTableOther();
  /*-----------------------------------*/
  ////////////// lazy load //////////////
  /*-----------------------------------*/
  var lazyLoadInstance = new LazyLoad({
    elements_selector: 'img.lazy',
    placeholder: '/images/basic/placeholder.gif',
    effect: 'fadeIn',
    fadeTime: 600,
    threshold: 0,
  });
});
