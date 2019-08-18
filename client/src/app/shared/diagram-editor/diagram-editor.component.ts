import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {MatDialog} from '@angular/material';
import * as go from 'gojs';
import {DataService} from '../services/data.service';
import Swal from 'sweetalert2';

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

    image: any;

    @Input()
    get model(): go.Model {
        return this.diagram.model;
    }

    set model(val: go.Model) {
        this.diagram.model = val;
    }

    @Output()
    nodeSelected = new EventEmitter<go.Node | null>();

    @Output()
    modelChanged = new EventEmitter<go.ChangedEvent>();

    constructor(public dialog: MatDialog, private dataService: DataService) {
        const $ = go.GraphObject.make;
        this.diagram = new go.Diagram();
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowDrop = true;
        this.diagram.undoManager.isEnabled = true;
        this.diagram.addDiagramListener('ChangedSelection',
            e => {
                const node = e.diagram.selection.first();
                this.nodeSelected.emit(node instanceof go.Node ? node : null);
            });
        this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

        // define templates for each type of node
        const circleTemplate =
            $(go.Node, 'Auto', {},
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'Circle'),
            );

        const squareTemplate =
            $(go.Node, 'Auto', {},
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'Square'),
            );

        const triangleTemplate =
            $(go.Node, 'Auto', {},
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'Triangle')
            );

        // add the templates created above to myDiagram and palette
        this.diagram.nodeTemplateMap.add('circle', circleTemplate);
        this.diagram.nodeTemplateMap.add('square', squareTemplate);
        this.diagram.nodeTemplateMap.add('triangle', triangleTemplate);

        this.diagram.linkTemplate =
            $(go.Link,
                // allow relinking
                {relinkableFrom: true, relinkableTo: true},
                $(go.Shape),
                $(go.Shape, {toArrow: 'OpenTriangle'})
            );

        this.palette = new go.Palette();
        this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

        // initialize contents of Palette
        this.palette.model.nodeDataArray =
            [
                {category: 'circle'},
                {category: 'square'},
                {category: 'triangle'},
            ];
    }

    ngOnInit() {
        this.diagram.div = this.diagramRef.nativeElement;
        this.palette.div = this.paletteRef.nativeElement;
    }

    onPublish() {
        // TODO: Extract logic to service class
        const img = this.diagram.makeImageData({
            scale: 1,
            background: 'White',
            type: 'image/jpeg'
        });

        this.dataService.saveDiagram(img).subscribe((res: any) => {
            console.log(`%c Saved on server`, 'background: #222; color: #bada55');

            // TODO: extract popups to service
            Swal.fire({
                title: '<strong>Diagram Saved</strong>',
                type: 'success',
                html:
                    'See it ' +
                    '<a href="http://localhost:4200/viewer/' + res.id + '" target="_blank">here</a> ',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
            });
        }, err => {
            console.log(`%c Error while saving`, 'background: #222; color: #bada55');

            Swal.fire({
                title: 'Error!',
                text: 'Publish error',
                type: 'error',
                showCloseButton: true,
            });
        });

    }
}
