import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  hero: Movie = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private movieService:MovieService) { }

  ngOnInit() {
  }

}
