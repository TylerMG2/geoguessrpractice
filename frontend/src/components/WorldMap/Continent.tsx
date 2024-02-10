import { Component } from "solid-js";
import { ContinentData } from "./Countries";
import Region from "./Region";

interface ContinentProps {
    continent: ContinentData;
    parent: string;
}

const Continent: Component<ContinentProps> = (props) => {
    return (
        <g 
            id={props.continent.name} 
            style={{"fill-opacity": "0.5"}}
            data-bbox={props.continent.bbox}
            data-type={props.continent.type}
        >
            {props.continent.regions.map((region, index) => (
                <Region parent={props.continent.id} region={region} />
            ))}
        </g>
    );
};

export default Continent;