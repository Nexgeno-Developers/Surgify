import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerService } from 'src/app/services/question-answer/question-answer.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';

@Component({
  selector: 'app-ask-doctor',
  templateUrl: './ask-doctor.component.html',
  styleUrls: ['./ask-doctor.component.css']
})
export class AskDoctorComponent implements OnInit {

  questionForm: FormGroup;
  diseases: any[] = [];
  isSubmitted = false;
  selectedDisease = '';

  constructor(private qaService: QuestionAnswerService,
    private fb: FormBuilder,
    private surgeriesService: SurgeriesService) {
    this.questionForm = this.fb.group({
      question: ["", Validators.required],
      diseaseId: ["", Validators.required],
      diseaseName: "",
      isAnswered: false
    });

    this.questionForm.get('diseaseId')?.valueChanges.subscribe({
      next: (dis) => {
        this.selectedDisease = this.diseases.filter((di) => di.id == dis)[0]['name'];
      },
      error: (err) => {
      }
    })
  }

  ngOnInit(): void {
    this.getAllSurgeries();
  }

  getAllSurgeries() {
    this.surgeriesService.getAllSurgeries().subscribe({
      next: (surgeries) => {
        if (surgeries) {
          this.diseases = surgeries;
        }
      },
      error: (err) => {
        this.diseases = [];
      }
    });
  }

  postQuestion() {
    let formData = this.questionForm.value;
    formData.diseaseName = this.selectedDisease;
    this.qaService.postQuestion(formData).subscribe({
      next: (res) => {
        if (res && !res.error) {
          window.scroll({
            top: 0, behavior: 'smooth', left: 0
          });
          this.isSubmitted = true;
        }
      },
      error: (err) => {
      }
    })
  }

}
