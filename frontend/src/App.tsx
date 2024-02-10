import { createSignal, type Component, createContext } from 'solid-js';
import styles from './App.module.css';
import WorldMap from './components/WorldMap/WorldMap';

// Selected data type
export interface Selected {
  type: "country" | "region" | "continent" | "world";
  id: string;
  bbox: string;
};

// Create the selected context
const defaultSelected: Selected = {type: 'world', id: 'world', bbox: '0 0 1009.6727 665.96301'};
const defaultSetter = () => {}; // A no-op function

export const SelectedContext = createContext<[() => Selected, (v: Selected) => void]>([
  () => defaultSelected,
  defaultSetter,
]);

const App: Component = () => {

  // State for managing the selected continent/region/country
  const [selected, setSelected] = createSignal<Selected>({type: 'world', id: 'world', bbox: '0 0 1009.6727 665.96301'});

  return (
    <SelectedContext.Provider value={[selected, setSelected]}>
      <WorldMap />
    </SelectedContext.Provider>
  );
};

export default App;
