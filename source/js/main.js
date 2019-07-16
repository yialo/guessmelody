import getWelcomeScreen from './screens/welcome';
import getGameGenreScreen from './screens/game/genre';
import getGameArtistScreen from './screens/game/artist';
import {changeScreen} from './lib/util';

const init = () => {
  const welcomeScreen = getWelcomeScreen(() => {
    const gameGenreScreen = getGameGenreScreen({
      goBack: init,
      goNext: () => {
        const gameArtistScreen = getGameArtistScreen({
          goBack: init,
          goNext: () => void 0,
        });
        changeScreen(gameArtistScreen);
      },
    });
    changeScreen(gameGenreScreen);
  });
  changeScreen(welcomeScreen);
};
init();
