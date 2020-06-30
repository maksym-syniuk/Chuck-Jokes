import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  showSidebar = false;
  // @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    // this.toggleSidebar.emit(this.showSidebar);
  }
}
