import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Breweries: any;
  cities: any;
  states: any;
  names: any;
  state_cityData:any=[];
  selected_items:any= [];
  state_Data: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.List_Breweries();
  }


  List_Breweries(){
    const url = `https://api.openbrewerydb.org/breweries`;
    this.http.get(url).subscribe((r) =>{
      if(r){
        this.Breweries = r;
        console.log(this.Breweries);
        this.state_cityData=[...this.Breweries];
        this.state_cityData.map((d)=>{
          d.isSelected=false;
        })
      }
    })
  }

 
// -----------------------------cities start------------------ //
  
  filter_by_city(name){
    const url = `https://api.openbrewerydb.org/breweries?by_city=${name}`;
    this.http.get(url).subscribe((r) =>{
      this.cities = r;
      console.log(this.cities);
      this.Breweries = [...this.cities]
    })
  }


  isAllSelected(data){
    this.state_cityData.map((d) =>{
      if(data.id==d.id){
        if(data.isSelected==true){
          this.List_Breweries();
        }
        else{
          this.filter_by_city(data.city)
        }
      }
      (data.id==d.id) ? data.isSelected = !data.isSelected :  d.isSelected = false;
    })
  }
// -----------------------------cities end-------------------- //



// -----------------------------states start-------------------- //
  filter_by_state(state_name){
    console.log(state_name)
    const url = `https://api.openbrewerydb.org/breweries?by_state=${state_name}`;
    this.http.get(url).subscribe((r) =>{
      this.states = r;
      console.log(this.states);
      this.Breweries = [...this.states]
    })
  }


  isAlSelected(data){
    this.state_cityData.map((d) =>{
      if(data.id==d.id){
        if(data.isSelected==true){
          this.List_Breweries();
        }
        else{
          this.filter_by_state(data.state)
        }
      }
      (data.id==d.id) ? data.isSelected = !data.isSelected :  d.isSelected = false;
    })
  }

  // -----------------------------states end-------------------- //







}
