//cap follow mail送信用js
function send_cap_follow_mail(uuid){

	// Inquiryボタン(オレンジ)をloding画像に切替
	$cap_inquiry = $('#cap_inquiry');
	$cap_inquiry.append('<img id="cap_inquiry_loading" alt="loading" src="/images/cap/loading.gif">');
	$('#cap_inquiry_button').remove();

	// ajax
	var url = '/ajax/cap_follow_mail/' + uuid;

	// 成功時
	var success_handler = function() {
		// loding画像をInquiryボタン(灰色)+completeメッセージに切替
		$cap_inquiry.append(
			'<a id="cap_inquiry_button" class="button-gray">Inquiry</a>',
			'<p class="send_mail_complete">You will receive an email about our local services shortly.</p>'
		);
		$('#cap_inquiry_loading').remove();
	};

	// 失敗時
	var error_handler = function() {
		// loding画像をInquiryボタン(灰色)+completeメッセージに切替
		$cap_inquiry.append(
			'<a id="cap_inquiry_button" class="button-gray">Inquiry</a>',
			'<p class="send_mail_complete">You will receive an email about our local services shortly.</p>'
		);
		$('#cap_inquiry_loading').remove();
	};

	send_ajax(url,null,success_handler,error_handler);
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
		global: false
	});
}