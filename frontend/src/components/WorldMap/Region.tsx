import { Component, For } from "solid-js";
import { RegionData } from "./Countries";

interface RegionProps {
    region: RegionData;
    parent: string;
}

const Region: Component<RegionProps> = (props) => {
    return (
        <g 
            id={props.region.name} 
            style={{"fill-opacity": "inherit"}}
            data-bbox={props.region.bbox}
            data-type={props.region.type}
        >
            <For each={props.region.countries}>
                {(country) => (
                    <path 
                        id={country.id} 
                        d={country.path} 
                        data-bbox={country.bbox} 
                        data-type={country.type}
                    />
                )}
            </For>
        </g>
    );
};

export default Region;