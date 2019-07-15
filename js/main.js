import welcomeScreen from './screens/welcome';
import {changeScreen} from './lib/util';

export default function init() {
  changeScreen(welcomeScreen);
}

init();
