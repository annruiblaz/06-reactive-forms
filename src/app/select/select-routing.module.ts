import { RouterModule, Routes } from "@angular/router";
import { SelectorPageComponent } from "./pages/selector-page/selector-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'countries', component: SelectorPageComponent},
            { path: '**', redirectTo: 'countries'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SelectRoutingModule {}