
/*
https://www.youtube.com/watch?v=7cfHF7yAoJE&ab_channel=GoJSJavaScriptDiagrammingLibrary
permite crear nodo = grupo, y definir nodos que se agreguen en el grupo
*/

document.querySelector("#graficar").addEventListener("click", setObjetivosYGraficar);
document.querySelector("#btn-perspectivas").addEventListener("click", setPerspectivas);
let cantidadPerspectivas = 0;
let objetivosPerspectivas = [];

function setPerspectivas(){
    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    for (let i = 0; i < cantidadPerspectivas; i++) {
        obji = document.createElement("input"); 
        obji.setAttribute("id", "inputObjetivo" + i);
        obji.setAttribute("placeholder", "cantidad objetivos p"+ i);
        document.querySelector("#inputs-objetivos").appendChild(obji);
    }
}

function setObjetivosYGraficar(){
	setObjetivos();
	graficar();
}

function setObjetivos(){
	for (let i = 0; i < cantidadPerspectivas; i++) {
        let cantidadObjetivos = document.querySelector("#inputObjetivo" + i).value;
        objetivosPerspectivas[i] = cantidadObjetivos;
    }	
}

function graficar(){
    let perspectiva;
    let texto;
    let objetivoVacio;
    let objetivo;

    

    let $ = go.GraphObject.make;
	let diagram = new go.Diagram("myDiagramDiv");
	diagram.initialContentAligment = go.Spot.Center;


	let nodeDataArray = [
	];
    
	let linkDataArray = [
		{from: "objetivo 1 - 0", to: "objetivo 0 - 0", color: "red"}
	];
	diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    /*goIntro();*/

    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    let widthTotal = 400;
    let heightTotal = 383;
    let myheight = heightTotal/cantidadPerspectivas;
    let mySize = widthTotal +" " + myheight;
    console.log(mySize);
    let yOrigen = 0;
    let posOrigen = 0 + " " + yOrigen;
    let myColor ="";
    let sizeTotal = widthTotal + " " + heightTotal;

    
    for (let i = 0; i < cantidadPerspectivas; i++) {
    	/*if (i%2)
    		myColor = "lightgray";
    	else
    		myColor = "gray";
    		*/
    	diagram.model.addNodeData({key: "perspectiva "+i, color: "lightgray", isGroup: true, size: mySize, loc: posOrigen, highlight: "blue"});
    	let objYOrigen = yOrigen + 20;
    	let objXOrigen = 0;
    	let posObjetivo;
    	for (let j = 0; j < objetivosPerspectivas[i]; j++) {
    		objXOrigen = objXOrigen + 20;
    		posObjetivo = objXOrigen + " " + objYOrigen;
    		diagram.model.addNodeData({key: "objetivo "+i+ " - " +j, color: "red", group: "perspectiva "+i, loc: new go.Point(objXOrigen.value, objYOrigen.value)});
    	}
    	yOrigen = yOrigen + myheight;
    	posOrigen = 0 + " " + yOrigen; 
    }

    diagram.nodeTemplate = 
		$(go.Node, go.Panel.Auto,
			 new go.Binding("location", "loc", go.Point.parse),
			$(go.Shape,
				{ figure: "RoundedRectangle"},
				new go.Binding("fill", "color")/*,
				new go.Binding("position", "20,20")*/
				),
			/*location: 50 0*/
			$(go.TextBlock,
				{margin: 3},
				new go.Binding("text", "key")));

	diagram.groupTemplate =
	    $(go.Group, "Vertical",
		    { background: "transparent",
		    selectionObjectName: "PH",
	        locationObjectName: "PH",
	        resizable: true,
	        resizeObjectName: "PH" },
	      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
	      $(go.Panel, "Auto",
			
	    	$(go.Shape,  // using a Shape instead of a Placeholder
	        	{ name: "PH",
	        	strokeWidth: 2 },
	        	new go.Binding("fill", "color"),
	        	new go.Binding("stroke", "highlight"),
	        	new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
	    	),
	    	$(go.Placeholder,    
                        { padding: 1 }),
	    	$(go.TextBlock,         // group title
        		{ alignment: go.Spot.BottomCenter, font: "Bold 12pt Sans-Serif" },
        		new go.Binding("text", "key"))


	    ));

	
}
