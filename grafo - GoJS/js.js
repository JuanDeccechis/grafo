function goIntro(){
	let $ = go.GraphObject.make;
	let diagram = new go.Diagram("myDiagramDiv");

	diagram.initialContentAligment = go.Spot.Center;

	diagram.add(
		$(go.Part, "Auto", {desiredSize: new go.Size(250,50)},
			$(go.Shape, "RoundedRectangle", {fill: "white"}),
			$(go.TextBlock, "some text",
			{
				background: "lightgray",/*,
				alignment: go.Spot.Right*/
				stretch: go.GraphObject.Fill,
				textAlign: "right"
			}
				)))

	diagram.nodeTemplate = 
		$(go.Node, go.Panel.Auto,
			$(go.Shape,
				{ figure: "RoundedRectangle"},
				new go.Binding("fill", "color")/*,
				new go.Binding("position", "20,20")*/
				),
			/*location: 50 0*/
			$(go.TextBlock,
				{margin: 3},
				new go.Binding("text", "key")));

	diagram.linkTemplate = 
		$(go.Link,
			$(go.Shape, {strokeWidth: 2},
				new go.Binding("stroke", "color")),
			$(go.Shape, {toArrow: "Standard", stroke: null},
				new go.Binding("fill", "color")));

	let nodeDataArray = [
		{key: "Alpha", color: "LightBlue"},
		{key: "Beta", color: "Orange"}
	];
	let linkDataArray = [
		{from: "Alpha", to: "Beta", color: "red"}
	];
	diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
/*
	myDiagram.nodeTemplate = 
		$(go.Node, "Auto",
			$(go.Shape, "RoundedRectangle", {fill: "white"}),
			$(go.TextBlock, "text")
		);*/
}

goIntro();

/*
https://www.youtube.com/watch?v=7cfHF7yAoJE&ab_channel=GoJSJavaScriptDiagrammingLibrary
permite crear nodo = grupo, y definir nodos que se agreguen en el grupo
*/

document.querySelector("#graficar").addEventListener("click", graficar);
document.querySelector("#btn-perspectivas").addEventListener("click", setPerspectivas);
let cantidadPerspectivas = 0;

function setPerspectivas(){
    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    for (let i = 0; i < cantidadPerspectivas; i++) {
        obji = document.createElement("input"); 
        obji.setAttribute("id", "inputObjetivo" + i);
        obji.setAttribute("placeholder", "cantidad objetivos p"+ i);
        document.querySelector("#inputs-objetivos").appendChild(obji);
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
		{key: "perspectivaPar", color: "lightgray", isGroup: true},
		{key: "perspectivaImpar", color: "blue", isGroup: true},
		{key: "Alpha", color: "LightBlue", group: "perspectivaPar"},
		{key: "Beta", color: "Orange", group: "perspectivaImpar"}
	];
    
	let linkDataArray = [
		{from: "Alpha", to: "Beta", color: "red"}
	];
	diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    /*goIntro();*/

    cantidadPerspectivas = document.querySelector("#perspectivas").value;
    let widthTotal = 400;
    let heightTotal = 250;
    let mywidth = widthTotal/cantidadPerspectivas;
    console.log(mywidth);
    for (let i = 0; i < cantidadPerspectivas; i++) {
    	if (i%2)
    		/*diagram.model.addNodeData({key: "perspectivas"+i, color: "red", group: "perspectivaPar"});*/
    		diagram.model.addNodeData({key: "perspectivas"+i, color: "lightgray", isGroup: true});
    	else
    		/*diagram.model.addNodeData({key: "perspectivas"+i, color: "red", group: "perspectivaImpar"});*/
    		diagram.model.addNodeData({key: "perspectivas"+i, color: "blue", isGroup: true});
    }


    if(nodeDataArray.lenght > cantidadPerspectivas/*key.contains("perspectivas")*/) {
		diagram.nodeTemplate = 
		$(go.Node, go.Panel.Auto, 
			$(go.Shape /*figura*/,
				{ figure: "RoundedRectangle",
				  width: mywidth},
				new go.Binding("fill", "color")/*
				new go.Binding("position", "20,20")*/
				),
			/*location: 50 0*/
			$(go.TextBlock,
				{margin: 3},
				new go.Binding("text", "key")));
	}
	else{
		diagram.nodeTemplate = 
		$(go.Node, go.Panel.Auto, 
			$(go.Shape /*figura*/,
				{ figure: "RoundedRectangle",
				  width: 50},
				new go.Binding("fill", "color")/*
				new go.Binding("position", "20,20")*/
				),
			/*location: 50 0*/
			$(go.TextBlock,
				{margin: 3},
				new go.Binding("text", "key")));	
	}
}
