const tela = document.querySelector('.tela')
const seuVotoVai = document.querySelector('.tela .titulo--1')
const tituloCandidato = document.querySelector('.tela .titulo--2')
const caixasRecebendoNumeros = document.querySelector('.tela .digitos')
const informacoesDoVoto = document.querySelector('.tela .informacoes--do--voto')
const identificacaoDosCandidatos = document.querySelector('.tela .identificacao')
const avisos = document.querySelector('.tela .avisos')
const fim = document.querySelector('.tela .fim')
const audioFim = new Audio()
audioFim.src = "som-urna-eletronica-brasileira.mp3"

let etapa = 0
let armazenandoDigitos = []

function iniciandoUrna(){
	let caixas = ''

	for(let i = 0; i < eleicoes[etapa].digitos; i++){
		if(i == 0){
			caixas += '<div class="pisca"></div>'
		}else{
			caixas += '<div></div>'
		}
	}

	caixasRecebendoNumeros.innerHTML = caixas
	caixasRecebendoNumeros.style.display = 'flex'
	seuVotoVai.style.opacity = '0'
	tituloCandidato.innerHTML = `${eleicoes[etapa].titulo}`
	avisos.style.display = 'none'
	identificacaoDosCandidatos.innerHTML = ''
	informacoesDoVoto.innerHTML = ''
	fim.style.display = 'none'
}

iniciandoUrna()

function eventoClique(n){
	let validacao = document.querySelector('.tela .digitos .pisca')

	if(validacao != null){
		validacao.innerHTML = n
		armazenandoDigitos += n
		validacao.classList.remove('pisca')
		
		if(validacao.nextElementSibling != null){
			validacao.nextElementSibling.classList.add('pisca')
		}else{
			retornandoCanditados()
		}
	}
}

function retornandoCanditados(){
	for(let i = 0; i < eleicoes[etapa].candidatos.length; i++){
		if(eleicoes[etapa].candidatos[i].numero == armazenandoDigitos){
			if(eleicoes[etapa].candidatos[i].vice !== undefined){
				seuVotoVai.style.opacity = '1'
				informacoesDoVoto.innerHTML = `<p id="nome">Nome: ${eleicoes[etapa].candidatos[i].nome}</p><p>Vice: ${eleicoes[etapa].candidatos[i].vice}</p><p id="partido">Partido: ${eleicoes[etapa].candidatos[i].partido}</p>`
				identificacaoDosCandidatos.innerHTML = `<img src="${eleicoes[etapa].candidatos[i].fotos[0].url}"><img src="${eleicoes[etapa].candidatos[i].fotos[1].url}" class="pequena">`
				avisos.style.display = 'block'
				break
			}else{
				seuVotoVai.style.opacity = '1'
				informacoesDoVoto.innerHTML = `<p id="nome">Nome: ${eleicoes[etapa].candidatos[i].nome}</p><p id="partido">Partido: ${eleicoes[etapa].candidatos[i].partido}</p>`
				identificacaoDosCandidatos.innerHTML = `<img src="${eleicoes[etapa].candidatos[i].fotos[0].url}">`
				avisos.style.display = 'block'
				break
			}
		}else{
			seuVotoVai.style.opacity = '1'
			informacoesDoVoto.innerHTML = `<p id="nome" class="pisca">Voto nullo</p>`
			avisos.style.display = 'block'
		}
	}
}

function branco(){
	if(window.getComputedStyle(fim).display == 'none'){
		identificacaoDosCandidatos.innerHTML = ''
		caixasRecebendoNumeros.style.display = 'none'
		seuVotoVai.style.opacity = '1'
		informacoesDoVoto.innerHTML = `<p id="nome" class="pisca">Voto em branco!</p>`
		avisos.style.display = 'block'
	}
}

function corrigir(){
	if(window.getComputedStyle(fim).display == 'none'){
		iniciandoUrna()
		armazenandoDigitos = []
	}
}

function confirmar(){
	if(armazenandoDigitos.length == eleicoes[etapa].digitos || window.getComputedStyle(caixasRecebendoNumeros).display == 'none'){
		if(etapa == eleicoes.length - 1){
			etapa = 0
			caixasRecebendoNumeros.style.display = 'none'
			seuVotoVai.style.opacity = '0'
			tituloCandidato.innerHTML = ``
			avisos.style.display = 'none'
			identificacaoDosCandidatos.innerHTML = ''
			informacoesDoVoto.innerHTML = ''
			fim.style.display = 'block'
			audioFim.play()
			setTimeout(()=>{
				iniciandoUrna()
				armazenandoDigitos = []
			},5000)
		}else{
			etapa++
			iniciandoUrna()
			armazenandoDigitos = []
		}
	}
}