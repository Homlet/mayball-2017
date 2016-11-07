(() => {
    // Check the jQuery and ScrollMagic libraries loaded correctly.
    if (!$) throw new Exception("jQuery not loaded!");
    if (!ScrollMagic) throw new Exception("ScrollMagic not loaded!");

    // Private variable declarations.
    var controller;

    // Private function definitions.
    function initialize_scrollmagic() {
        controller = new ScrollMagic.Controller();
        controller.scrollTo(function (newScrollPos) {
            $("html, body").animate({ scrollTop: newScrollPos });
        });
    }

    function initialize_nav() {
        // Pin the navbar to the top of the screen.
        new ScrollMagic.Scene({ triggerElement: ".canopy", triggerHook: 0 })
            .setPin(".canopy")
            .addTo(controller);

        // Set up scroll-to targets.
        $("nav a").click(function () {
            var target = $(this).attr("data-anchor");
            controller.scrollTo("section." + target);
            $("#hamburger-nav").prop("checked", false).trigger("change");
            return false;
        });

        // Set up the hamburger button.
        $("#hamburger-nav").change(function () {
            if (this.checked) {
                $("nav ul").addClass("open");
            } else {
                $("nav ul").removeClass("open");
            }
        });
    }

    function initialize() {
        initialize_scrollmagic();
        initialize_nav();
    }

    // jQuery hooks.
    $(window).load(initialize);
})();
