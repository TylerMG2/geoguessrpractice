import json
import xml.etree.ElementTree as ET

def convert_svg_to_json(svg_file, json_file):
    # Load the SVG file
    tree = ET.parse(svg_file)
    root = tree.getroot()

    # Convert SVG elements to JSON
    json_data = []
    for element in root.findall(".//{http://www.w3.org/2000/svg}path"):
        json_data.append({
            "id": element.get("id"),
            "d": element.get("d"),
            "title": element.get("title")
        })

    # Save JSON data to file
    with open(json_file, "w") as file:
        # Format JSON data
        json.dump(json_data, file, indent=4)

# Usage example
convert_svg_to_json("world.svg", "countries.json")