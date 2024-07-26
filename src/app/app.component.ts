import { Component, OnInit } from '@angular/core';
import { FoglalkozasFileProcessorService } from './services/foglalkozas-file-processor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../demo-styling.css']
})
export class AppComponent implements OnInit{
  title = 'angular-quickstart';

  tree: any;

  constructor(private fileService: FoglalkozasFileProcessorService){}
  
  ngOnInit(){
    
    this.fileService.loadFile('assets/foglalkozasok.txt').subscribe(
      data => this.tree = data,
      err => console.error(err)
    );
   
  }
}
