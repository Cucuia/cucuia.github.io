var GeradorFilme = {

    IMDbId: null,

    TipoGerador: null,

    Data: {
        OMDb: null,
        TMDb: null
    },

    Validar: function () {
        var isFilme = false;
        var isSerie = false;
        var isEpisodioSerie = false;

        if (this.IMDbId.trim().length == 0 || this.IMDbId == null) {
            bulmaToast.toast({ message: "O código do filme no IMDB é obrigatório", type: "is-danger", duration: 8000 });
            return false;
        }

        // $('#pageLoader').addClass("is-active");

        this.Data.OMDb = this.OMDbService(this.IMDbId.trim());
        this.Data.TMDb = this.TMDbService(this.IMDbId.trim());

        console.log(this.Data.OMDb);
        console.log(this.Data.TMDb);


        if (this.Data.TMDb.movie_results.length > 0) isFilme = true;
        if (this.Data.TMDb.tv_results.length > 0) isSerie = true;
        if (this.Data.TMDb.tv_episode_results.length > 0) isEpisodioSerie = true;

        if (isFilme) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Filme'!", type: "is-alert", duration: 6000 });
            this.TipoGerador = "1";
        }

        if (isSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Série de TV'!", type: "is-alert", duration: 6000 });
            this.TipoGerador = "2";
        }

        if (isEpisodioSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Episódio de série de TV'!", type: "is-alert", duration: 6000 });
            this.TipoGerador = "3";
        }

        baseLib.copyToClipboard(this.GerarBBCode());
        bulmaToast.toast({ message: "BBCode copiado para a área de transferência!", type: "is-success", duration: 6000 });
        // debugger


    },

    GerarBBCode: function () {
        var str = `${this.InserirTitulo()}
${this.InserirCapa()}
${this.InserirSinopse()}
${this.InserirElenco()}
${this.InserirInformacoes()}
${this.InserirSubber()}
${this.InserirMediainfo()}
${this.InserirScreenshots()}
${this.InserirTrailer()}
${this.InserirAgradecimentos()}
${this.InserirObservacoes()}
${this.InserirDownload()}`;

        return str;

    },

    InserirTitulo: function () {
        var titulo = ``;

        switch (this.TipoGerador) {
            case "1":
                titulo += `[align=center][b][color=blue][size=220]${this.Data.TMDb.movie_results[0].title}[/size][/color][/b]`;
                break;
            case "2":
                titulo += `[align=center][b][color=blue][size=220]${this.Data.TMDb.tv_results[0].name}[/size][/color][/b]`;
                break;
            case "3":
                titulo += `[align=center][b][color=blue][size=220]${this.Data.TMDb.tv_episode_results[0].name}[/size][/color][/b]`;
            default:
                break;
        }
        titulo += `\n[b][size=190](${this.Data.OMDb.Title})[/size][/b]`

        return titulo;
    },

    InserirCapa: function () {
        var capa = ``;

        switch (this.TipoGerador) {
            case "1":
                capa += `\n[poster]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.movie_results[0].poster_path}[/poster][/align]`;
                break;
            case "2":
                capa += `\n[poster]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.tv_results[0].poster_path}[/poster][/align]`;
                break;
            case "3":
                capa += `\n[poster]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.tv_episode_results[0].still_path}[/poster][/align]`;
                break;
            default:
                break;
        };

        return capa;
    },

    InserirSinopse: function () {
        var sinopse = "";

        switch (this.TipoGerador) {
            case "1":
                sinopse = "" + ((this.Data.TMDb.movie_results[0].overview.length == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.movie_results[0].overview) + "";
                break;
            case "2":
                sinopse = "" + ((this.Data.TMDb.tv_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_results[0].overview) + "";
                break;
            case "3":
                sinopse = "" + ((this.Data.TMDb.tv_episode_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_episode_results[0].overview) + "";
                break;
            default:
                break;
        }


        var str = `\n[ttz]sinopse[/ttz]
${sinopse}`;


        return str;
    },

    InserirInformacao: function () {
        var str = "";
        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorFichaTecnicaImage}[/img][/align]`;

        switch (this.TipoGerador) {
            case "1":
            case "2":
                str += `\n[align=center]Data de Lançamento: ${this.Data.OMDb.Released} [/align]`;
                break;

            case "3":
                str += `\n[align=center]Data de Lançamento: ${baseLib.reformatDate(this.Data.TMDb.tv_episode_results[0].air_date)} [/align]`;
                str += `\n[align=center]Temporada: ${this.Data.OMDb.Season} [/align]`;
                str += `\n[align=center]Episódio: ${this.Data.OMDb.Episode} [/align]`;
                str += `\n${this.Ripador}`;
                str += `\n${this.Remasterizador}`;
                str += `\n${this.Colaborador}`;
                str += `\n${this.Uploader}`;
                str += `\n${this.Tamanho}`;
                str += `\n${this.Resolução}`;
                str += `\n${this.Subber}`;
                str += `\n${this.Servidor}`;
                str += `\n${this.Formato}`;
                str += `\n${this.VideoInfo}`;
                str += `\n${this.Qualidade}`;
                str += `\n${this.Idioma}`;
                str += `\n${this.AudioInfo}`;
                str += `\n${this.Legenda}`;
                str += `\n${this.TrailerURL}`;
                str += `\n${this.Mediainfo}`;
                str += `\n${this.Screenshot}`;
                str += `\n${this.Url}`;
                break;
            default:
                break;
        }


        str += `\n[align=center]Tempo: ${this.Data.OMDb.Runtime} [/align]`;

        if (this.TipoGerador == "1") str += `\n[align=center]Produtora: ${this.Data.OMDb.Production} [/align]`;

        str += `\n[align=center]País de Origem: ${this.Data.OMDb.Country} [/align]`;
        str += `\n[align=center]Gêneros: ${this.Data.OMDb.Genre} [/align]`;
        if (this.Data.OMDb.Website != "N/A") str += `\n[align=center]Site: [url=${this.Data.OMDb.Website}] Clique aqui [/url][/align]`;

        return str;
    },

    InserirElenco: function () {
        var str = "";
        str += `\n[ttz]elenco[/ttz]`;

        this.Data.OMDb.Actors.split(',').forEach(element => {
            str += `\n[align=center]${element.trim()} - ATOR/ATRIZ[/align]`
        });

        if (this.Data.OMDb.Director != "N/A") {
            this.Data.OMDb.Director.split(',').forEach(element => {
                str += `\n[align=center]${element.trim()} - DIRETOR(A)[/align]`
            });
        }

        return str;
    },

    InserirCritica: function () {
        var str = "";

        if (this.Data.OMDb.Ratings.length > 0) {
            str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorCriticasImage}[/img][/align]`;

            this.Data.OMDb.Ratings.forEach(element => {
                switch (element.Source) {
                    case "Internet Movie Database":
                        str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoIMDbImage}[/img][/align]`;
                        str += `\n[align=center][b][url=https://www.imdb.com/title/${this.Data.OMDb.imdbID}]${element.Value.trim()}[/b][/url][/align]`
                        break;

                    case "Rotten Tomatoes":
                        str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoRottenTomatoesImage}[/img][/align]`;
                        str += `\n[align=center][b]${element.Value.trim()}[/b][/align]`

                        break;

                    case "Metacritic":
                        str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoMetacriticImage}[/img][/align]`;
                        str += `\n[align=center][b]${element.Value.trim()}[/b][/align]`
                        break;
                    default:
                        break;
                }
            });

        }

        return str;
    },

    InserirInformacoes: function () {
        var titulo = `${this.Data.TMDb.movie_results[0].title}`;
        
        return`\n[ttz]informacoes[/ttz]
[b]Título Brasil / Original:[/b] ${titulo} / ${this.Data.OMDb.Title}
[b]+INFO: [/b] [imdb]${this.Data.OMDb.imdbID}[/imdb]
[b]Gênero:[/b] ${this.Data.OMDb.Genre}
[b]Classificação Indicativa: [/b] [clas]${this.Data.OMDb.Rated}[/clas]
[b]Ano:[/b] ${this.Data.OMDb.Year}   
[b]Qualidade:[/b] ${this.Qualidade}
[b]Idiomas:[/b] ${this.Idioma}
[b]Legendas:[/b] ${this.Legenda}
[b]Formato:[/b] ${this.Formato}
[b]Vídeo Info:[/b] ${this.VideoInfo}
[b]Resolução:[/b] ${this.Resolução}
[b]Áudio Info:[/b] ${this.AudioInfo}
[b]Duração:[/b] ~${this.Data.OMDb.Runtime}utos
[b]Tamanho:[/b] ~${this.Tamanho}
[b]Ripador/Encoder: [/b] [cargo=rip]${this.Ripador}[/cargo]
[b]Remasterizador: [/b] [cargo=rmz]${this.Remasterizador}[/cargo]
[b]Colaborador(es): [/b] [cargo=colab]${this.Colaborador}[/cargo]`
    },
    InserirSubber: function () {
        var str = ""

        if (this.Subber) {
            str += `\n[b]Subber: [/b] [cargo=user]${this.Subber}[/cargo]`;
            str += `\n[b]Uploader: [/b] [cargo=adm|mode|colab|${this.Uploader}[/cargo]`;
            str += `\n[b]Senha: [/b] [b]###### coloque a senha aqui ######[/b] (CASO HAJA)`;
            str += `\n[b]Server: [/b] [b][color=blue]${this.Servidor}[/color][/b]`;
        } else {
            str += `\n[b]Uploader: [/b] [cargo=adm|mode|colab|${this.Uploader}[/cargo]`;
            str += `\n[b]Senha: [/b] [b]###### coloque a senha aqui ######[/b] (CASO HAJA)`;
            str += `\n[b]Server: [/b] [b][color=blue]${this.Servidor}[/color][/b]`;
        }
        return str;
    },
    InserirMediainfo: function () {
        var str = "";

        if (this.Mediainfo) {
            str += `\[spoiler=MediaInfo][nfo]${this.Mediainfo}[/nfo][/spoiler]`;
        } else {
            str = ""
        }
        return str;
    },
    
    InserirScreenshots: function () {
        var str = "";

        if (this.Screenshot) {
            str += `\n[ttz]screenshots[/ttz]`;
            str += `\n[align=center][ss]${this.Screenshot}[/ss][ss]###### URL DA SCREENSHOT ######[/ss]
[ss]###### URL DA SCREENSHOT ######[/ss][ss]###### URL DA SCREENSHOT ######[/ss][/align]`;
        } else {
            str = ""
        }
        return str;
    },

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
    
    InserirAgradecimentos: function () {
        var str = "";

        if (this.Agradecimentos) {
            str += `\n[ttz]agradecimentos[/ttz]`;
            str += `\n[align=center]${this.Agradecimentos}[/align]`;
        } else {
        }
        return str;
    },
    
    InserirObservacoes: function () {
        var str = "";

        if (this.Observacoes) {
            str += `\n[ttz]observacoes[/ttz]`;
            str += `\n[align=center]${this.Observacoes}[/align]`;
        } else {
        }
        return str;
    },

    InserirDownload: function () {
        var titulo = `${this.Data.TMDb.movie_results[0].title}`;

        return`\n[ttz]download[/ttz]
[hide][spoiler=Links][align=center][b][color=green]${titulo}[/color][/b]
[servidor=${this.Servidor}]${this.Url}[/servidor] [servidor=###### NOME DO SERVIDOR TOTALMENTE MINUSCULO ######]###### LINK DO ARQUIVO ######[/servidor]

###### Se for postar em diversas partes: ######
Parte 01 [servidor=${this.Servidor}]###### LINK DO ARQUIVO ######[/servidor]
Parte 02 [servidor=${this.Servidor}]###### LINK DO ARQUIVO ######[/servidor]
Parte 03 [servidor=${this.Servidor}]###### LINK DO ARQUIVO ######[/servidor]
Parte 04 [servidor=${this.Servidor}]###### LINK DO ARQUIVO ######[/servidor]
Parte 05 [servidor=${this.Servidor}]###### LINK DO ARQUIVO ######[/servidor][/align][/spoiler][/hide]

[final][cargo=adm|mode|colab|amigo ou user]${this.Uploader}[/cargo][/final]`;
    },


    OMDbService: function () {
        var urlRequest = baseLib.StaticUrl.urlServiceOMDb + this.IMDbId + "&y=&plot=full&apikey=b045eb33";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    },

    TMDbService: function () {
        var urlRequest = baseLib.StaticUrl.urlServiceTMDb + this.IMDbId + "?api_key=650fbb9313eab50f47bc5981772e8218&language=pt-BR&external_source=imdb_id";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }


};