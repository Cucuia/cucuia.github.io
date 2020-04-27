var indexView = {

	bindButtons: function () {
		$('#cmbTipoGerador').change(function () {

			$('#divFilme').hide();
			$('#divJogosSteam').hide();
			$('#divPlayStore').hide();

			switch ($(this).val()) {
				case "1":
					$('#divFilme').show();
					break;
				case "2":
					$('#divJogosSteam').show();
					break;
				case "3":
					$('#divPlayStore').show();
					break;
				case "4":
					$('#divLastFM').show();
					break;
					case "5":
					$('#divGenerico').show();
					break;
				default:
					break;
			}

		});

		$('#btnLoadImdb').click(function () {

			GeradorFilme.IMDbId = $('#txtIMDbId').val().trim();
			GeradorFilme.Ripador = $('#txtRipador').val().trim();
			GeradorFilme.Remasterizador = $('#txtRemasterizador').val().trim();
			GeradorFilme.Colaborador = $('#txtColaborador').val().trim();
			GeradorFilme.Uploader = $('#txtUploader').val().trim();
			GeradorFilme.Tamanho = $('#txtTamanho').val().trim();
			GeradorFilme.Resolução = $('#txtResolução').val().trim();		
			GeradorFilme.Subber = $('#txtSubber').val().trim();
			GeradorFilme.Servidor = $('#txtServidor').val().trim();		
			GeradorFilme.Formato = $('#txtFormato').val().trim();	
			GeradorFilme.VideoInfo = $('#txtVideoInfo').val().trim();
			GeradorFilme.Qualidade = $('#txtQualidade').val().trim();
			GeradorFilme.Idioma = $('#txtIdioma').val().trim();		
			GeradorFilme.AudioInfo = $('#txtAudioInfo').val().trim();
			GeradorFilme.Legenda = $('#txtLegenda').val().trim()
			GeradorFilme.Mediainfo = $('#txtMediainfo').val().trim();
			GeradorFilme.TrailerURL = $('#txtTrailerURL').val().trim();
			GeradorFilme.Screenshot = $('#txtScreenshot').val().trim();	
			GeradorFilme.Agradecimentos = $('#txtAgradecimentos').val().trim();	
			GeradorFilme.Observacoes = $('#txtObservacoes').val().trim();	
			GeradorFilme.Url = $('#txtUrl').val().trim();		
			GeradorFilme.Validar();
		});

		$('#btnLoadSteam').click(function () {

			GeradorJogosSteam.SteamId = $('#txtSteamId').val().trim();
			GeradorJogosSteam.Validar();
		});

		$('#btnLoadPlayStore').click(function () {

			GeradorAplicativoPlayStore.GooglePlayId = $('#txtPlayStoreId').val().trim();
			GeradorAplicativoPlayStore.Validar();
		});

		$('#btnLoadLastFM').click(function () {
			geradorAlbumLastFM.urlLastFM = $('#txtLastFMUrl').val().trim();
			geradorAlbumLastFM.Validar();
		});

		$(document)
			.ajaxStart(function () {
				$('#pageLoader').addClass("is-active");
			})
			.ajaxStop(function () {
				$('#pageLoader').removeClass("is-active");
			});

		$('.tooltip').tooltipster({
			theme: 'tooltipster-shadow',
			animation: 'fade',
			delay: 100,
			trigger: 'click',
			side: ['right']


		});



	}
};
