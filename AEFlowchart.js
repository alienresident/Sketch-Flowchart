// Sketch Plugin: AEFlowchart (main library)
// Source: github.com/tadija/AEFlowchart
// Version: 1.0

@import 'AESettings.js'

/*	this is the method which should be called from AEFlowchart plugins
		- elementName should be string which will be used for items naming
		- drawShape should be method which returns some shape for the given label	*/
function createStep(stepName, drawShape, fontColor, convertCase)
{

	if (typeof fontColor === 'undefined') {
		fontColor = labelFontColor;
	}

	if (typeof convertCase === 'undefined') {
		convertCase = labelConvertCase;
	}

	if([selection count] == 0) {
		[doc showMessage:"Oops, you have to select some text layer"];
	}
	else {
		
		// iterate selected items
		var loop = [selection objectEnumerator];
		while (label = [loop nextObject]) {

			// create flowchart shapes from text
			if ([label class] === MSTextLayer) {

				if(convertCase) {
					var new_text = [label stringValue].toUpperCase();
					[label setStringValue:new_text]
				}
				
				styleStepTitle(label, fontColor);
				var shape = drawShape(label);
				groupStepLayers(stepName, label, shape);

			}
			else {
				[doc showMessage:"Sorry, you have to select text layer"];
			}
		}
	}
}

/*	draw connection lines between selected objects (from top to bottom)	*/
function connectSteps(drawConnections)
{
	if([selection count] < 2) {
		[doc showMessage:"Oops, you have to select at least two layers"];
	} else {
		drawConnections(selection);
	}
}

/*	style the label as defined in AESettings.js	*/
function styleStepTitle(label, fontColor)
{
	// get current label position
	var currentFrame = [label frame];
	var currentMidX = [currentFrame midX];
	var currentMidY = [currentFrame midY];

	labelName = "Label Text Style";

	// Is the label color different from the default? 
	// Currently Font Color is the only thing that can be customized from the default
	if((labelFontColor) != (fontColor)) {
		// log("color is "+ fontColor + " not " + labelFontColor);
		labelName = stepName + " Text Style";
	}

	styleType = "layerTextStyles";

  	if(doesStyleExist(labelName, label, styleType) == false) {
    	// log(labelName + " style doesn't exist so create it");
    	createTextStyle(labelName, label, labelFontName, labelFontSize, fontColor, labelTextAlignment, labelDropShadow);
	}

	// restore label position
	var newFrame = [label frame];
	[newFrame setMidX:currentMidX];
	[newFrame setMidY:currentMidY];

	if (labelDropShadow) {
		// add default shadow
		var shadows = [[label style] shadows];
		if([shadows count] <= 0) [shadows addNewStylePart];
	}
}

/*	group and name the label and shape layers	*/
function groupStepLayers(stepName, label, shape)
{
	var parentGroup = [label parentGroup];

	// create new group
	var newGroup = [parentGroup addLayerOfType:"group"];
	[newGroup setName:stepName + " - " + [label stringValue]];

	// add shape to new group
	[shape setName:stepName + " Shape - " + [label stringValue]];
	[newGroup addLayers:[shape]];
	[parentGroup removeLayer:shape];

	// add label to new group
	[label setName:stepName + " Label - " + [label stringValue]];
	[newGroup addLayers:[label]];
	[parentGroup removeLayer:label];

	// deselect label
	[label setIsSelected:false];

	// refresh group size
	[newGroup resizeRoot:0];

	// select new group 
	[newGroup setIsSelected:true];
}

function getNamesOfStyles(typeOfStyle) {

	// Load  Style objects 
	var styles = typeOfStyle.objects();

	// Create an empty array to put the LayerStyles names
	var styleNames = [];

	for (var i=0; i < [styles count]; i++) {
		var style = [styles objectAtIndex:i];
  		styleNames.push([style name]);
	}

 	return styleNames;
}

/* Search Shared Style Index Postion in array of Layer Styles */
function searchStyleInStyleNames(styleNames, styleName) {

    for (var i=0; i<styleNames.length; i++) {

        if (styleNames[i].match(styleName)) {
        	// log("index postion: " + i);
        	return i;
        }
    }
    return -1;
}

function doesStyleExist(stepName, shape, styleType) {

	if(styleType == "layerStyles") {
		typeOfStyle = doc.documentData().layerStyles();
	} else if(styleType == "layerTextStyles") {
		typeOfStyle = doc.documentData().layerTextStyles();
	} else {
		log("Style Type Error! What is this?: " + styleType)
	}

	var styleNames = getNamesOfStyles(typeOfStyle);
	//log(styleNames);

    var styleNameIndex = searchStyleInStyleNames(styleNames, stepName);

    if(styleNameIndex != -1) {
    	// log("style already exists")
    	var stepStyle=typeOfStyle.objects().objectAtIndex(styleNameIndex);
    	shape.setStyle(stepStyle.newInstance());
    	// Refresh inspector to reflect changes.
  		doc.reloadInspector();
    } else {
    	// log("create new style")
    	return false;
    }
}

function createLayerStyle(stepName, shape, color, innerShadows) {

	// Get shared Layer styles container
	var sharedStyles=doc.documentData().layerStyles();

	// Create custom style programmatically.
    var style=MSStyle.alloc().init();
    var style = shape.style();

    // Setup fill
    var fill=style.fills().addNewStylePart();
    fill.color = MSColor.colorWithSVGString(color);

    // Setup inner shadows with default settings.
    if (innerShadows) {
      style.innerShadows().addNewStylePart();
    }

    // Add new styles to shared styles
    sharedStyles.addSharedStyleWithName_firstInstance(stepName, shape.style());

  	// Refresh inspector to reflect changes.
  	doc.reloadInspector();
} 

function createBorderStyle(stepName, shape, borderColor, borderThickness, startArrow, startArrowType, endArrow, endArrowType) {

	// Get shared Layer styles container
	var sharedStyles=doc.documentData().layerStyles();

	// Create custom style programmatically.
    var style=MSStyle.alloc().init();
    var style = shape.style();

	// add border
	var shapeStyle = [shape style];
	var borders = [shapeStyle borders];
	if([borders count] <= 0) [borders addNewStylePart];
	var border = [shapeStyle border];
	[border setColor:[MSColor colorWithSVGString:borderColor]];

	border.thickness = borderThickness;

	// set arrows 
	if(startArrow) {
		shape.firstLayer().setStartDecorationType(startArrowType);
	}
	if(endArrow) {
		shape.firstLayer().setEndDecorationType(endArrowType);
	}

    // Add new styles to shared styles
    sharedStyles.addSharedStyleWithName_firstInstance(stepName, shape.style());

  	// Refresh inspector to reflect changes.
  	doc.reloadInspector();
}

function createTextStyle(labelName, label, labelFontName, labelFontSize, labelFontColor, labelTextAlignment, labelDropShadow) {

	// Get shared Layer styles container
	var sharedStyles=doc.documentData().layerTextStyles();

	// label settings
	[label setFontPostscriptName:labelFontName];
	[label setFontSize:labelFontSize];
	[label setTextColor:[MSColor colorWithSVGString:labelFontColor]];
	[label setTextAlignment:labelTextAlignment];

	if (labelDropShadow) {
		// add default shadow
		var shadows = [[label style] shadows];
		if([shadows count] <= 0) [shadows addNewStylePart];
	}

    // Add new styles to shared styles
    sharedStyles.addSharedStyleWithName_firstInstance(labelName, label.style());

  	// Refresh inspector to reflect changes.
  	doc.reloadInspector();
}