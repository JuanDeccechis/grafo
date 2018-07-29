/*
https://www.youtube.com/watch?v=7cfHF7yAoJE&ab_channel=GoJSJavaScriptDiagrammingLibrary
*/

document.querySelector("#graficar").addEventListener("click", setObjetivosYGraficar);
document.querySelector("#btn-perspectivas").addEventListener("click", setPerspectivas);
let cantidadPerspectivas = 0;
let objetivosPerspectivas = [];
let cantidadLinks = 0;
let objetivos = [];
    let objetivo = {
    	"perspectiva":  0,
    	"id": "",
    	"valor": 0,
    	"imagen": "",
    	"colorOBjetivo": ""
    }
let links = [];
    let Link = {
    	"origen": "",
    	"to": "",
    	"color": "",
    	"valor": ""
    }


function setPerspectivas(){
    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    for (let i = 0; i < cantidadPerspectivas; i++) {
        obji = document.createElement("input"); 
        obji.setAttribute("id", "inputObjetivo" + i);
        obji.setAttribute("placeholder", "cantidad objetivos p"+ i);
        document.querySelector("#inputs-objetivos").appendChild(obji);
    };
    links = document.createElement("input"); 
    links.setAttribute("id", "inputLinks");
    links.setAttribute("placeholder", "cantidad links");
    document.querySelector("#inputs-objetivos").appendChild(links);
}

function setObjetivosYGraficar(){
	setObjetivos();
	setLinks();
	graficar();
}

function setObjetivos(){
	let cantidad = 0;
	for (let i = 0; i < cantidadPerspectivas; i++) {
        let cantidadObjetivos = document.querySelector("#inputObjetivo" + i).value;
        objetivosPerspectivas[i] = cantidadObjetivos;
    	for (let j = 0; j < objetivosPerspectivas[i]; j++) {
    		let objetivo = new Object();
    		objetivo.perspectiva = i;
    		objetivo.id =  i + " - " + j;
    		objetivo.valor = Math.random() * 10;
    		objetivo.tendencia = Math.random();
    		objetivo.imagen = "";
    		objetivo.colorObjetivo = "";
    		objetivos[cantidad] = objetivo;
    		cantidad++;
    	}
    
    }	
}

function getColorRandom() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setLinks(){
	cantidadLinks = document.querySelector("#inputLinks").value;
	let cantidad = 0;
	for (let i = 0; i < cantidadPerspectivas; i++) {
        let cantidadObjetivos = document.querySelector("#inputObjetivo" + i).value;
        cantidad = cantidad + parseInt(cantidadObjetivos);
    }
	for(let i = 0; i < cantidadLinks; i++){
		let link = new Object();
		link.origen = objetivos[Math.floor(Math.random() * cantidad)].id;
		link.destino =objetivos[Math.floor(Math.random() * cantidad)].id;
		link.color = getColorRandom();
		link.valor = Math.random() * 10;
		links[i] = link;
	}
}

function graficar(){
    let $ = go.GraphObject.make;
	let diagram = $(go.Diagram,"myDiagramDiv"/*, { isReadOnly: true}*/);
	diagram.initialContentAligment = go.Spot.TopLeft;

	let nodeDataArray = [
	];
    
	let linkDataArray = [
	];
	diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    let widthTotal = (document.querySelector("#myDiagramDiv").clientWidth - 20);
    let heightTotal = (document.querySelector("#myDiagramDiv").clientHeight - 20);
    let myheight = heightTotal/cantidadPerspectivas;
    let mySize = widthTotal +" " + myheight;
    let yOrigen = 0;
    let posOrigen = 0 + " " + yOrigen;
    let colorObjetivo ="";
    let sizeTotal = widthTotal + " " + heightTotal;

    let cantidad = 0;

    diagram.nodeTemplate = 
        $(go.Node, "Spot", /*go.Panel.Auto*/
            {selectionObjectName: "PH",
            locationObjectName: "PH",
            /*resizable: true,*/
            resizeObjectName: "PH",
            deletable: false},
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape,
                { figure: "Ellipse",
                desiredSize: new go.Size(120, 60)},
                new go.Binding("fill", "color")/*,
                new go.Binding("position", "20,20")*/
                ),
            /*location: 50 0,*/
            $(go.TextBlock,
                {margin: 3},
                new go.Binding("text", "key")),

            $(go.Picture,
                {desiredSize: new go.Size(25,25), alignment: new go.Spot(0.9,0)/*, alignmentFocus: go.Spot.TopRight*/},
                new go.Binding("source", "imagen")));

    diagram.linkTemplate =
        $(go.Link,
                {
                 curve: go.Link.JumpOver  /*go.Link.JumpOver*/},  // link route should avoid nodes
            $(go.Shape,
                {strokeWidth: 2},
                new go.Binding("stroke", "color")
                ),
            $(go.Shape, { toArrow: "Triangle", strokeWidth: 2}, 
                new go.Binding("fill", "color"),
                new go.Binding("stroke", "color")),
            $(go.TextBlock, 
                new go.Binding("text", "valor"), {segmentOffset: new go.Point(0,10)}) /*texto del link*/
        );

    diagram.groupTemplate =
        $(go.Group, "Vertical",
            { background: "transparent",
            selectionObjectName: "PH",
            locationObjectName: "PH",
            resizable: true,
            resizeObjectName: "PH",
            deletable: false,
            /*layout: $(go.LayeredDigraphLayout) */},
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Panel, "Auto",
            
            $(go.Shape, 
                { name: "PH",
                strokeWidth: 2,
                figure: "RoundedRectangle"},
                new go.Binding("fill", "color"),
                new go.Binding("stroke", "highlight"),
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            ),
            $(go.TextBlock, 
                { alignment: go.Spot.BottomCenter, font: "Bold 12pt Sans-Serif" },
                new go.Binding("text", "key"))
        ));
    /*diagram.model.addNodeData({key: " ", color: "white", isGroup: true});*/
    for (let i = 0; i < cantidadPerspectivas; i++) {
    	console.log("pers: " + cantidadPerspectivas + "pos ["+i+"]: " + posOrigen);
        console.log("size: " + mySize);
    	diagram.model.addNodeData({key: "perspectiva "+i, color: "lightgray", isGroup: true, /*group: " ",*/ size: mySize, loc: posOrigen, highlight: "blue"});
    	let objYOrigen = yOrigen + myheight/2 -20;
    	let objXOrigen = 30;
    	let posObjetivo;
    	for (let j = 0; j < objetivosPerspectivas[i]; j++) {
    		if (objetivos[cantidad].valor < 3.34){
	    		objetivos[cantidad].colorObjetivo = "red";
    		}
	    	else{
	    		if (objetivos[cantidad].valor < 6.67){
	    			objetivos[cantidad].colorObjetivo = "yellow";
	    		}
	    		else{
	    			objetivos[cantidad].colorObjetivo = "green";
	    		}
	    	}
	    	
	    	if(objetivos[cantidad].tendencia < 0.4)
	    		objetivos[cantidad].imagen = "images/flecha abajo.png";
	    	else
	    		if(objetivos[cantidad].tendencia < 0.6)
	    			objetivos[cantidad].imagen = "images/flecha izquierda.png";
	    		else
	    			objetivos[cantidad].imagen = "images/flecha arriba.png";
	    	
            posObjetivo = objXOrigen + " " + objYOrigen;

    		diagram.model.addNodeData({key: "objetivo "+i+ " - " +j, color: objetivos[cantidad].colorObjetivo, group: "perspectiva "+i, imagen: objetivos[cantidad].imagen, loc: posObjetivo});
    		objXOrigen = objXOrigen + 150;
            cantidad++;
    	}
    	yOrigen = yOrigen + myheight;
    	posOrigen = 0 + " " + yOrigen;
    }


    for (let i = 0; i < cantidadLinks; i++)
    	diagram.model.addLinkData(	{from: "objetivo " + links[i].origen, to: "objetivo " + links[i].destino, color: links[i].color, valor: Math.ceil(links[i].valor).toString()});
	
}
