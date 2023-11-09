import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements AfterViewInit {
  techWords: string[] = [
    'ReactJs',
    'Angular',
    'Postgres',
    'NodeJs',
    'TypeORM',
    'MongoDb',
    'GraphQl',
    'TypeORM',
    'Docker',
    'Bash',
    'SCSS',
    'Tailwind',
    'Redux',
    'SSL',
    'Café',
    'Git',
    'Kanban',
    'Agile',
  ];

  softWords: string[] = [
    'Adaptabilité',
    'Autonomie',
    'Perséverant',
    'Minutieux',
    'Organisé',
    'Structuré',
    'Analytique',
    'Tenace',
    "Esprit d'initiative",
    'Discrétion',
  ];

  wordPositions: {
    [key: string]: { x: number; y: number; z: number; fontSize: number };
  } = {};

  currentWordCloud!: ElementRef<HTMLElement>;

  isDragging = false;
  initialX: number = 0;
  initialY: number = 0;
  rotationX: number = 0;
  rotationY: number = 0;

  @ViewChild('leftWordCloud') leftWordCloud!: ElementRef<HTMLElement>;
  @ViewChild('rightWordCloud') rightWordCloud!: ElementRef<HTMLElement>;

  constructor() {
    this.techWords.forEach((word) => {
      this.wordPositions[word] = this.getRandomPosition();
    });

    this.softWords.forEach((word) => {
      this.wordPositions[word] = this.getRandomPosition();
    });
  }

  ngAfterViewInit() {
    this.techWords.forEach((word) => {
      this.wordPositions[word] = {
        x: this.randomPosition(-100, 100),
        y: this.randomPosition(-100, 100),
        z: this.randomPosition(-100, 100),
        fontSize: this.randomFontSize(12, 16),
      };
    });

    this.softWords.forEach((word) => {
      this.wordPositions[word] = {
        x: this.randomPosition(-100, 100),
        y: this.randomPosition(-100, 100),
        z: this.randomPosition(-100, 100),
        fontSize: this.randomFontSize(12, 20),
      };
    });
  }

  randomPosition(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getRandomPosition() {
    return {
      x: this.randomPosition(-100, 100),
      y: this.randomPosition(-100, 100),
      z: this.randomPosition(-100, 100),
      fontSize: this.randomFontSize(12, 16),
    };
  }

  randomFontSize(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.currentWordCloud) {
      this.rotationY += (event.clientX - this.initialX) * 0.2;
      this.rotationX += (event.clientY - this.initialY) * 0.2;

      this.currentWordCloud.nativeElement.style.transform = `rotateY(${this.rotationY}deg) rotateX(${this.rotationX}deg)`;

      this.initialX = event.clientX;
      this.initialY = event.clientY;
    }
  }

  onWordCloudMouseDown(event: MouseEvent, cloud: 'left' | 'right') {
    event.preventDefault();
    this.isDragging = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;

    this.currentWordCloud =
      cloud === 'left' ? this.leftWordCloud : this.rightWordCloud;
  }
}
