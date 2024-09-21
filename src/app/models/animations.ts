import { animate, style, transition, trigger, state} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    state(
      'open',
      style({
        opacity: 1,
      })
    ),
    state(
      'closed',
      style({
        opacity: 0,
      })
    ),
    transition('open => closed', [animate('1s ease-out')])
  ]);
 
  const exitTransition= transition(':leave',[
    style({
      opacity: 1,
    }),
    animate('1s ease-out', style({ opacity: 0 }))
  ])
  export const fadeOut = trigger('fadeOut', [exitTransition]);
 