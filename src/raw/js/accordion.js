(function () {
    // Check the jQuery library loaded correctly.
    if (!$) throw new Exception("jQuery not loaded!");

    function initialize() {
        // Allow accordion elements to be opened by pressing the associated button.
        $(".accordion>li>a").click(function () {
            var parent = $(this).parent();
            if (parent.hasClass("open")) {
                parent.removeClass("open");
            } else {
                parent.addClass("open");
            }
        });
    }

    // jQuery hooks.
    $(window).load(initialize);
})();
