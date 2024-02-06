import { createSignal, type Component } from 'solid-js';7
import styles from './WorldMap.module.css';
import { Country, countries } from './Countries';

// Driving side enum
enum DrivingSide {
  Left,
  Right,
  Both
}

// Filters Interface
interface Filters {
  drives_left: DrivingSide;
  min_coverage: number;
}

const WorldMap: Component = () => {

  // State to keep track of the hovered country
  const [hoveredCountry, setHoveredCountry] = createSignal<string | null>(null);

  var previous_fill = '';

  // State to keep track of the filters
  const [filters, setFilters] = createSignal<Filters>({
    drives_left: DrivingSide.Both,
    min_coverage: 2
  });

  // Event handlers
  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as SVGElement;
    const country = target.getAttribute('data-name');
    previous_fill = target.style.fill;
    target.style.fill = 'var(--primary)';
    setHoveredCountry(country);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const target = e.target as SVGElement;
    target.style.fill = previous_fill;
    previous_fill = '';
    setHoveredCountry(null);
  };

  // Function to determine if a country should be displayed
  const shouldDisplayCountry = (country: Country) => {

    if (country.coverage < filters().min_coverage) {
      return false;
    }

    if (filters().drives_left === DrivingSide.Left && country.drives_left === false) {
      return false;
    }

    if (filters().drives_left === DrivingSide.Right && country.drives_left === true) {
      return false;
    }

    return true;
  };

  // Render the component
  return (
    <div class={styles.WorldMap}>
      <svg class={styles.WorldMapImage} baseProfile="tiny" height="665.96301" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width=".2" version="1.2" viewBox="0 0 1009.6727 665.96301" width="1009.6727" xmlns="http://www.w3.org/2000/svg">
        {countries.map((country) => (
          <path 
          data-title={country.title}
          id={country.id}
          d={country.d} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          style={{fill: shouldDisplayCountry(country) ? 'inherit' : 'rgba(0, 0, 0, 0.4)'}}
          >
          </path>
        ))}
        <circle cx="997.9" cy="189.1" id="0">
        </circle>
        <circle cx="673.5" cy="724.1" id="1">
        </circle>
        <circle cx="1798.2" cy="719.3" id="2">
        </circle>
        <rect id="nordic" x="1000" y="50" width="200" height="100" fill="rgba(255,255,255,0)"/>
      </svg>
    </div>
  );
};

export default WorldMap;