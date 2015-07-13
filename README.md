#Sketch Flowchart
This a plugin to quickly create flowcharts in Sketch. 

This project is based on [AEFlowchart](https://github.com/tadija/AEFlowchart) but has a bunch of new features: **Configurations**, **New Symbols**, and **Layer Styles** and **Text Styles**.

![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/sketch-flowchart.gif)

## Symbols

| Symbol   	   | Shortcut | Shape   | Color   |
|:------------|:----------|:--------|:--------|
| Decision    | ^⇧ + D    | Diamond | #FF552A |
| Input Output | ^⇧ + O    | Parallelogram | #1C69D4 |
| Internal Storage | ^⇧ + I  | Rectangle with Cross | #D0021B |
| Manual Input | ^⇧ + M  | Trapezoid | #666766 |
| Process | ^⇧ + P  | Rectangle | #1C69D4 |
| Start/End | ^⇧ + S  | Rounded Rectangle | #1F72E4 |

![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/sketch-flowchart-menu.png)

### Here's what changed from AEFlowchart:
#### Configurations
* added color variables to a config file for the all flow chart symbols
* added a way to disable the default inner shadow
* The new symbol group is now selected after you create it
* arrows on the connectors (optional)

#### New symbols 
* added a *Label Line* Symbol
	* creates a label intended to be placed over a connector line  
  	* it's a duplicate of *Process* with a white background and black text
	* added a font color variable for the label needed for *Label Line* 
	* added an option to convert the *Label Line* label to UPPERCASE
* added a *Manual Input* symbol
* added an *Internal Storage* symbol

#### Layer Styles and Text Layer Styles

The symbol shape creates a shared layer style when you first create it. The Label shares a Label text style but you can specify another color and this will create a new text color.
 
* Symbols of the same type can be altered in unison in the GUI. 
* The script checks to see if the symbol's Layer Style exists and reuses it if it does.
* Added similar functionality for Label Text Style

