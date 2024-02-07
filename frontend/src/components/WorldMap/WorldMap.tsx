import { createSignal, type Component } from 'solid-js';7
import styles from './WorldMap.module.css';
import { Country, countries, Continent, Region, Drives } from './Countries';
import { tweenToNewViewBox } from '../../utils/tweenToNewViewBox';
import { IconList, IconMap } from '@tabler/icons-solidjs';

// Filters Interface
interface Filters {
  min_coverage: number;
  drives?: Drives;
  continent?: Continent;
  region?: Region;
}

// Toggle enum
enum Toggle {
  Map = 'map',
  List = 'list',
}

const WorldMap: Component = () => {

  // State to keep track of the hovered country
  const [hoveredCountry, setHoveredCountry] = createSignal<string | null>(null);

  // Current map mode
  const [mapMode, setMapMode] = createSignal<Toggle>(Toggle.Map);

  var previous_fill = '';

  // State to store the current viewbox
  const [viewBox, setViewBox] = createSignal<string>('0 0 1009.6727 665.96301');

  // State to keep track of the filters
  const [filters, setFilters] = createSignal<Filters>({
    min_coverage: 0,
    continent: Continent.Europe,
    region: Region.WesternEurope,
  });

  // Event handlers
  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as SVGElement;
    const country = target.getAttribute('data-name');
    previous_fill = target.style.fill;
    target.style.fill = 'rgba(50, 50, 50, 1)';
    setHoveredCountry(country);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const target = e.target as SVGElement;
    target.style.fill = previous_fill;
    previous_fill = '';
    setHoveredCountry(null);
  };

  // Handle toggle
  const handleToggle = () => {
    if (mapMode() === Toggle.Map) {
      setMapMode(Toggle.List);
    } else {
      setMapMode(Toggle.Map);
    }
  }

  // Handle mouse click on a country
  const handleMouseClick = (e: MouseEvent) => {
    const target = e.target as SVGElement;
    const targetViewBox = target.getAttribute('data-bbox');
    if (targetViewBox) {
      const currentViewBox = viewBox();
      tweenToNewViewBox(setViewBox, currentViewBox, targetViewBox);
    }
  }

  // Function to determine if a country should be displayed
  const shouldDisplayCountry = (country: Country) => {

    if (country.coverage < filters().min_coverage) {
      return false;
    }

    if (filters().drives && country.drives !== filters().drives) {
      return false;
    }

    if (filters().continent && country.continent !== filters().continent) {
      return false;
    }

    if (filters().region && country.region !== filters().region) {
      return false;
    }

    return true;
  };

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
        version="1.2" 
        viewBox={viewBox()} 
        width="1009.6727" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {countries.map((country) => (
          <path 
          data-title={country.title}
          data-bbox={country.bbox}
          id={country.id}
          d={country.d} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
          style={{fill: shouldDisplayCountry(country) ? 'inherit' : 'rgba(0, 0, 0, 0.4)'}}
          >
          </path>
        ))}
        {/* <rect id="nordic" x="1000" y="50" width="200" height="100" fill="rgba(255,255,255,0)"/> */}
      </svg>
    </div>
    </>
  );
};

export default WorldMap;