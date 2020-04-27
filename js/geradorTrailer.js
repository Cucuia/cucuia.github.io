InserirTrailer: function () {
        var str = "";

        if (this.TrailerURL) {
            str += `\n[ttz]trailer[/ttz]`;
            str += `\n[align=center][tube]${this.TrailerURL}[/tube][/align]`;
        } else {
            str += ``;
        }

        return str;
    },

    InserirScreenshots: function () {
        var str = "";

        if (this.Screenshot) {
            str += `\[ttz]screenshots[/ttz]`;
            str += `\[align=center][ss]${this.Screenshot}[/ss][ss]###### URL DA SCREENSHOT ######[/ss]
            [ss]###### URL DA SCREENSHOT ######[/ss][ss]###### URL DA SCREENSHOT ######[/ss][/align]`;
        } else {
            str += ``;
        }

        return str;
    },



    InserirMediainfo: function () {
        var str = "";

        if (this.Mediainfo) {
            str += `\[ttz]screenshots[/ttz]`;
            str += `\[align=center][ss]${this.Screenshot}[/ss][ss]###### URL DA SCREENSHOT ######[/ss]
[ss]###### URL DA SCREENSHOT ######[/ss][ss]###### URL DA SCREENSHOT ######[/ss][/align]`;
        } else {
            str += ``;
        }
        return str;
    },