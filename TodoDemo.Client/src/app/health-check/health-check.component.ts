import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.prod';

interface Result {
  checks: Check[];
  totalStatus: string;
  totalResponseTime: number;
}

interface Check {
  name: string,
  responseTime: number;
  status: string;
  description: string;
}

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrl: './health-check.component.scss'
})
export class HealthCheckComponent {
  public result?: Result;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Result>("/api/health").subscribe(result => {
      this.result = result;
    }, error => console.error(error));
  }
}
