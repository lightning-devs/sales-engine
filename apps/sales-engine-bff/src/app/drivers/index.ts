import { GuatiqueDriver } from './guatique.driver';
import { MacroSistemasDriver } from './macrosistemas.driver';
import { KemikDriver } from './kemik.driver';
import { RechDriver } from './rech.driver';
import { SpiritDriver } from './spirit.driver';
import { ClickDriver } from './click.driver';
import { PacifikoDriver } from './pacifiko.driver';

const drivers = {
    guatique: GuatiqueDriver,
    macroSistemas: MacroSistemasDriver,
    kemik: KemikDriver,
    rech: RechDriver,
    spirit: SpiritDriver,
    click: ClickDriver,
    pacifiko: PacifikoDriver,
};

export default drivers;
