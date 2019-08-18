import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as go from 'gojs';

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.scss']
})
export class DiagramEditorComponent implements OnInit {

    private diagram: go.Diagram = new go.Diagram();
    private palette: go.Palette = new go.Palette();

    @ViewChild('diagramDiv', null)
    private diagramRef: ElementRef;

    @ViewChild('paletteDiv', null)
    private paletteRef: ElementRef;

    @Input()
    get model(): go.Model { return this.diagram.model; }
    set model(val: go.Model) { this.diagram.model = val; }

    @Output()
    nodeSelected = new EventEmitter<go.Node|null>();

    @Output()
    modelChanged = new EventEmitter<go.ChangedEvent>();

    constructor(public dialog: MatDialog) {
        const $ = go.GraphObject.make;
        this.diagram = new go.Diagram();
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowDrop = true;
        this.diagram.undoManager.isEnabled = true;
        this.diagram.addDiagramListener("ChangedSelection",
            e => {
                const node = e.diagram.selection.first();
                this.nodeSelected.emit(node instanceof go.Node ? node : null);
            });
        this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

        // define templates for each type of node
        var circleTemplate =
            $(go.Node, "Auto", {},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle"),
            );

        var squareTemplate =
            $(go.Node, "Auto", {},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Square"),
            );

        var triangleTemplate =
            $(go.Node, "Auto", {},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Triangle")
            );

        // add the templates created above to myDiagram and palette
        this.diagram.nodeTemplateMap.add("circle", circleTemplate);
        this.diagram.nodeTemplateMap.add("square", squareTemplate);
        this.diagram.nodeTemplateMap.add("triangle", triangleTemplate);

        /*this.diagram.nodeTemplate.add(circleTemplate);
        this.diagram.nodeTemplate.add(squareTemplate);
        this.diagram.nodeTemplate.add(triangleTemplate);*/

        // share the template map with the Palette


        this.diagram.linkTemplate =
            $(go.Link,
                // allow relinking
                { relinkableFrom: true, relinkableTo: true },
                $(go.Shape),
                $(go.Shape, { toArrow: "OpenTriangle" })
            );

        this.palette = new go.Palette();
        this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

        // initialize contents of Palette
        this.palette.model.nodeDataArray =
            [
                { category: "circle" },
                { category: "square" },
                { category: "triangle" },
            ];
    }

    ngOnInit() {
        this.diagram.div = this.diagramRef.nativeElement;
        this.palette.div = this.paletteRef.nativeElement;
    }
}
