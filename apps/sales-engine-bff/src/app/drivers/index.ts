import { GuatiqueDriver } from './guatique.driver';
import { MacroSistemasDriver } from './macrosistemas.driver';
import { KemikDriver } from './kemik.driver';

const drivers = {
    guatique: GuatiqueDriver,
    macroSistemas: MacroSistemasDriver,
    kemik: KemikDriver,
};

export default drivers;
