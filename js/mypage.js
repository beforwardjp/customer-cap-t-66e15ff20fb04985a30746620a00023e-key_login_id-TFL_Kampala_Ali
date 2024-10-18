// 参考：inq_select_inquiry
// 呼び方 onClick="send_mail_auth(this, '/ajax/send_mail_auth')

function send_mail_auth(obj,url) {

    var authkey = cookie_check();
    var after_url = location.href;



	var success_func = function(data,textStatus){
	    if (!data.result) {
	        // alert(data.message);
        } else {
            var msg = data.message;

	        $("#mypage-unauthenticated .mypage-unauthenticated-message").html(data.message);
            $("#mypage-unauthenticated .fn-after-send").css({ 'display': 'inline' });
            // アカウントメニュー表示用
            $("#account-menu-unauthenticated-area").hide();

            //&nbsp;を置換
            var nbsp = new RegExp("&nbsp;","g");
            var space_msg = msg.replace(nbsp," ");

            // APIからの返却文字を多言語文字列で置き換える処理追加
            var sent_to_org = $("#mypage-unauthenticated .mypage-unauthenticated-message").data('mypage-email-sent-to-org');
            var sent_to = $("#mypage-unauthenticated .mypage-unauthenticated-message").data('mypage-email-sent-to');
            var message_org = $("#mypage-unauthenticated .mypage-unauthenticated-message").data('mypage-email-message-org');
            var message = $("#mypage-unauthenticated .mypage-unauthenticated-message").data('mypage-email-message');
            var sent_msg = space_msg.replace(sent_to_org, sent_to);
            var rep_msg = sent_msg.replace(message_org, message);

            $("#mypage-unauthenticated .mypage-unauthenticated-message").html(rep_msg);
            $("#account-menu-unauthenticated-msg .account-menu-unauthenticated-message").html(rep_msg);

            $("#account-menu-unauthenticated-msg").removeClass("hide");
        }
	};

    var error_func = function(data,textStatus){

        if (!data.result) {
            // alert(data.message);
        }
    };

    var data = {authkey: authkey, after_url: after_url};
	send_ajax(url, data, success_func, error_func);
}

// 未認証状態の時の誘導メッセージを、APIから認証状態を取得して表示する
function client_auth_check() {

    var authkey = cookie_check();
    var url = "/ajax/unauth_client_check";

    if (authkey) {
        var success_func = function (data, textStatus) {

            if (!data.result) {
                // alert(data.message);
            } else {

                // 未認証
                if (data.auth_status == 1) {

                    if ($("#mypage-unauthenticated").size()) {

                        $("#mypage-unauthenticated").show();
                        $(".fn-replace-email").html(data.email);

                        $(".fn-resend-message").show();
                        $("#resend-message-area").removeClass("verification-message-hidden");
                    }
                    // 認証
                } else {
                }
            }
        };
        var error_func = function (data, textStatus) {
            if (!data.result) {
                // alert(data.message);
            }
        };
        var data = {authkey: authkey};
        send_ajax(url, data, success_func, error_func);
    }
}

/* JSON によるパラメータ送信 */
function send_ajax(url, data, success_event_handler, error_event_handler)
{
	$.ajax({
		url: url,
		dataType: 'json',
		cache: false,
		data: data,
		success: success_event_handler,
		error: error_event_handler,
		type: 'POST',
		global: false,
        async:false,
	});
}

function close_message() {
    $("#mypage-unauthenticated").remove();

    if ($("#mypage-unauthenticated").size()) {
        $("#mypage-unauthenticated").remove();
    }
    if ($("#mypage-authenticated").size()) {
        $("#mypage-authenticated").remove();
    }
}

// Show moreクリック時の認証メール詳細の表示
function open_message() {
    $('.slide-message').css('display','block');
    $('.fn-verification-message-trigger').css('display','none');
}

// 完了フラグ初期表示
$(function(){
    var arg  = new Object;
    url = location.search.substring(1).split('&');

    for(var i=0; url[i]; i++) {
        var k = url[i].split('=');
        arg[k[0]] = k[1];
    }
    var cpt = arg.cpt;

    // 承認完了メッセージ
    if (typeof(cpt) != "undefined" && cpt == 1) {
        if ($("#mypage-authenticated").size()) {
            $("#mypage-authenticated").show();
        }
        if($("#mypage-unauthenticated").size()) {
            $("#mypage-unauthenticated").hide();
        }
        // 承認状態チェック
    } else {
        // TOPページ時のみ
        if ($("#fn-layout").size() && $("#fn-layout").val() == "top") {
            client_auth_check();
        }
    }

});
