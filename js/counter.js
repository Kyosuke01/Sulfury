$(document).ready(function () {
    var $counter = $("#counter"),
        countBegin = 0,
        countEnd = parseFloat($counter.data('count')),
        animationRunning = false,
        waypointActive = true;

    function startAnimation() {
        if (!animationRunning) {
            animationRunning = true;
            $({ countNum: countBegin }).animate({
                countNum: countEnd
            }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $counter.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $counter.text(this.countNum);
                    animationRunning = false;
                    if (waypointActive) {
                        $counter.waypoint('destroy');
                        waypointActive = false;
                        setupWaypoint();
                    }
                }
            });
        }
    }

    function setupWaypoint() {
        $counter.waypoint({
            handler: function (direction) {
                if (direction === 'down') {
                    startAnimation();
                } else if (direction === 'up') {
                    countBegin = 0;
                }
            },
            offset: 'bottom-in-view'
        });
    }

    setupWaypoint();

    $(window).scroll(function () {
        if (animationRunning) {
            var counterTop = $counter.offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (counterTop > windowBottom || counterTop + $counter.height() < $(window).scrollTop()) {
                $counter.text(countBegin);
                animationRunning = false;
                if (!waypointActive) {
                    $counter.waypoint('destroy');
                    waypointActive = true;
                    setupWaypoint();
                }
            }
        }
    });
});