(function () {
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
        new ScrollMagic.Scene({ triggerElement: ".canopy", triggerHook: 0 })
            .setClassToggle(".moon", "finished")
            .addTo(controller);

        new ScrollMagic.Scene({ triggerElement: ".canopy", triggerHook: 0 })
            .setClassToggle(".stars", "finished")
            .addTo(controller);

        var logo_tween = TweenLite.to(".logo", 1, { y: "-50%" });
        new ScrollMagic.Scene({ triggerElement: "body", duration: 250, triggerHook: 0 })
            .setTween(logo_tween)
            .addTo(controller);

        var sign_tween = TweenLite.to(".sign", 1, { y: "60%" });
        new ScrollMagic.Scene({ triggerElement: "body", duration: 1000, triggerHook: 0 })
            .setTween(sign_tween)
            .addTo(controller);

        var trees_tween = TweenLite.to(".skyline", 1, { y: "80%"});
        new ScrollMagic.Scene({ triggerElement: "body", duration: 1000, triggerHook: 0 })
            .setTween(trees_tween)
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

    function initialize_animation() {
        // Animate the ticket machine as we scroll past it.
        var tm_images = [
            "url('img/ticket_machine.svg')",
            "url('img/ticket_machine-01.svg'), url('img/ticket_machine.svg')",
            "url('img/ticket_machine-02.svg'), url('img/ticket_machine.svg')",
            "url('img/ticket_machine-03.svg'), url('img/ticket_machine.svg')"
        ];
        var last = 0;
        var tm_data = { current: 0 };
        var tm_tween = TweenLite.to(tm_data, 0.5, {
            current: tm_images.length - 1,
            ease: Linear.easeNone,
            onUpdate: function () {
                tm_data.current = Math.floor(tm_data.current)
                if (last == tm_data.current) { return; }
                last = tm_data.current;
                $(".ticket-machine").css("background-image", tm_images[tm_data.current]);
            }
        });
        new ScrollMagic.Scene({
            triggerElement: ".ticket-machine",
            duration: 200,
            triggerHook: 0.6 })
            .setTween(tm_tween)
            .addTo(controller);
    }

    function initialize_quick() {
        initialize_scrollmagic();
        initialize_parallax();
        initialize_animation();
    }

    function initialize_slow() {
      initialize_nav();
    }

    // jQuery hooks.
    $(document).ready(initialize_quick);
    $(window).load(initialize_slow);
})();
