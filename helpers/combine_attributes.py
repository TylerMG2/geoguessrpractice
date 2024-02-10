import pandas as pd
import os
import json

# Open the base dataframe
basic_info_df = pd.read_csv('./attributes/country_info.csv')

# For each file in the attributes directory, load the data and merge it with the base dataframe
for file in os.listdir('./attributes'):

    # If it's a csv file and not the base dataframe
    if file.endswith('.csv') and file != 'country_info.csv':

        # Load the data
        data_df = pd.read_csv(f'./attributes/{file}')

        # Check if the file has the iso_alpha2 column
        if 'iso_alpha2' not in data_df.columns:
            print(f"File {file} does not have the iso_alpha2 column")
            continue

        # Check if the file is missing some iso_alpha2 values from the base dataframe
        missing_iso_alpha2 = data_df[~data_df['iso_alpha2'].isin(basic_info_df['iso_alpha2'])]
        if not missing_iso_alpha2.empty:
            print(f"File {file} is missing the following iso_alpha2 values from the base dataframe:\n", missing_iso_alpha2)

        # Merge the data with the base dataframe
        basic_info_df = pd.merge(basic_info_df, data_df, on='iso_alpha2', how='left')

# Fix namibia's iso_alpha2 code
basic_info_df["iso_alpha2"] = basic_info_df["iso_alpha2"].fillna('NA')

# Move iso_alpha2 to the first column nad iso_alpha3 to the second column
cols = list(basic_info_df.columns)
cols = [cols[1]] + [cols[0]] + cols[2:]
basic_info_df = basic_info_df[cols]

# Check for any duplicated columns
duplicated_columns = basic_info_df.columns[basic_info_df.columns.duplicated()]
if not duplicated_columns.empty:
    print("The following columns are duplicated:\n", duplicated_columns)

# Load the SVG image and calculate the bounding box for each country
from svgpathtools import parse_path
import xml.etree.ElementTree as ET

# Load the SVG file
tree = ET.parse('world.svg')
root = tree.getroot()

# Convert SVG elements to JSON
bbox_data = []
for element in root.findall(".//{http://www.w3.org/2000/svg}path"):
    path = parse_path(element.get("d"))
    min_x, max_x, min_y, max_y = path.bbox()
    bbox_data.append({
        "iso_alpha2": element.get("id"),
        "path": element.get("d"),
        "bbox": [min_x, min_y, max_x-min_x, max_y-min_y]
    })

# Convert the dataframe to a json
json_data = basic_info_df.to_dict(orient='records')

# Merge the two jsons
for country in json_data:
    for svg_country in bbox_data:
        if country['iso_alpha2'] == svg_country['iso_alpha2']:
            country.update(svg_country)
            break
    if 'bbox' not in country:
        print(f"Country {country['iso_alpha2']} does not have a bounding box")

# Rename iso_alpha2 to id
for country in json_data:
    country['id'] = country.pop('iso_alpha2')

# Group countries by continent under each continent's region
grouped_data = {}
final_data = []

# Group countries by region and continent
for country in json_data:
    region = country['region']
    continent = country['continent']
    country.pop('region')
    country.pop('continent')
    country['type'] = 'country'

    if continent not in grouped_data:
        grouped_data[continent] = {}

    if region not in grouped_data[continent]:
        grouped_data[continent][region] = []

    grouped_data[continent][region].append(country)

# Calculate the bounding boxes for each region and continent
for continent, regions in grouped_data.items():
    new_regions = []
    for region, countries in regions.items():
        xmin = min(country['bbox'][0] for country in countries)
        ymin = min(country['bbox'][1] for country in countries)
        xmax = max(country['bbox'][0] + country['bbox'][2] for country in countries)
        ymax = max(country['bbox'][1] + country['bbox'][3] for country in countries)

        region_bbox = [xmin, ymin, xmax - xmin, ymax - ymin]
        new_regions.append({'name': region, 'bbox': region_bbox, 'type': 'region', 'id': region.lower().replace(' ', '_'), 'countries': countries})

    xmin = min(region['bbox'][0] for region in new_regions)
    ymin = min(region['bbox'][1] for region in new_regions)
    xmax = max(region['bbox'][0] + region['bbox'][2] for region in new_regions)
    ymax = max(region['bbox'][1] + region['bbox'][3] for region in new_regions)

    continent_bbox = [xmin, ymin, xmax - xmin, ymax - ymin]
    final_data.append({'name': continent, 'bbox': continent_bbox, 'type': 'continent', 'id': continent.lower().replace(' ', '_'), 'regions': new_regions})

# Convert all the bounding boxes to strings
for continent in final_data:
    continent['bbox'] = ' '.join(str(x) for x in continent['bbox'])
    for region in continent['regions']:
        region['bbox'] = ' '.join(str(x) for x in region['bbox'])
        for country in region['countries']:
            country['bbox'] = ' '.join(str(x) for x in country['bbox'])

# Save the updated JSON data
with open('countries_final.json', 'w') as file:
    json.dump(final_data, file, indent=4)

