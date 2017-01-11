/**
 * @since:2014-7-29
 * @author:u.ken.li@qq.com
 * @
 */
// 核心
var TF = {
    // 遮罩
    Mask : {
        cfg : {
            id		: ".kMask"												// 盒子
        },
        // show
        show : function(n) {
            var oMask = $(this.cfg.id);						// 遮罩层

            if(!oMask.length) {
                var bTran = n==0 ? "kMask tran" : "kMask";
                var nWH = $(window).height();
                var nDH = $(document).height();
                oMask = $('<div class="'+ bTran +'" />').appendTo($("body"));
                oMask
                    .css("position", nDH>nWH ? "fixed" : "absolute")
                    .fadeIn()
                    .click( function(){
                        // Popup hide
                        if ($(TF.Popup.cfg.id).length>0) {
                            TF.Popup.hide();
                        }
                        // side Popup hide
                        if ($(TF.SidePopup.cfg.id).length>0) {
                            TF.SidePopup.hide();
                        }
                    });

                $(this.cfg.id)
                    .bind("touchmove", function(e){
                        e.stopPropagation();
                        e.preventDefault();
                    });


                if (n!=3)	{
                    $(TF.Dialog.cfg.id)
                        .bind("touchmove", function(e){
                            e.stopPropagation();
                            e.preventDefault();
                        });
                }
            }
        },
        // hide
        hide : function() {
            $(this.cfg.id).remove();
        }
    },

    // 弹出
    Popup : {
        cfg : {
            id		: ".kPopup",											// 盒子
            box		: ".kPopupC",
            speed	: 200
        },
        // show
        show : function(sTitle, n) {
            var oPopup = $(this.cfg.id);
            if(!oPopup.length) {
                oPopup = $('<div class="kPopup" />').appendTo($("body"));
                oTitle = $('<div class="title" />').appendTo(oPopup);
                oTitle.html(sTitle);
                oClose = $('<a href="javascript:void(0)" class="close" />').prependTo(oPopup);
                oClose
                    .html("x")
                    .click(function(){
                        TF.Popup.hide();
                    });

                $('<div class="kPopupC" />').appendTo(oPopup);

                if(n!=3) TF.Mask.show(n==1?0:1);
            }
        },
        // hide
        hide : function(fun) {

            if(fun)	fun();

            if ($(".keyboard").length>0){
                $(".content").css("margin-top", "auto");

                $(TF.Pinpad.cfg.id).removeClass("txt_focus");
            }
            $(this.cfg.id).remove();
            TF.Mask.hide();
        },
        forbidDrag : function() {
            var bOverflow = $(TF.Popup.cfg.id).find(".PMList").outerHeight() > $(this.cfg.box).height();
            if(!bOverflow){
                $(this.cfg.id)
                    .bind("touchmove", function(e){
                        e.stopPropagation();
                        e.preventDefault();
                    });
            }
        }
    },

    // 弹出侧栏
    SidePopup : {
        cfg : {
            id		: ".kSidePopup",
            box		: ".kSidePopupC",
            speed	: 200
        },
        // show
        show : function() {
            var oSidePopup = $(this.cfg.id);
            if(!oSidePopup.length) {
                var wndH = $(window).height() - $("header").height();
                oSidePopup = $('<div class="kSidePopup" />').appendTo($("body"));
                oSidePopup
                    .css({"height": wndH, "width": "82%"})
                    .animate({ left: "18%"}, this.cfg.speed);
                $("header").css("z-index", 105);
                $('<div class="kSidePopupC" />').appendTo(oSidePopup);

                TF.Mask.show();
            }
        },
        // hide
        hide : function() {
            $(this.cfg.id).remove();
            TF.Mask.hide();
            $("header").css("z-index", 105);
        },
        forbidDrag : function() {
            var bOverflow = $(this.cfg.box).outerHeight() > $(this.cfg.id).height();
            if(!bOverflow){
                $(this.cfg.id)
                    .bind("touchmove", function(e){
                        e.stopPropagation();
                        e.preventDefault();
                    });
            }
        }
    },

    // 泡泡
    Bubble : {
        cfg : {
            id		: ".kBubble",										// 盒子
            speed	: 2000
        },
        show : function(str, o){
            var oBubble = $(this.cfg.id);
            var sTitle = str;
            if(!oBubble.length) {

                oBubble = $('<div class="kBubble" />').appendTo($("body"));

                if (o) {
                    oBubble
                        .html(sTitle)
                        .css({
                            "position": "absolute",
                            "top"			: $(o).offset().top
                        })
                        .fadeIn();
                }else{
                    oBubble
                        .html(sTitle)
                        .fadeIn();
                }

            }

            setTimeout("TF.Bubble.hide()", TF.Bubble.cfg.speed);
        },
        hide : function(){
            $(this.cfg.id).fadeOut("slow", function(){
                $(this).remove();
            });
        }
    },

    // 退出提示
    BubbleOut : {
        cfg : {
            id		: ".out_Bubble",										// 盒子
            speed	: 2000
        },
        show : function(str, o){
            var oBubble = $(this.cfg.id);
            var sTitle = str;
            if(!oBubble.length) {

                oBubble = $('<div class="out_Bubble" />').appendTo($("body"));

                if (o) {
                    oBubble
                        .html(sTitle)
                        .css({
                            "position": "absolute",
                            "top"			: $(o).offset().top
                        })
                        .fadeIn();
                }else{
                    oBubble
                        .html(sTitle)
                        .fadeIn();
                }

            }

            setTimeout("TF.BubbleOut.hide()", TF.BubbleOut.cfg.speed);
        },
        hide : function(){
            $(this.cfg.id).fadeOut("slow", function(){
                $(this).remove();
            });
        }
    },

    // 对话框
    Dialog : {
        cfg : {
            id					: ".kDlg",											// 盒子
            box					: ".kDlgC",
            hasTitle		: true,
            title				: "提示",
            btn					: ["确定"]
        },
        // show
        show : function(n){
            var oDlg = $(this.cfg.id);
            var sTitle = this.cfg.title;

            if(!oDlg.length) {
                oDlg = $('<div class="kDlg" />').appendTo($("body"));
                if (this.cfg.hasTitle)	{
                    oTitle = $('<div class="title" />').appendTo(oDlg);
                    oTitle.html(sTitle);
                }
                $('<div class="kDlgC" />').appendTo(oDlg);
                $('<div class="kDlgBtn" />').appendTo(oDlg);
            }
            this.addBtn();
            oDlg.show();
            TF.Mask.show(n);
        },
        // add btn
        addBtn : function(){
            var oBtn = $(".kDlgBtn");
            oBtn.empty();

            // 逆序排序
            $.each( this.cfg.btn, function(i, n){
                $('<a href="javascript:void(0)">'+n+'</a>').prependTo(oBtn);
            });

            if (this.cfg.btn.length>1) $(".kDlgBtn>a").width("50%");
        },
        // hide
        hide : function(bHide){
            $(this.cfg.id).remove();
            if (bHide==undefined) TF.Mask.hide();
        }
    },

    // 加载...
    Loading : {
        cfg : {
            id		: ".kLoading"
        },
        // show
        show : function(msg) {
            var oLoading = $(this.cfg.id);
            var sMsg = msg == undefined ? "请等待..." : msg;

            if(!oLoading.length) {
                oLoading = $('<div class="kLoading" />').appendTo($("body"));
                oLoading
                    .html("<i></i>"+
                        "<p>"+ sMsg +"</p>");
            }else{
                oLoading.children("p").html(sMsg);
            }
            //	TF.Mask.show(0);
        },
        // hide
        hide : function() {
            $(this.cfg.id).fadeOut(200, function(){	$(this).remove(); });
            //	TF.Mask.hide();
        }
    },

    // 模拟 switch
    kSwitch : function(){
        // switch
        $(".switchOff, .switchOn")
            .live("click", function(){
                var el = $(this);
                // default
                el.attr("class",
                        el.attr("class")=="switchOff"
                        ? "switchOn"
                        :	"switchOff"
                );
            });

        // switch abc
        $(".switchAbcOff, .switchAbcOn")
            .live("click", function(){
                var el = $(this);
                // abc
                el.attr("class",
                        el.attr("class")=="switchAbcOff"
                        ? "switchAbcOn"
                        :	"switchAbcOff"
                );
            });
    },

    //省、市、区选择
    Pcd : {
        cfg : {
            id					: "#pcd",
            province		: "#province",
            city				: "#city",
            district		: "#district",
            pcdProvince	: "#pcdProvince",
            pcdCity			: "#pcdCity",
            pcdDistrict : "#pcdDistrict"
        },
        province : function(){
            var aData = jsonProvince;
            var sDef = $(this.cfg.pcdProvince).val();
            var sCur = "";

            $.each(aData, function(i, n){
                sCur = aData[i].code == sDef ? ' class="current"' : "";
                $('<li data-val=' + aData[i].code + sCur + '>' + aData[i].name + '</li>')
                    .appendTo($(TF.Pcd.cfg.province));
            });

            $(this.cfg.province + ">li")
                .bind("click", function(e){
                    e.stopPropagation();
                    e.preventDefault();

                    $(TF.Pcd.cfg.pcdProvince).val( $(this).attr("data-val"));
                    $(this).parent().find("li").attr("class", "");
                    $(this).attr("class", "current");

                    TF.Pcd.city();
                    TF.Pcd.district();
                });
        },
        city : function(){
            var aData = jsonCity;
            var sDef = $(this.cfg.pcdCity).val();
            var sCur = "";
            var nParentCode = $(this.cfg.province +" li[class='current']").attr("data-val").substring(0, 2);

            $(this.cfg.city).empty();
            $.each(aData, function(i, n){
                if (nParentCode == aData[i].code.substring(0, 2)) {
                    sCur = aData[i].code == sDef ? ' class="current"' : "";

                    $('<li data-val=' + aData[i].code + sCur + '>' + aData[i].name + '</li>')
                        .appendTo($(TF.Pcd.cfg.city));
                }
            });

            $(this.cfg.city + ">li")
                .bind("click", function(e){
                    e.stopPropagation();
                    e.preventDefault();

                    $(TF.Pcd.cfg.pcdCity).val( $(this).attr("data-val"));
                    $(this).parent().find("li").attr("class", "");
                    $(this).attr("class", "current");

                    TF.Pcd.district();
                });

            if ($(this.cfg.city + ">li[class='current']").length<=0){
                $(this.cfg.pcdCity).val( $(this.cfg.city + ">li:first").attr("data-val"));
                $(this.cfg.city + ">li:first").addClass("current");
            }
        },
        district : function(){
            var aData = jsonDistrict;
            var sDef = $(this.cfg.pcdDistrict).val();
            var nParentCode = $(this.cfg.city +" li[class='current']").attr("data-val").substring(0, 4);
            var sCur = "";

            $(this.cfg.district).empty();
            $.each(aData, function(i, n){
                if (nParentCode == aData[i].code.substring(0, 4)) {
                    sCur = aData[i].code == sDef ? ' class="current"' : "";

                    $('<li data-val=' + aData[i].code + sCur + '>' + aData[i].name + '</li>')
                        .appendTo($(TF.Pcd.cfg.district));
                }
            });

            if ($(this.cfg.district + ">li[class='current']").length<=0){
                $(this.cfg.pcdDistrict).val( $(this.cfg.district + ">li:first").attr("data-val"));
                $(this.cfg.district + ">li:first").addClass("current");
            }

            $(this.cfg.district + ">li")
                .bind("click", function(e){
                    e.stopPropagation();
                    e.preventDefault();

                    $(TF.Pcd.cfg.pcdDistrict).val( $(this).attr("data-val"));
                    $(this).parent().find("li").attr("class", "");
                    $(this).attr("class", "current");

                    $(TF.Pcd.cfg.id).removeClass("placeholder");

                    var sPcd = $(TF.Pcd.cfg.province + ">li[class='current']").text() + $(TF.Pcd.cfg.city + ">li[class='current']").text() + $(TF.Pcd.cfg.district + ">li[class='current']").text();
                    $(TF.Pcd.cfg.id).html(sPcd);

                    setTimeout("TF.Popup.hide()", 200);
                });
        },
        init : function(){
            this.province();
            this.city();
            this.district();
            /*
             }else{
             $.each(jsonProvince, function(i){
             if (jsonProvince[i].code == $(TF.Pcd.cfg.pcdProvince).val()){
             $(TF.Pcd.cfg.id).html( $(TF.Pcd.cfg.id).html() + jsonProvince[i].name);
             }
             });
             $.each(jsonCity, function(i){
             if (jsonCity[i].code == $(TF.Pcd.cfg.pcdCity).val()){
             $(TF.Pcd.cfg.id).html( $(TF.Pcd.cfg.id).html() + jsonCity[i].name);
             }
             });
             $.each(jsonDistrict, function(i){
             if (jsonDistrict[i].code == $(TF.Pcd.cfg.pcdDistrict).val()){
             $(TF.Pcd.cfg.id).html( $(TF.Pcd.cfg.id).html() + jsonDistrict[i].name);
             }
             });
             }
             */
        }
    },

    // 手机号分段显示
    cellPhoneSegment : function(){

        $(".jCellPhone")
            .live("keyup", function(e){
                var o = $(this);
                var sVal = $.trim(o.val()).replace(/\s/g, '');
                var aNum = sVal.match(/./g);
                var nLen = sVal.length;
                var sNum = "";

                nLen>0
                    ? o.addClass("txt-segment")
                    : o.removeClass("txt-segment");

                if (aNum == null) return false;

                for (i=0; i<aNum.length; i++){
                    if (i==3 || i==7 ){
                        sNum = sNum + " " + aNum[i];
                    }else{
                        sNum = sNum + aNum[i];
                    }
                }
                o.val( sNum );
            });
    },

    // 银行卡分段显示
    bankCardSegment : function(){
        $(".jBankCard")
            .live("keyup", function(e){
                var o = $(this);
                var sVal = $.trim(o.val()).replace(/\s/g, '');
                var aNum = sVal.match(/./g);
                var nLen = sVal.length;
                var sNum = "";

                nLen>0
                    ? o.addClass("txt-segment")
                    : o.removeClass("txt-segment");

                if (aNum == null) return false;

                for (i=0; i<aNum.length; i++){
                    if (i==4 || i==8 || i==12 || i==16 || i==20 ){
                        sNum = sNum + " " + aNum[i];
                    }else{
                        sNum = sNum + aNum[i];
                    }
                }
                o.val( sNum );
            });
    },

    // upload
    uploadID : function(el){
        var sTitle = $(el).attr("title");
        this.Popup.hide();
        this.Popup.show(sTitle);

        var oPopup = $(TF.Popup.cfg.id);
        var oPopupC = $(TF.Popup.cfg.box);
        oPopupC
            .addClass("uploadBox")
            .html(
                '<div class="uploadSel clearfix">'+
                '	<a href="javascript:void(0)"><i></i>相册</a>'+
                '	<a href="javascript:void(0)"><i></i>拍照</a>'+
                '</div>'
        );
        oPopup.slideDown(this.Popup.cfg.speed);
        oPopup
            .bind("touchmove", function(e){
                e.stopPropagation();
                e.preventDefault();
            });
    },

    // 客服电话
    serviceTel : function(){
        var o = $(".service-tel");
        var bdH = $("body").height() + o.height();
        var wndH = $(document).height();

        var sPos = bdH >= wndH ? "relative" : "fixed";
        o.css("position", sPos);
    },

    // 是否有底部
    hasFooter : function(){
        var o = $(".content");
        var oFooter = $("footer>a");
        if ($("footer").size()>0) o.addClass("cf");

        oFooter
            .bind("touchstart", function(e) {
                oFooter.removeClass("current");
                $(this).addClass("current");
                e.preventDefault();
                var hrefTo = $(this).attr("hrefTo");
                if(hrefTo){
                    window.location.href = hrefTo;
                }
            });
    },


    // 更多数据
    loadMore : {
        cfg : {
            id			: ".content",		// 载入数据对象
            dh			: 0,		// 初始
            loading	: false
        },

        // 加载数据
        show : function(obj, data){
            var extraH = $("footer").height();
            this.cfg.dh	= parseFloat($(window).height()) + parseFloat($(window).scrollTop());

            if (( $(this.cfg.id).height() - extraH) <= this.cfg.dh)
            {
                this.cfg.loading = true;

                //加载数据
                obj.append(data);
            }

        }
    },

    focus : function(){
        $(".group")
            .live("touchstart", function(){ $(this).addClass("focus");})
            .live("touchend", function(){	$(this).removeClass("focus");});
    },
    // 初始化
    init : function(){

        // 输入focus
        $(".txt, .txt_m")
            .focus(function(){ if($(TF.Dialog.cfg.id).size()<1){		$("header").addClass("tf");		}	})
            .blur(function(){		$("header").removeClass("tf");});


        $('input[type="date"],'+
            'input[type="datetime"],'+
            'input[type="datetime-local"],'+
            'input[type="month"],'+
            'input[type="time"],'+
            'input[type="week"]')
            .each(function() {
                var placeholder = $(this).attr("placeholder");
                var o = $(this);
                $(this)
                    .focus(function(){	$(this).removeAttr("placeholder"); })
                    .blur(function(){	if($(this).val() == "") $(this).attr("placeholder", placeholder);	});
            });

        // select
        $("select")
            .each(function(){
                if($(this).find("option[selected='selected']").size()>0){
                    $(this).next("em").html($(this).find("option[selected='selected']").text()).removeClass("placeholder");
                }else{
                    $(this).next("em").html($(this).attr("data-placeholder")).addClass("placeholder");
                }
            })
            .change(function(){
                $(this).next("em").html($(this).find("option:selected").text()).removeClass("placeholder");
            });

        this.kSwitch();									// Switch
        this.cellPhoneSegment();				// 手机分段
        this.bankCardSegment();					// 银行卡分段
        this.serviceTel();
        this.hasFooter();								// 是否有底
        this.focus();
        //	this.Loading.show();
    }
};

$(document)
    .ready(function(){		TF.init(); 	});
$(window)
    .resize(function(){	TF.serviceTel();	})
    .scroll(function(){
        TF.serviceTel();

        if(typeof tabKeepTop === "function") {	tabKeepTop();		}

    });