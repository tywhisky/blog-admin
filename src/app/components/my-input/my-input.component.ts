import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})
export class MyInputComponent implements OnInit {
  @Input() placeholder: string = '请输入内容';
  @Input() inputModel: string = '';
  @Output() inputModelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
