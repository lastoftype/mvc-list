jQuery(document).ready(function($) {
	$('a').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		$this.hide();
	});
});