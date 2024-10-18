
var pdf_src = null;

function nl2br(str, is_xhtml){
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

/**
 *
 */
$(function () {
	/* しましま */
	$('#table_document_list tr:even').addClass('odd');
	$('#table_document_list tr:odd').addClass('even');

	$('.btn').click(function(){
		var id = $(this).attr('id');

		switch(id){
		case "address_correct_yes":
			var $send_form = $('#address_send_form');
			$("input[name='confirm_state']",$send_form).val(1);
			$send_form.submit();
			break;
		case "address_correct_no":
			$('#shipping_confirm').animate({height:'hide'},'normal');
			$('#shipping_amend_form').animate({height:'show'},'normal');
			break;
		case "address_amend_confirm":
			// 送信用フォーム
			var form_array = $('#amend_input_form').serializeArray();
			var $target_form = $('#address_send_form');
			$.each(form_array,function(i){
				$('*[name="' + this.name + '"]', $target_form).val(escape(this.value));
			});
			// 表示用フォーム
			$.each(form_array, function(i, field){
				if(i > 2){i++;} // Country skip
				var $target = $('#shipping_amend_confirm table.listcs tr:eq(' + i + ') td:eq(0)');
				if(field.value == ""){
					field.value = $('#shipping_amend_form table.listcs tr:eq(' + i + ') td:eq(0)').html();
					$target.removeClass('red_small01');
				} else {
					$target.addClass('red_small01');
				}
				$target.html(field.value);
			});
			var flg = false;
			$.each($('#amend_input_form > table > tbody > tr > td > input'), function(){
				var inputVal = jQuery.trim($(this).val());
				if(inputVal){
					flg = true;
				}
			});
			if(!flg){
				alert('Please enter to any field.');
				break;
			}else{
				$('#shipping_amend_form').animate({height:'hide'},'normal');
				$('#shipping_amend_confirm').animate({height:'show'},'normal');
				break;
			}
		case "cancel_address_amend":
			$('#shipping_amend_confirm').animate({height:'hide'},'normal');
			$('#shipping_amend_form').animate({height:'show'},'normal');
			break;
		case "send_address_amend":
			var $send_form = $('#address_send_form');
			$("input[name='confirm_state']",$send_form).val(2);
			$send_form.submit();
			break;
		case "open_bl_document":
			$('#bl_document_confirm_phase1').animate({height:'hide'},'normal');
			$('#bl_document_confirm_phase2').animate({height:'show'},'normal');
			$('#bl_document_pdf_area').css({'display':'block'});
			break;
		case "bl_document_no_change":
			var $send_form = $('#bl_confirm_form');
			$("input[name='confirm_state']",$send_form).val(1);
			$send_form.submit();
			break;
		case "bl_amend_confirm":
			// 送信用フォーム
			var form_array = $('#bl_amend_form').serializeArray();
			var $target_form = $('#bl_confirm_form');
			$.each(form_array,function(i){
				$('*[name="' + this.name + '"]', $target_form).val(escape(this.value));
			});
			// 表示用フォーム
			var changed1 = false, changed2 = false;
			$.each(form_array, function(i, field){
				var $target = $('#bl_review_nya3 tr:eq(' + i + ') td:eq(0)');
				var flag = false;
				if(field.value == ""){
					field.value = $('#bl_amend_form tr:eq(' + i + ') td:eq(0)').html();
					$target.removeClass('red_small01');
				} else {
					flag = true;
					$target.addClass('red_small01');
				}
				// 変更フラグ
				if(flag) {
					if(i>6 && i<14 && !changed2){
						changed2 = true;
					}else if(!changed1 && i<=6){
						changed1 = true;
					}
				}
				$target.html(field.value);
			});

			if(changed1){
				$('#no_change_flg1').css({'display':'none'});
				$('#table_consignee').show();
			} else {
				$('#no_change_flg1').show();
				$('#table_consignee').css({'display':'none'});
			}

			if(changed2) {
				$('#no_change_flg2').css({'display':'none'});
				$('#table_notify').show();
			} else {
				$('#no_change_flg2').show();
				$('#table_notify').css({'display':'none'});
			}

			var other_value = $('#bl_amend_form textarea[name=amend_other]').val();
			if(other_value==""){
				$('#no_change_flg3').show();
			} else {
				$('#no_change_flg3').css({'display':'none'});
			}
			$('#table_other').html(nl2br(other_value));
			var sFlg = false;
			$.each($('#validation1 > tbody > tr > td > input'), function(){
				var inputVal = jQuery.trim($(this).val());
				if(inputVal){
					sFlg = true;
				}
			});
			$.each($('#validation2 > tbody > tr > td > input'), function(){
				var inputVal = jQuery.trim($(this).val());
				if(inputVal){
					sFlg = true;
				}
			});
			if(!sFlg){
				alert('Please enter to any field.');
				break;
			}else{
				$('#bl_review_nya2').animate({height:'hide'},'normal');
				$('#bl_review_nya3').animate({height:'show'},'normal');
				break;
			}
		case "bl_document_amendment":
			$('#bl_review_nya1').animate({height:'hide'},'normal');
			$('#bl_review_nya2').animate({height:'show'},'normal');
			break;
		case "bl_amend_cancel":
			$('#bl_review_nya3').animate({height:'hide'},'normal');
			$('#bl_review_nya2').animate({height:'show'},'normal');
			break;
		case "bl_amend_send":
			var $send_form = $('#bl_confirm_form');
			$("input[name='confirm_state']",$send_form).val(2);
			$send_form.submit();
			break;
		default:
			return false;
		}

		return true;
	});
});
