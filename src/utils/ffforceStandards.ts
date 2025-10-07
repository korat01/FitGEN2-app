/**
 * RÉFÉRENCES OFFICIELLES FFForce 2024-2025
 * Basées sur les standards officiels de la Fédération Française de Force Athlétique
 */

export interface FFForceReference {
  R3: number;
  R2: number;
  R1: number;
  N2: number;
  N1: number;
  Europe: number;
  Monde: number;
  RefN1: number;
}

export interface WeightCategory {
  [weightClass: string]: FFForceReference;
}

export interface AgeCategory {
  male: WeightCategory;
  female: WeightCategory;
}

export interface FFForceStandards {
  subjunior: AgeCategory;
  junior: AgeCategory;
  senior: AgeCategory;
  masters1: AgeCategory;
  masters2: AgeCategory;
  masters3: AgeCategory;
  masters4: AgeCategory;
}

// RÉFÉRENCES OFFICIELLES FFForce 2024-2025
export const FFFORCE_STANDARDS: FFForceStandards = {
  // SUBJUNIOR (14-18 ans)
  subjunior: {
    male: {
      '53kg': { R3: 145, R2: 195, R1: 245, N2: 272.5, N1: 320, Europe: 450, Monde: 460, RefN1: 320 },
      '59kg': { R3: 165, R2: 215, R1: 265, N2: 302.5, N1: 350, Europe: 480, Monde: 490, RefN1: 350 },
      '66kg': { R3: 185, R2: 235, R1: 285, N2: 322.5, N1: 370, Europe: 510, Monde: 520, RefN1: 370 },
      '74kg': { R3: 205, R2: 255, R1: 305, N2: 342.5, N1: 390, Europe: 540, Monde: 550, RefN1: 390 },
      '83kg': { R3: 225, R2: 275, R1: 325, N2: 362.5, N1: 410, Europe: 570, Monde: 580, RefN1: 410 },
      '93kg': { R3: 245, R2: 295, R1: 345, N2: 382.5, N1: 430, Europe: 600, Monde: 610, RefN1: 430 },
      '105kg': { R3: 265, R2: 315, R1: 365, N2: 402.5, N1: 450, Europe: 630, Monde: 640, RefN1: 450 },
      '120kg': { R3: 285, R2: 335, R1: 385, N2: 422.5, N1: 470, Europe: 660, Monde: 670, RefN1: 470 },
      '+120kg': { R3: 305, R2: 355, R1: 405, N2: 442.5, N1: 490, Europe: 690, Monde: 700, RefN1: 490 }
    },
    female: {
      '43kg': { R3: 80, R2: 102.5, R1: 125, N2: 147.5, N1: 190, Europe: 240, Monde: 245, RefN1: 180 },
      '47kg': { R3: 90, R2: 112.5, R1: 135, N2: 157.5, N1: 200, Europe: 250, Monde: 255, RefN1: 190 },
      '52kg': { R3: 100, R2: 122.5, R1: 145, N2: 167.5, N1: 210, Europe: 260, Monde: 265, RefN1: 200 },
      '57kg': { R3: 110, R2: 132.5, R1: 155, N2: 177.5, N1: 220, Europe: 270, Monde: 275, RefN1: 210 },
      '63kg': { R3: 120, R2: 142.5, R1: 165, N2: 187.5, N1: 230, Europe: 280, Monde: 285, RefN1: 220 },
      '69kg': { R3: 130, R2: 152.5, R1: 175, N2: 197.5, N1: 240, Europe: 290, Monde: 295, RefN1: 230 },
      '76kg': { R3: 140, R2: 162.5, R1: 185, N2: 207.5, N1: 250, Europe: 300, Monde: 305, RefN1: 240 },
      '84kg': { R3: 150, R2: 172.5, R1: 195, N2: 217.5, N1: 260, Europe: 310, Monde: 315, RefN1: 250 },
      '+84kg': { R3: 160, R2: 182.5, R1: 205, N2: 227.5, N1: 270, Europe: 320, Monde: 325, RefN1: 260 }
    }
  },

  // JUNIOR (19-23 ans)
  junior: {
    male: {
      '53kg': { R3: 200, R2: 250, R1: 300, N2: 362.5, N1: 400, Europe: 470, Monde: 480, RefN1: 400 },
      '59kg': { R3: 215, R2: 265, R1: 335, N2: 420, N1: 480, Europe: 535, Monde: 545, RefN1: 465 },
      '66kg': { R3: 295, R2: 345, R1: 415, N2: 497.5, N1: 557.5, Europe: 607.5, Monde: 620, RefN1: 552.5 },
      '74kg': { R3: 360, R2: 410, R1: 480, N2: 562.5, N1: 650, Europe: 680, Monde: 695, RefN1: 630 },
      '83kg': { R3: 410, R2: 460, R1: 530, N2: 602.5, N1: 680, Europe: 725, Monde: 740, RefN1: 665 },
      '93kg': { R3: 397.5, R2: 447.5, R1: 547.5, N2: 627.5, N1: 695, Europe: 765, Monde: 780, RefN1: 677.5 },
      '105kg': { R3: 420, R2: 470, R1: 570, N2: 642.5, N1: 707.5, Europe: 795, Monde: 810, RefN1: 700 },
      '120kg': { R3: 427.5, R2: 477.5, R1: 577.5, N2: 652.5, N1: 715, Europe: 822.5, Monde: 840, RefN1: 715 },
      '+120kg': { R3: 440, R2: 490, R1: 590, N2: 662.5, N1: 730, Europe: 832.5, Monde: 850, RefN1: 730 }
    },
    female: {
      '43kg': { R3: 125, R2: 145, R1: 165, N2: 187.5, N1: 230, Europe: 245, Monde: 250, RefN1: 225 },
      '47kg': { R3: 140, R2: 160, R1: 180, N2: 207.5, N1: 285, Europe: 337.5, Monde: 345, RefN1: 275 },
      '52kg': { R3: 190, R2: 210, R1: 230, N2: 255, N1: 335, Europe: 362.5, Monde: 370, RefN1: 325 },
      '57kg': { R3: 200, R2: 230, R1: 260, N2: 302.5, N1: 365, Europe: 427.5, Monde: 435, RefN1: 347.5 },
      '63kg': { R3: 220, R2: 250, R1: 280, N2: 322.5, N1: 390, Europe: 445, Monde: 455, RefN1: 375 },
      '69kg': { R3: 230, R2: 260, R1: 290, N2: 332.5, N1: 410, Europe: 455, Monde: 465, RefN1: 380 },
      '76kg': { R3: 235, R2: 265, R1: 295, N2: 342.5, N1: 420, Europe: 470, Monde: 480, RefN1: 392.5 },
      '84kg': { R3: 245, R2: 275, R1: 305, N2: 352.5, N1: 425, Europe: 490, Monde: 500, RefN1: 410 },
      '+84kg': { R3: 250, R2: 280, R1: 310, N2: 357.5, N1: 430, Europe: 500, Monde: 510, RefN1: 420 }
    }
  },

  // SENIOR/OPEN (24-39 ans)
  senior: {
    male: {
      '53kg': { R3: 220, R2: 270, R1: 320, N2: 382.5, N1: 420, Europe: 490, Monde: 500, RefN1: 420 },
      '59kg': { R3: 235, R2: 285, R1: 355, N2: 440, N1: 500, Europe: 555, Monde: 565, RefN1: 485 },
      '66kg': { R3: 315, R2: 365, R1: 435, N2: 517.5, N1: 577.5, Europe: 627.5, Monde: 640, RefN1: 572.5 },
      '74kg': { R3: 380, R2: 430, R1: 500, N2: 582.5, N1: 670, Europe: 700, Monde: 715, RefN1: 650 },
      '83kg': { R3: 430, R2: 480, R1: 550, N2: 622.5, N1: 700, Europe: 745, Monde: 760, RefN1: 685 },
      '93kg': { R3: 417.5, R2: 467.5, R1: 567.5, N2: 647.5, N1: 715, Europe: 785, Monde: 800, RefN1: 697.5 },
      '105kg': { R3: 440, R2: 490, R1: 590, N2: 662.5, N1: 727.5, Europe: 815, Monde: 830, RefN1: 720 },
      '120kg': { R3: 447.5, R2: 497.5, R1: 597.5, N2: 672.5, N1: 735, Europe: 842.5, Monde: 860, RefN1: 735 },
      '+120kg': { R3: 460, R2: 510, R1: 610, N2: 682.5, N1: 750, Europe: 852.5, Monde: 870, RefN1: 750 }
    },
    female: {
      '43kg': { R3: 135, R2: 155, R1: 175, N2: 197.5, N1: 240, Europe: 255, Monde: 260, RefN1: 235 },
      '47kg': { R3: 150, R2: 170, R1: 190, N2: 217.5, N1: 295, Europe: 347.5, Monde: 355, RefN1: 285 },
      '52kg': { R3: 200, R2: 220, R1: 240, N2: 265, N1: 345, Europe: 372.5, Monde: 380, RefN1: 335 },
      '57kg': { R3: 210, R2: 240, R1: 270, N2: 312.5, N1: 375, Europe: 437.5, Monde: 445, RefN1: 357.5 },
      '63kg': { R3: 230, R2: 260, R1: 290, N2: 332.5, N1: 400, Europe: 455, Monde: 465, RefN1: 385 },
      '69kg': { R3: 240, R2: 270, R1: 300, N2: 342.5, N1: 420, Europe: 465, Monde: 475, RefN1: 390 },
      '76kg': { R3: 245, R2: 275, R1: 305, N2: 352.5, N1: 430, Europe: 480, Monde: 490, RefN1: 402.5 },
      '84kg': { R3: 255, R2: 285, R1: 315, N2: 362.5, N1: 435, Europe: 500, Monde: 510, RefN1: 420 },
      '+84kg': { R3: 260, R2: 290, R1: 320, N2: 367.5, N1: 440, Europe: 510, Monde: 520, RefN1: 430 }
    }
  },

  // MASTERS I (40-49 ans)
  masters1: {
    male: {
      '53kg': { R3: 200, R2: 250, R1: 300, N2: 362.5, N1: 400, Europe: 470, Monde: 480, RefN1: 400 },
      '59kg': { R3: 215, R2: 265, R1: 335, N2: 420, N1: 480, Europe: 535, Monde: 545, RefN1: 465 },
      '66kg': { R3: 295, R2: 345, R1: 415, N2: 497.5, N1: 557.5, Europe: 607.5, Monde: 620, RefN1: 552.5 },
      '74kg': { R3: 360, R2: 410, R1: 480, N2: 562.5, N1: 650, Europe: 680, Monde: 695, RefN1: 630 },
      '83kg': { R3: 410, R2: 460, R1: 530, N2: 602.5, N1: 680, Europe: 725, Monde: 740, RefN1: 665 },
      '93kg': { R3: 397.5, R2: 447.5, R1: 547.5, N2: 627.5, N1: 695, Europe: 765, Monde: 780, RefN1: 677.5 },
      '105kg': { R3: 420, R2: 470, R1: 570, N2: 642.5, N1: 707.5, Europe: 795, Monde: 810, RefN1: 700 },
      '120kg': { R3: 427.5, R2: 477.5, R1: 577.5, N2: 652.5, N1: 715, Europe: 822.5, Monde: 840, RefN1: 715 },
      '+120kg': { R3: 440, R2: 490, R1: 590, N2: 662.5, N1: 730, Europe: 832.5, Monde: 850, RefN1: 730 }
    },
    female: {
      '43kg': { R3: 125, R2: 145, R1: 165, N2: 187.5, N1: 230, Europe: 245, Monde: 250, RefN1: 225 },
      '47kg': { R3: 140, R2: 160, R1: 180, N2: 207.5, N1: 285, Europe: 337.5, Monde: 345, RefN1: 275 },
      '52kg': { R3: 190, R2: 210, R1: 230, N2: 255, N1: 335, Europe: 362.5, Monde: 370, RefN1: 325 },
      '57kg': { R3: 200, R2: 230, R1: 260, N2: 302.5, N1: 365, Europe: 427.5, Monde: 435, RefN1: 347.5 },
      '63kg': { R3: 220, R2: 250, R1: 280, N2: 322.5, N1: 390, Europe: 445, Monde: 455, RefN1: 375 },
      '69kg': { R3: 230, R2: 260, R1: 290, N2: 332.5, N1: 410, Europe: 455, Monde: 465, RefN1: 380 },
      '76kg': { R3: 235, R2: 265, R1: 295, N2: 342.5, N1: 420, Europe: 470, Monde: 480, RefN1: 392.5 },
      '84kg': { R3: 245, R2: 275, R1: 305, N2: 352.5, N1: 425, Europe: 490, Monde: 500, RefN1: 410 },
      '+84kg': { R3: 250, R2: 280, R1: 310, N2: 357.5, N1: 430, Europe: 500, Monde: 510, RefN1: 420 }
    }
  },

  // MASTERS II (50-59 ans)
  masters2: {
    male: {
      '53kg': { R3: 180, R2: 230, R1: 280, N2: 342.5, N1: 380, Europe: 450, Monde: 460, RefN1: 380 },
      '59kg': { R3: 195, R2: 245, R1: 315, N2: 400, N1: 460, Europe: 515, Monde: 525, RefN1: 445 },
      '66kg': { R3: 275, R2: 325, R1: 395, N2: 477.5, N1: 537.5, Europe: 587.5, Monde: 600, RefN1: 532.5 },
      '74kg': { R3: 340, R2: 390, R1: 460, N2: 542.5, N1: 630, Europe: 660, Monde: 675, RefN1: 610 },
      '83kg': { R3: 390, R2: 440, R1: 510, N2: 582.5, N1: 660, Europe: 705, Monde: 720, RefN1: 645 },
      '93kg': { R3: 377.5, R2: 427.5, R1: 527.5, N2: 607.5, N1: 675, Europe: 745, Monde: 760, RefN1: 657.5 },
      '105kg': { R3: 400, R2: 450, R1: 550, N2: 622.5, N1: 687.5, Europe: 775, Monde: 790, RefN1: 680 },
      '120kg': { R3: 407.5, R2: 457.5, R1: 557.5, N2: 632.5, N1: 695, Europe: 802.5, Monde: 820, RefN1: 695 },
      '+120kg': { R3: 420, R2: 470, R1: 570, N2: 642.5, N1: 710, Europe: 812.5, Monde: 830, RefN1: 710 }
    },
    female: {
      '43kg': { R3: 115, R2: 135, R1: 155, N2: 177.5, N1: 220, Europe: 235, Monde: 240, RefN1: 215 },
      '47kg': { R3: 130, R2: 150, R1: 170, N2: 197.5, N1: 275, Europe: 327.5, Monde: 335, RefN1: 265 },
      '52kg': { R3: 180, R2: 200, R1: 220, N2: 245, N1: 325, Europe: 352.5, Monde: 360, RefN1: 315 },
      '57kg': { R3: 190, R2: 220, R1: 250, N2: 292.5, N1: 355, Europe: 417.5, Monde: 425, RefN1: 337.5 },
      '63kg': { R3: 210, R2: 240, R1: 270, N2: 312.5, N1: 380, Europe: 435, Monde: 445, RefN1: 365 },
      '69kg': { R3: 220, R2: 250, R1: 280, N2: 322.5, N1: 400, Europe: 445, Monde: 455, RefN1: 370 },
      '76kg': { R3: 225, R2: 255, R1: 285, N2: 332.5, N1: 410, Europe: 460, Monde: 470, RefN1: 382.5 },
      '84kg': { R3: 235, R2: 265, R1: 295, N2: 342.5, N1: 415, Europe: 480, Monde: 490, RefN1: 400 },
      '+84kg': { R3: 240, R2: 270, R1: 300, N2: 347.5, N1: 420, Europe: 490, Monde: 500, RefN1: 410 }
    }
  },

  // MASTERS III (60-69 ans)
  masters3: {
    male: {
      '53kg': { R3: 160, R2: 210, R1: 260, N2: 322.5, N1: 360, Europe: 430, Monde: 440, RefN1: 360 },
      '59kg': { R3: 175, R2: 225, R1: 295, N2: 380, N1: 440, Europe: 495, Monde: 505, RefN1: 425 },
      '66kg': { R3: 255, R2: 305, R1: 375, N2: 457.5, N1: 517.5, Europe: 567.5, Monde: 580, RefN1: 512.5 },
      '74kg': { R3: 320, R2: 370, R1: 440, N2: 522.5, N1: 610, Europe: 640, Monde: 655, RefN1: 590 },
      '83kg': { R3: 370, R2: 420, R1: 490, N2: 562.5, N1: 640, Europe: 685, Monde: 700, RefN1: 625 },
      '93kg': { R3: 357.5, R2: 407.5, R1: 507.5, N2: 587.5, N1: 655, Europe: 725, Monde: 740, RefN1: 637.5 },
      '105kg': { R3: 380, R2: 430, R1: 530, N2: 602.5, N1: 667.5, Europe: 755, Monde: 770, RefN1: 660 },
      '120kg': { R3: 387.5, R2: 437.5, R1: 537.5, N2: 612.5, N1: 675, Europe: 782.5, Monde: 800, RefN1: 675 },
      '+120kg': { R3: 400, R2: 450, R1: 550, N2: 622.5, N1: 690, Europe: 792.5, Monde: 810, RefN1: 690 }
    },
    female: {
      '43kg': { R3: 105, R2: 125, R1: 145, N2: 167.5, N1: 210, Europe: 225, Monde: 230, RefN1: 205 },
      '47kg': { R3: 120, R2: 140, R1: 160, N2: 187.5, N1: 265, Europe: 317.5, Monde: 325, RefN1: 255 },
      '52kg': { R3: 170, R2: 190, R1: 210, N2: 235, N1: 315, Europe: 342.5, Monde: 350, RefN1: 305 },
      '57kg': { R3: 180, R2: 210, R1: 240, N2: 282.5, N1: 345, Europe: 407.5, Monde: 415, RefN1: 327.5 },
      '63kg': { R3: 200, R2: 230, R1: 260, N2: 302.5, N1: 370, Europe: 425, Monde: 435, RefN1: 355 },
      '69kg': { R3: 210, R2: 240, R1: 270, N2: 312.5, N1: 390, Europe: 435, Monde: 445, RefN1: 360 },
      '76kg': { R3: 215, R2: 245, R1: 275, N2: 322.5, N1: 400, Europe: 450, Monde: 460, RefN1: 372.5 },
      '84kg': { R3: 225, R2: 255, R1: 285, N2: 332.5, N1: 405, Europe: 470, Monde: 480, RefN1: 390 },
      '+84kg': { R3: 230, R2: 260, R1: 290, N2: 337.5, N1: 410, Europe: 480, Monde: 490, RefN1: 400 }
    }
  },

  // MASTERS IV (70+ ans)
  masters4: {
    male: {
      '53kg': { R3: 140, R2: 190, R1: 240, N2: 302.5, N1: 340, Europe: 410, Monde: 420, RefN1: 340 },
      '59kg': { R3: 155, R2: 205, R1: 275, N2: 360, N1: 420, Europe: 475, Monde: 485, RefN1: 405 },
      '66kg': { R3: 235, R2: 285, R1: 355, N2: 437.5, N1: 497.5, Europe: 547.5, Monde: 560, RefN1: 492.5 },
      '74kg': { R3: 300, R2: 350, R1: 420, N2: 502.5, N1: 590, Europe: 620, Monde: 635, RefN1: 570 },
      '83kg': { R3: 350, R2: 400, R1: 470, N2: 542.5, N1: 620, Europe: 665, Monde: 680, RefN1: 605 },
      '93kg': { R3: 337.5, R2: 387.5, R1: 487.5, N2: 567.5, N1: 635, Europe: 705, Monde: 720, RefN1: 617.5 },
      '105kg': { R3: 360, R2: 410, R1: 510, N2: 582.5, N1: 647.5, Europe: 735, Monde: 750, RefN1: 640 },
      '120kg': { R3: 367.5, R2: 417.5, R1: 517.5, N2: 592.5, N1: 655, Europe: 762.5, Monde: 780, RefN1: 655 },
      '+120kg': { R3: 380, R2: 430, R1: 530, N2: 602.5, N1: 670, Europe: 772.5, Monde: 790, RefN1: 670 }
    },
    female: {
      '43kg': { R3: 95, R2: 115, R1: 135, N2: 157.5, N1: 200, Europe: 215, Monde: 220, RefN1: 195 },
      '47kg': { R3: 110, R2: 130, R1: 150, N2: 177.5, N1: 255, Europe: 307.5, Monde: 315, RefN1: 245 },
      '52kg': { R3: 160, R2: 180, R1: 200, N2: 225, N1: 305, Europe: 332.5, Monde: 340, RefN1: 295 },
      '57kg': { R3: 170, R2: 200, R1: 230, N2: 272.5, N1: 335, Europe: 397.5, Monde: 405, RefN1: 317.5 },
      '63kg': { R3: 190, R2: 220, R1: 250, N2: 292.5, N1: 360, Europe: 415, Monde: 425, RefN1: 345 },
      '69kg': { R3: 200, R2: 230, R1: 260, N2: 302.5, N1: 380, Europe: 425, Monde: 435, RefN1: 350 },
      '76kg': { R3: 205, R2: 235, R1: 265, N2: 312.5, N1: 390, Europe: 440, Monde: 450, RefN1: 362.5 },
      '84kg': { R3: 215, R2: 245, R1: 275, N2: 322.5, N1: 395, Europe: 460, Monde: 470, RefN1: 380 },
      '+84kg': { R3: 220, R2: 250, R1: 280, N2: 327.5, N1: 400, Europe: 470, Monde: 480, RefN1: 390 }
    }
  }
};

// FONCTIONS UTILITAIRES

/**
 * Détermine la catégorie d'âge selon l'âge
 */
export function getAgeCategory(age: number): keyof FFForceStandards {
  if (age >= 14 && age <= 18) return 'subjunior';
  if (age >= 19 && age <= 23) return 'junior';
  if (age >= 24 && age <= 39) return 'senior';
  if (age >= 40 && age <= 49) return 'masters1';
  if (age >= 50 && age <= 59) return 'masters2';
  if (age >= 60 && age <= 69) return 'masters3';
  if (age >= 70) return 'masters4';
  
  // Par défaut, considérer comme senior
  return 'senior';
}

/**
 * Détermine la catégorie de poids selon le poids corporel
 */
export function getWeightCategory(weight: number, sex: 'male' | 'female'): string {
  if (sex === 'male') {
    if (weight <= 53) return '53kg';
    if (weight <= 59) return '59kg';
    if (weight <= 66) return '66kg';
    if (weight <= 74) return '74kg';
    if (weight <= 83) return '83kg';
    if (weight <= 93) return '93kg';
    if (weight <= 105) return '105kg';
    if (weight <= 120) return '120kg';
    return '+120kg';
  } else {
    if (weight <= 43) return '43kg';
    if (weight <= 47) return '47kg';
    if (weight <= 52) return '52kg';
    if (weight <= 57) return '57kg';
    if (weight <= 63) return '63kg';
    if (weight <= 69) return '69kg';
    if (weight <= 76) return '76kg';
    if (weight <= 84) return '84kg';
    return '+84kg';
  }
}

/**
 * Récupère les références FFForce pour un utilisateur donné
 */
export function getFFForceReferences(
  age: number, 
  weight: number, 
  sex: 'male' | 'female'
): FFForceReference | null {
  const ageCategory = getAgeCategory(age);
  const weightCategory = getWeightCategory(weight, sex);
  
  const references = FFFORCE_STANDARDS[ageCategory][sex][weightCategory];
  
  if (!references) {
    console.warn(`Aucune référence trouvée pour ${age} ans, ${weight}kg, ${sex}`);
    return null;
  }
  
  return references;
}

/**
 * Calcule le score basé sur les références FFForce
 */
export function calculateFFForceScore(
  totalWeight: number,
  references: FFForceReference
): { score: number; rank: string } {
  const { R3, R2, R1, N2, N1, Europe, Monde } = references;
  
  if (totalWeight >= Monde) {
    return { score: 1000, rank: 'Monde' };
  } else if (totalWeight >= Europe) {
    return { score: 900 + ((totalWeight - Europe) / (Monde - Europe)) * 100, rank: 'Europe' };
  } else if (totalWeight >= N1) {
    return { score: 800 + ((totalWeight - N1) / (Europe - N1)) * 100, rank: 'N1' };
  } else if (totalWeight >= N2) {
    return { score: 700 + ((totalWeight - N2) / (N1 - N2)) * 100, rank: 'N2' };
  } else if (totalWeight >= R1) {
    return { score: 600 + ((totalWeight - R1) / (N2 - R1)) * 100, rank: 'R1' };
  } else if (totalWeight >= R2) {
    return { score: 500 + ((totalWeight - R2) / (R1 - R2)) * 100, rank: 'R2' };
  } else if (totalWeight >= R3) {
    return { score: 400 + ((totalWeight - R3) / (R2 - R3)) * 100, rank: 'R3' };
  } else {
    return { score: (totalWeight / R3) * 400, rank: 'D' };
  }
}
