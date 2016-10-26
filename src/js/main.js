(() => {
    // Check the jQuery library loaded correctly.
    if (!$) throw new Exception("jQuery not loaded!");

    // Private function definitions.
    function initialise() {
        // Put code here.
    }

    // jQuery hooks.
    $(window).load(initialise);
})();
