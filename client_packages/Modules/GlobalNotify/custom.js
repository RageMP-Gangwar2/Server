function sendGlobalMessage(title, message, color, time) {
    var $html = $(
        `
        <div class="notification">
            <p id="title" style="color: ` + color + `;">` + title + `</p>
            <p id="message">` + message + `</p>
        </div>
        `
    )
    $(".global-messages").prepend($html).fadeIn();
    $html.fadeOut(0);
    $html.fadeIn(1000);

    setTimeout(() => {
        $html.slideUp(500);
    }, time);
}