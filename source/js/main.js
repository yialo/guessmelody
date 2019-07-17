import getWelcomeScreen from './screens/welcome';
import getGameGenreScreen from './screens/game/genre';
import getGameArtistScreen from './screens/game/artist';
import renderResultScreen from './screens/result';
import {changeScreen} from './lib/utils';

const init = () => {
  const welcomeScreen = getWelcomeScreen(() => {
    const renderGameGenreScreen = () => {
      const gameGenreScreen = getGameGenreScreen({
        goBack: init,
        goForward: () => {
          const gameArtistScreen = getGameArtistScreen({
            goBack: init,
            goForward: () => renderResultScreen(renderGameGenreScreen),
          });
          changeScreen(gameArtistScreen);
        },
      });
      changeScreen(gameGenreScreen);
    };
    renderGameGenreScreen();
  });
  changeScreen(welcomeScreen);
};
init();
