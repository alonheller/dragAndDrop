import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {DrawerComponent} from './layout/drawer/drawer.component';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import { ViewerComponent } from './layout/viewer/viewer.component';

@NgModule({
    declarations: [
        AppComponent,
        DrawerComponent,
        ViewerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
