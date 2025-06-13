import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import CriarPage from './src/pages/Criar';
import ListaPage from './src/pages/Lista';


const Routes = createNativeStackNavigator({
  screens: {
    Home: HomePage,
    Criar: CriarPage,
    Login: LoginPage,
    Lista: ListaPage

  }
})

const Navigation = createStaticNavigation(Routes)

export default function App() {
  return (
      <Navigation />
  );
}
