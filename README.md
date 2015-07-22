#Sketch Flowchart
This a plugin to quickly create [flowcharts](https://en.wikipedia.org/wiki/Flowchart) in [Sketch](http://bohemiancoding.com/sketch/). 

This project is based on [AEFlowchart](https://github.com/tadija/AEFlowchart) but has a bunch of new features: **Configurations**, **New Symbols**, and **Layer Styles** and **Text Styles**.

![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/sketch-flowchart.gif)

## Symbols
![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/sketch-flowchart-menu.png)

| Symbol   	   | Shortcut | Shape   | Color   | Image |
|:------------|:----------|:--------|:--------|:--------:|
| **Decision**    | ^⇧ + D    | Diamond | <span style="color: #FF552A">#FF552A</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/decision.png) |
| **Input Output** | ^⇧ + O    | Parallelogram | <span style="color: #1C69D4">#1C69D4</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/input-output.png) |
| **Internal Storage** | ^⇧ + I  | Rectangle with Cross | <span style="color: #D0021B">#D0021B</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/internal-storage.png) |
| **Manual Input** | ^⇧ + M  | Trapezoid | <span style="color: #666766">#666766</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/manual-input.png) |
| **Process** | ^⇧ + P  | Rectangle | <span style="color: #1C69D4">#1C69D4</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/process.png) |
| **Start/End** | ^⇧ + S  | Rounded Rectangle | <span style="color: #1F72E4">#1F72E4</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/start-end.png) |

| Other   	   | Shortcut | Shape   | Color   | Image |
|:------------|:----------|:--------|:--------|:--------:|
| **Connect**    | ^⇧ + C    | Line with Arrow | <span style="color: #666766">#666766</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/arrow.png) |
| **Label Line** | ^⇧ + L    | Label with Background | <span style="color: #262626">#262626</span> | ![Sketch Flowchart](http://alienresident.net/demo/sketch-flowchart/symbols/label.png) |

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

