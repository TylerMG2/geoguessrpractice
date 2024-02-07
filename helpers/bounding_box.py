import json
from svgpathtools import parse_path

def get_bounding_box(svg_path_d):
    path = parse_path(svg_path_d)
    min_x, max_x, min_y, max_y = path.bbox()

    # Return the bounding box values
    return min_x, min_y, max_x-min_x, max_y-min_y

# Load the SVG data
with open('countries_with_regions.json') as f:
    countries_json = json.load(f)

for country in countries_json:
    bbox = get_bounding_box(country['d'])
    country['bbox'] = f"{bbox[0]} {bbox[1]} {bbox[2]} {bbox[3]}"

# Save the modified JSON data back to a file
with open('countries_with_bbox.json', 'w') as f:
    json.dump(countries_json, f, indent=4)
