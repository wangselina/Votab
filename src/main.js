$(document).ready(function () {

    $.getJSON('words.json', function (data) {
        randIndex = Math.floor(Math.random() * (data.length));
        wordEntry = data[randIndex];

        $("#word").text(wordEntry["word"]);
        $("#definition").text(wordEntry["definition"]);

        const key = "AF68639F1BC475387E5D6E7853DA6993";
        var encoded = encodeURIComponent(wordEntry["word"])
        var api = "https://krdict.korean.go.kr/api/search?&key=" + key + "&q=" + encoded + "&part=exam";

        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + api + '"') + '&format=xml&callback=?';

        $("body").addClass("loading");
        $.getJSON(yql, function (data) {
            let xmlDoc = $.parseXML(data.results[0]);
            let example = $(xmlDoc).find("example").first();
            $("#sentence").text(example.text());
            $("body").removeClass("loading");
        });
    });

    $(".footer-text").hover(function () {
        $(".footer-content").slideToggle("fast");
    });
});
