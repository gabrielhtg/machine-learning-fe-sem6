import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PredictionPageComponent} from "./prediction-page/prediction-page.component";

export const routes: Routes = [
  {path: '', component : HomeComponent, title : "Home"},
  {path: 'generate', component : PredictionPageComponent, title: "Prediction Page"},
];
