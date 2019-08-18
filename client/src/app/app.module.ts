import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {DrawerComponent} from './layout/drawer/drawer.component';
import {FormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule
} from "@angular/material";

@NgModule({
    declarations: [
        AppComponent,
        ContentLayoutComponent,
        DrawerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
