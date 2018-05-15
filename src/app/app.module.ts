import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './prod/navbar/navbar.component';
import {FdsComponent} from './prod/content/fds/fds.component';
import {RouterModule, Routes} from '@angular/router';
import {ViewsetComponent} from './prod/content/viewset/viewset.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TableComponent} from './test/table/table.component';
import {TreeTestComponent} from './test/tree-test/tree-test.component';
import { FilterComponent } from './prod/filter/filter.component';
import { TestDemoComponent } from './test/test-demo/test-demo.component';


// 配置路由
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', component: ViewsetComponent
  }, {
    path: 'fds', component: FdsComponent
  }, {
    path: 'tree/:id', component: TreeTestComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FdsComponent,
    ViewsetComponent,
    TableComponent,
    TreeTestComponent,
    FilterComponent,
    TestDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,                      // form
    RouterModule.forRoot(routes),     // Router
    HttpClientModule,                 // http
    // SelectModule
    // NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
