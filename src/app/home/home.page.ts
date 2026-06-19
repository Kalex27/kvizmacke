import { Component, Inject } from '@angular/core';
import { QuizService } from '../quiz-service/quiz';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { QuestionComponent } from '../question/question.component';
import { EndScreenComponent } from '../end-screen/end-screen.component';
import { QuestionImportComponent } from '../question-import/question-import.component';
import { LekiGaleryComponent } from '../leki-galery/leki-galery.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [StartScreenComponent, QuestionComponent, EndScreenComponent, QuestionImportComponent, LekiGaleryComponent],
})
export class HomePage {

  // ovde postavljamo i inicijalnu komponentu
  // znam da postoje enumi, nemam mozga da pravim da se enum vidi u html-u.
  activeComponent : string = "quiz_start";
  // moguce vrednosti (za sad):
  //  * "quiz_start"
  //  * "quiz_end"
  //  * "quiz_question"
  //  * "import_question"
  
  constructor(public quizService : QuizService)
  {}

  updateComponent(comp : string) : void {
    console.log('Promena na:', comp); //provera zasto mi ne prebacuje na galeriju
    this.activeComponent = comp;
  }

  
}
