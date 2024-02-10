import { createSignal, type Component, useContext } from 'solid-js';7
import styles from './WorldMap.module.css';
import { IconList, IconMap } from '@tabler/icons-solidjs';
import Continent from './Continent';
import { ContinentData, worldData } from './Countries';
import { SelectedContext } from '../../App';

// Toggle enum
enum Toggle {
  Map,
  List
}

// World map component
const WorldMap: Component = () => {

  // State for the map mode
  const [mapMode, setMapMode] = createSignal(Toggle.Map);

  // Get selected context
  const [selected, setSelected] = useContext(SelectedContext);

  // Handle the toggle button
  const handleToggle = () => {
    setMapMode(mapMode() === Toggle.Map ? Toggle.List : Toggle.Map);
  };

  // // Handle click
  // const handleClick = (event: MouseEvent) => {

  //   // Grab all parent elements
  //   const country = event.target as HTMLElement;
  //   const region = country.parentElement as HTMLElement;
  //   const continent = region.parentElement as HTMLElement;

  //   // Get the bbox
  //   const bbox = continent.getAttribute('data-bbox');
  //   if (bbox) {
  //     setSelected({
  //       world: selected().world,
  //       continent: {bbox: bbox, id: continent.id}
  //     });
  //   }
    
  //   // Give the continent selected class
  //   continent.classList.add(styles.Selected);
  // };

  // Render the component
  return (
    <>
    <button class={styles.ViewToggle} onClick={handleToggle}>
      <div class={styles.Slider + (mapMode() === Toggle.List ? ' ' + styles.SliderRight : '')}></div>
      <IconMap/>
      <IconList/>
    </button>
    <div class={styles.WorldMap}>
      <svg 
        class={styles.WorldMapImage} 
        baseProfile="tiny" 
        height="665.96301" 
        stroke="black" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width=".2"
        viewBox={selected().bbox}
        width="1009.6727" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {
          /* Render each continent */
          worldData.map((continent : ContinentData, index) => (
            <Continent parent={'world'} continent={continent} />
          ))
        }
      </svg>
    </div>
    </>
  );
};

export default WorldMap;