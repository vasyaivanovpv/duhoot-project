//Initialize Smooth Scroll.
smoothScroll.init();

//MENU
function toggleMenu(x) {
  x.classList.toggle('change');
	login.classList.toggle('visible');
	navSite.classList.toggle('visible');
	wrapHeader.classList.toggle('larger');
}
function toggleList(x) {
	x.classList.toggle('focus');
	if (x.classList.contains('focus')) {
		listCity.style.display = 'block';		
	} else {
		listCity.style.display = 'none';				
	}
}

//remove focus from listCity
document.onclick = function(e) {
	if (e.target !== mainCity && !mainCity.contains(e.target)) {
		listCity.style.display = 'none';	
		mainCity.classList.remove('focus');
	}
}

//set city to filterCity
listCity.addEventListener("click", setCity, false);
function setCity(e) {
	if (e.target.tagName === 'A') {
		var text = e.target.innerHTML;
		filterCity.innerHTML = text;
	} else if (e.target.tagName === "LI") {
		var text = e.target.firstChild.innerHTML;
		filterCity.innerHTML = text;
	}
}

//set selection
var selectionLinks = document.querySelectorAll('.selection a');
selection.addEventListener("click", setSelection, false);
var selectSelection;
function setSelection(e) {
	var items = document.getElementsByClassName("item");
	if (e.target.tagName === 'A') {
		for (var i = 0; i < selectionLinks.length; i++) {
			if (selectionLinks[i].parentElement.classList.contains('active')) {
				selectionLinks[i].parentElement.classList.remove('active');
			}
		}
		e.target.parentElement.classList.toggle('active');
		
		var currentSelect = e.target.dataset.selection;
		if (!selectFilter) {
			selectSelection = currentSelect;
		}
		console.log(e.target);
		
		if (selectSelection == currentSelect) {
			[].forEach.call(items, function(item) {
				item.style.display = "none";
				console.log(item.dataset.setSelection);
				console.log(currentSelect);
				console.log(item.dataset.setSelection === currentSelect);
				if (item.dataset.setSelection === currentSelect) {
					item.style.display = "block";
				}
			})			
		} else if (selectSelection !== currentSelect) {
//			console.log("not equal");
			[].forEach.call(items, function(item) {
				if (item.classList.contains(currentSelect)) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				} 
			})
		}	
		selectSelection = currentSelect;
	}	
}

//set offer-block
function setDispValWithVerif(value, target, conds) {
	if (Array.isArray(conds)) {
		for (var i = 0; i < conds.length; i++) {
			var cond = conds[i];
			if (target.classList.contains(cond)) {
				target.parentNode.classList.toggle("filter-active");
				var data = target.dataset.radio;
				var id = "blocks" + data;
				document.getElementById(id).style.display = value;				
			}
		}
	} else if (typeof conds === "string") {
		if (target.classList.contains(conds)) {
				elem.style.display = value;
			}		
	}
}
var blocks = document.getElementsByClassName('blocks');
radios.addEventListener("click", changeSlide, false);
function changeSlide(e) {
	var target = e.target;
	if (target.tagName === 'LI') {
		for (var i = 0; i < radios.children.length; i++) {
			radios.children[i].classList.remove('radio-active');
		};
		target.classList.toggle('radio-active');
		
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].style.display = 'none';
		};
		
		var conditions = ["radio-real", "radio-liv", "radio-edu", "radio-ent", "radio-mob"]
		setDispValWithVerif('block', target, conditions); 
	}
}

//set filter
filters.addEventListener("click", setFilter, false);
var selectFilter;
function setFilter(e) {
	var items = document.getElementsByClassName("item");
	var currentFilter = e.target.dataset.filter;
	if (e.target.tagName === "A") {
		if (!selectFilter) {
			selectFilter = currentFilter;			
		} 
		var findItems = document.getElementsByClassName(selectFilter);
		var computedStyleDispl;
		if (selectFilter == currentFilter) {
//			console.log("equally");
			[].forEach.call(items, function(item) {
//				var hasFilter = item.dataset.hasFilter;
				computedStyleDispl = getComputedStyle(item).display;
				if (computedStyleDispl == "block" && !item.classList.contains(selectFilter)) {
//					console.log("1");
					item.style.display = "none";
				} else {
//					console.log("2");
					item.style.display = "block";
				} 
			})
		} else if (selectFilter !== currentFilter) {
//			console.log("not equal");
			[].forEach.call(items, function(item) {
				if (item.classList.contains(currentFilter)) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				} 
			})
		}					
		selectFilter = currentFilter;
	}
}





















































































