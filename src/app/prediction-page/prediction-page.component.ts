import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {delay} from "rxjs";

@Component({
  selector: 'app-prediction-page',
  standalone: true,
  imports: [HttpClientModule, NgForOf, ReactiveFormsModule],
  templateUrl: './prediction-page.component.html',
  styleUrl: './prediction-page.component.css'
})
export class PredictionPageComponent implements OnInit {
  genders : any[] =[]
  countries : any[] =[]
  predictForm = new FormGroup({
    nama : new FormControl(''),
    country : new FormControl(''),
    credit : new FormControl(''),
    gender : new FormControl(''),
    age : new FormControl(''),
    tenure : new FormControl(''),
    balance : new FormControl(''),
    numberOfProducts : new FormControl(''),
    creditCard : new FormControl(''),
    activeMember : new FormControl(''),
    estimatedSalary : new FormControl(''),
  })
  predictionResult : any = "null"
  loadingAnimation : string = ""
  predictionVisibility : string = "hidden"
  resultVisibility : string = "hidden"

  constructor(private http : HttpClient) {

  }

  ngOnInit() {
    this.http.get<any>('http://localhost:5000/get-gender').subscribe({
      next: (value : any) => {
        this.genders = value.data
      },
    })

    this.http.get<any>('http://localhost:5000/get-geography').subscribe({
      next: (value : any) => {
        this.countries = value.data
      },
    })
  }

  onSubmit () {
    this.loadingAnimation = ""
    this.predictionVisibility = "hidden"
    this.resultVisibility = "hidden"
    const predictionData = {
      name : this.predictForm.value.nama,
      country : this.predictForm.value.country,
      credit_score : this.predictForm.value.credit,
      gender : this.predictForm.value.gender,
      age: this.predictForm.value.age,
      tenure : this.predictForm.value.tenure,
      balance : this.predictForm.value.balance,
      number_of_products : this.predictForm.value.numberOfProducts,
      credit_card : this.predictForm.value.creditCard,
      active_member : this.predictForm.value.activeMember,
      estimated_salary : this.predictForm.value.estimatedSalary,
    }

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const startLoadingAnimation = async () => {
      for (let i = 0; i < 20; i++) {
        await wait(100);
        this.loadingAnimation += '.';
      }

      this.http.post<any>('http://localhost:5000/predict', predictionData).subscribe({
        next: (value : any) => {
          this.predictionVisibility = ""
          this.resultVisibility = ""
          this.predictionResult = value.data
        },
        error : err => {
          this.predictionVisibility = ""
          this.resultVisibility = ""
          this.predictionResult = err.error.error
        }
      })
    };

    startLoadingAnimation().then();
  }

  protected readonly onsubmit = onsubmit;
}
