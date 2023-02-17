var _pid = 0
var fp = -1

window.onload = function() {
	newPage('http://180.166.0.98:12349/')
	document.getElementsByClassName("preload")[0].addEventListener("click", reloadpage)
}

function _geticnurl(url) {
	let _l = new URL(url);
	return _l.protocol + "//" + _l.host + "/favicon.ico"
}

function _getitle() {
	try {
		document.getElementById("pt" + fp).innerHTML = document.getElementsByClassName("inner")[0].contentWindow
			.document.getElementsByTagName("title")[0].innerHTML
	} catch (e) {
		document.getElementById("pt" + fp).innerHTML = (new URL(document.getElementById("ph" + fp).dataset["src"])).host
	}
}

function newPage(url) {
	var hc = '<div class="pcard ufc" id="ph' + _pid + '"><img id="pi' + _pid + '" src="'
	hc += _geticnurl(url)
	hc += '" class="picon"><span class="ptit" id="pt' + _pid + '">'
	hc += url
	hc += '</span><i class="pclose fas fa-window-close" data-font="fas fa-window-close" id="pc' + _pid + '"></i></div>'
	document.getElementsByClassName("header")[0].innerHTML += hc
	document.getElementById("ph" + _pid).addEventListener("click", focuspage)
	document.getElementById("ph" + _pid).dataset["src"] = url
	document.getElementById("pc" + _pid).addEventListener("click", closepage)
	document.getElementById("pc" + _pid).dataset["pid"] = _pid
	document.getElementById("ph" + _pid).click()
	_pid += 1
}

function focuspage() {
	for (let i = 0; i < _pid; i++) {
		try {
			document.getElementById("ph" + i).className = "pcard ufc"
			document.getElementById("ph" + i).addEventListener("click", focuspage)
			document.getElementById("pc" + i).addEventListener("click", closepage)
		} catch (e) {}
	}
	this.className = "pcard fc"
	document.getElementsByClassName("purl")[0].value = this.dataset["src"]
	fp = parseInt(this.childNodes[2].dataset["pid"])
	reloadpage()
}

function closepage() {
	document.getElementById("ph" + this.dataset["pid"]).parentNode.removeChild(document.getElementById("ph" + this
		.dataset["pid"]))
}

function reloadpage() {
	document.getElementsByClassName("inner")[0].src = document.getElementById("ph" + fp).dataset["src"]
	document.getElementById("pi" + fp).src = _geticnurl(document.getElementById("ph" + fp).dataset["src"])
	_getitle()
}

function _keydown(evt) {
	var evt = evt ? evt : (window.event ? window.event : null);
	if (evt.keyCode == 13) {
		this.blur()
		document.getElementById("ph" + fp).dataset["src"] = document.getElementsByClassName("purl")[0].value;
		reloadpage()
		_getitle()
	}
}
