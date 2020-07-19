import { JokeFormMode } from './../../../shared/enums/joke-form-mode.enum';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JokesService } from 'src/app/shared/services/jokes.service';

@Component({
  selector: 'app-modify-joke',
  templateUrl: './modify-joke.component.html',
  styleUrls: ['./modify-joke.component.scss']
})
export class ModifyJokeComponent implements OnInit {
  public navLinks = [
    { path: 'create', label: 'Create' },
    { path: 'update', label: 'Update' },
    { path: 'delete', label: 'Delete' }
  ];
  public activeLink = this.navLinks[0];

  constructor(private jokesService: JokesService) { }

  ngOnInit(): void {
    // this.jokesService.currentSelectedJokeMode.subscribe(mode => {
    //   const link = { path: mode, label: mode.charAt(0).toUpperCase() + mode.slice(1) };
    //   this.activeLink = this.navLinks[this.navLinks.indexOf(link)];
    // });
  }

}
