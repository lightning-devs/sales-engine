import { GuatiqueStore } from './guatique.sequence';
import { MacroSistemasSequence } from './macrosistemas.sequence';
import { KemikSequence } from './kemik.sequence';
import { RechSequence } from './rech.sequence';
import { SpiritSequence } from './spirit.sequence';
import { ClickSequence } from './click.sequence';
import { PacifikoSequence } from './pacifiko.sequence';
import { IntelafSequence } from './intelaf.sequence';
import { Store } from '@lightning/typing';

const sequences: Record<string, Store> = {
    guatique: GuatiqueStore,
    // macroSistemas: MacroSistemasSequence,
    // kemik: KemikSequence,
    // rech: RechSequence,
    // spirit: SpiritSequence,
    // click: ClickSequence,
    // pacifiko: PacifikoSequence,
    // intelaf: IntelafSequence,
};

export default sequences;
