import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from 'src/app/services/question-answer/question-answer.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  qas: any[] = [];
  isLoading = false;
  queryText = '';
  searchText = '';
  diseases: any[] = [];
  selectedDisease = '';
  constructor(
    private qaService: QuestionAnswerService,
    private surgeriesService: SurgeriesService
  ) { }

  ngOnInit(): void {
    window.scroll({
      top: 0, behavior: 'smooth', left: 0
    });
    // this.getQAs();
    this.getAllSurgeries();
  }

  getQAs() {
    this.isLoading = true;
    this.qaService.getQuestionsBySurgery().subscribe({
      next: (qas) => {
        if (qas) {
          this.qas = qas;
        }
        this.isLoading = false;
        window.scroll({
          top: 0, behavior: 'smooth', left: 0
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });

  }

  searchCommunity() {
    if (!this.searchText) {
      return;
    }
    this.queryText = this.searchText;
    this.qaService.getQuestionsBySurgeryId(this.selectedDisease, this.queryText).subscribe({
      next: (surgeries) => {
        // this.qas = surgeries;
      },
      error: (err) => {
      }
    });

  }

  getAllSurgeries() {
    this.surgeriesService.getAllSurgeries().subscribe((surgeries) => {
      if (surgeries) {
        this.diseases = surgeries;
      }
    })
  }

}
