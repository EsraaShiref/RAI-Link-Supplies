import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { TextWithCollageComponent } from '../../shared/components/text-with-collage/text-with-collage.component';
import { TwoCardRowComponent, CardItem } from '../../shared/components/two-card-row/two-card-row.component';
import { CardGridComponent, ValueCardItem } from '../../shared/components/card-grid/card-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    TextWithCollageComponent,
    TwoCardRowComponent,
    CardGridComponent,
  ],
  template: `
    <!-- 1. Hero Section -->
    <app-hero />

    <!-- 2. About Us Narrative + Image Collage -->
    <app-text-with-collage
      [kickerKey]="'ABOUT.KICKER'"
      [titleKey]="'ABOUT.TITLE'"
      [bodyKey]="'ABOUT.BODY'"
      [readMoreRoute]="'/about'"
    />

    <!-- 3. Mission & Vision Row (Mission first, Vision second) -->
    <app-two-card-row
      [card1]="missionCard"
      [card2]="visionCard"
    />

    <!-- 4. Our Values Grid (4 cards with semantic icons and hover lift) -->
    <app-card-grid
      [titleKey]="'ABOUT.VALUES_TITLE'"
      [items]="valuesCards"
    />
  `,
})
export class HomeComponent {
  readonly missionCard: CardItem = {
    titleKey: 'ABOUT.MISSION_TITLE',
    bodyKey: 'ABOUT.MISSION_BODY',
    route: '/about',
  };

  readonly visionCard: CardItem = {
    titleKey: 'ABOUT.VISION_TITLE',
    bodyKey: 'ABOUT.VISION_BODY',
    route: '/about',
  };

  readonly valuesCards: ValueCardItem[] = [
    {
      key: 'reliability',
      icon: 'reliability',
      titleKey: 'ABOUT.VALUES.RELIABILITY.TITLE',
      bodyKey: 'ABOUT.VALUES.RELIABILITY.BODY',
      route: '/about',
    },
    {
      key: 'quality',
      icon: 'quality',
      titleKey: 'ABOUT.VALUES.QUALITY.TITLE',
      bodyKey: 'ABOUT.VALUES.QUALITY.BODY',
      route: '/about',
    },
    {
      key: 'speed',
      icon: 'speed',
      titleKey: 'ABOUT.VALUES.SPEED.TITLE',
      bodyKey: 'ABOUT.VALUES.SPEED.BODY',
      route: '/about',
    },
    {
      key: 'flexibility',
      icon: 'flexibility',
      titleKey: 'ABOUT.VALUES.FLEXIBILITY.TITLE',
      bodyKey: 'ABOUT.VALUES.FLEXIBILITY.BODY',
      route: '/about',
    },
  ];
}
