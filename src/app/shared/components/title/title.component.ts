import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor() { }
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() no?: string;
  @Input() centerText?: boolean = false;
  
  ngOnInit(): void {
  }

}
