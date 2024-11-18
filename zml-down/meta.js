/**
 * @package ZMLFrame\Assets\Js
 *
 * META页面脚本
 *
 * @since 1.0.0
 */

(function ($) {
			
	/**
	 * META相关操作
	 */
	$(function () {

		//* 下载地址变化
		$('#down-down-input', '#zml-down-meta').on('change', function () {

			var	date_now  = new Date(),
				date_yyyy = date_now.getFullYear(),
				date_mm   = date_now.getMonth() + 1 < 10 ? '0' + (date_now.getMonth() + 1) : date_now.getMonth() + 1,
				date_dd   = date_now.getDate() < 10 ? '0' + date_now.getDate() : date_now.getDate(),
				date_text = date_yyyy + '-' + date_mm + '-' + date_dd;
			$('#down-date', '#zml-down-meta').val(date_text);

		});

	});
	
})(jQuery);