$(document).ready(function () {

    var hangul = {
        vowels: [
            "a",
            "ae",
            "ya",
            "yae",
            "eo",
            "e",
            "yeo",
            "ye",
            "o",
            "wa",
            "wae",
            "oe",
            "yo",
            "u",
            "wo",
            "we",
            "wi",
            "yu",
            "eu",
            "ui",
            "i"
        ],
        consonants: {
            initial: [
                "g",
                "kk",
                "n",
                "d",
                "tt",
                "r",
                "m",
                "b",
                "pp",
                "s",
                "ss",
                "",
                "j",
                "jj",
                "ch",
                "k",
                "t",
                "p",
                "h"
            ],
            final: [
                "",
                "k",
                "k",
                "gs",
                "n",
                "nj",
                "nh",
                "t",
                "l",
                "lg",
                "lm",
                "lb",
                "ls",
                "lt",
                "lp",
                "lh",
                "m",
                "p",
                "bs",
                "t",
                "ss",
                "ng",
                "t",
                "t",
                "k",
                "t",
                "p",
                "h" // ㅎ
            ]
        }
    };

    var hangulUnicodeStartIndex = 44032;
    var hangulUnicodeEndIndex = 55203;

    function isHangul(charUnicode) {
        return (charUnicode >= hangulUnicodeStartIndex || charUnicode <= hangulUnicodeEndIndex)
    }

    function romanize(koreanText) {
        let romanizedText = "";
        for (let i = 0; i < koreanText.length; i++) {
            let charUnicode = koreanText.charCodeAt(i);
            if (isHangul(charUnicode)) {
                charUnicode -= hangulUnicodeStartIndex;
                let tail = charUnicode%28;
                let vowel = ((charUnicode - tail)%588)/28;
                let lead = Math.floor(charUnicode/588);
                romanizedText += hangul.consonants.initial[lead];
                romanizedText += hangul.vowels[vowel];
                romanizedText += hangul.consonants.final[tail];
            } else {
                romanizedText += koreanText[i];
            }
        }
        return romanizedText;
    }

    $.getJSON('words.json', function (data) {
        randIndex = Math.floor(Math.random() * (data.length));
        wordEntry = data[randIndex];

        $("#word").text(wordEntry["word"]);
        $("#definition").text(wordEntry["definition"]);
        $("#romanization").text(romanize(wordEntry["word"]));

    });

    $(".footer-text").hover(function () {
        $(".footer-content").slideToggle("fast");
    });
});

