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

    function initialize_parallax() {
        var moon_tween = TweenLite.to(".moon", 1, { y: "900%" });
        new ScrollMagic.Scene({ triggerElement: "body", duration: 1000, triggerHook: 0 })
            .setTween(moon_tween)
            .addTo(controller);

        var logo_tween = TweenLite.to(".logo", 1, { y: "-50%" });
        new ScrollMagic.Scene({ triggerElement: "body", duration: 250, triggerHook: 0 })
            .setTween(logo_tween)
            .addTo(controller);

        var sign_tween = TweenLite.to(".sign", 1, { y: "60%" });
        new ScrollMagic.Scene({ triggerElement: "body", duration: 1000, triggerHook: 0 })
            .setTween(sign_tween)
            .addTo(controller);

        var trees_tween = TweenLite.to(".trees", 1, { y: "50%"});
        new ScrollMagic.Scene({ triggerElement: "body", duration: 1000, triggerHook: 0 })
            .setTween(trees_tween)
            .addTo(controller);
    }

    function initialize_nav() {
        // Pin the navbar to the top of the screen.
        new ScrollMagic.Scene({ triggerElement: ".canopy", triggerHook: 0 })
            .setPin(".canopy")
            .addTo(controller);

        // Set up scroll-to targets.
        $("nav a").click(function () {
            var target = $(this).attr("data-anchor");
            controller.scrollTo("#" + target);
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

        // Set class toggles so the current section is highlighted.
        scenes = [];
        $("nav a[data-anchor]").each(function () {
            var section = $(this).attr("data-anchor");
            var length = $("#" + section).outerHeight();
            var options = {
                triggerElement: "#" + section,
                triggerHook: 0.4,
                duration: length
            };
            scene = new ScrollMagic.Scene(options)
                .setClassToggle(this, "selected")
                .addTo(controller);
            scenes.push([scene, section]);
        });

        // Set up a window resize hook to reset some values above.
        $(window).resize(function () {
            for (var i = 0; i < scenes.length; i++) {
                var pair = scenes[i];
                pair[0].duration($("#" + pair[1]).outerHeight());
            }
        });
    }

    function initialize() {
        initialize_scrollmagic();
        initialize_parallax();
        initialize_nav();
    }

    // jQuery hooks.
    $(window).load(initialize);
})();
