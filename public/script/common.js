$(function () {
    var e = 380 * $(document).width() / 1918,
        a = {
            result: null
        },
        i = null;
    i && clearTimeout(i), i = setTimeout(function () {
        $("#shuffling .swiper-container").height(e)
    }, 1e3), Request_.ajax({
      //  key: "/api/WebPage/IndexBanner",
      //  type: "GET",
      key: '',
      type: '',
        data: {
            index: 6
        },
        dataType: "json",
        success: function (e) {
            e && 1e4 === e.Stata && (a.result = e.Data, updataView("t:_shuffling", "shuffling", a), new Swiper(".swiper_header", {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: !0,
                autoplay: {
                    delay: 4e3,
                    reverseDirection: !0
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0
                },
                navigation: {
                    nextEl: ".header_right",
                    prevEl: ".header_left"
                }
            }))
        }
    })
});



        // window.onload = function() {
        //     var mySwiper = new Swiper ('.swiper-container', {
        //       // 轮播图的方向，也可以是vertical方向
        //       direction:'horizontal',
              
        //       //播放速度
        //       loop: true,
      
        //       // 自动播放时间
        //       autoplay:1000,
      
        //       // 播放的速度
        //       speed:2000,
              
        //       // 如果需要分页器，即下面的小圆点
        //       pagination: '.swiper-pagination',
              
        //       // 如果需要前进后退按钮
        //       nextButton: '.swiper-button-next',
        //       prevButton: '.swiper-button-prev',　　　　　　　　　　　
      
        //       // 这样，即使我们滑动之后， 定时器也不会被清除
        //       autoplayDisableOnInteraction : false,
              
        //       // 如果需要滚动条
        //       scrollbar: '.swiper-scrollbar',
        //     });
        //   };       
    
