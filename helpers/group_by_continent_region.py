import json

# Load the original JSON data
with open('countries_with_bbox.json') as file:
    data = json.load(file)

# Create a dictionary to store the grouped data
grouped_data = {}
final_data = []

# Group countries by region and continent
for country in data:
    region = country['region']
    continent = country['continent']
    country.pop('region')
    country.pop('continent')

    if continent not in grouped_data:
        grouped_data[continent] = {}

    if region not in grouped_data[continent]:
        grouped_data[continent][region] = []

    grouped_data[continent][region].append(country)

# Calculate the bounding boxes for each region and continent
for continent, regions in grouped_data.items():
    new_regions = []
    for region, countries in regions.items():
        xmin = min(float(country['bbox'].split()[0]) for country in countries)
        ymin = min(float(country['bbox'].split()[1]) for country in countries)
        xmax = max(float(country['bbox'].split()[0]) + float(country['bbox'].split()[2]) for country in countries)
        ymax = max(float(country['bbox'].split()[1]) + float(country['bbox'].split()[3]) for country in countries)

        region_bbox = f"{xmin} {ymin} {xmax - xmin} {ymax - ymin}"
        new_regions.append({'title': region, 'countries': countries, 'bbox': region_bbox})

    xmin = min(float(region['bbox'].split()[0]) for region in new_regions)
    ymin = min(float(region['bbox'].split()[1]) for region in new_regions)
    xmax = max(float(region['bbox'].split()[0]) + float(region['bbox'].split()[2]) for region in new_regions)
    ymax = max(float(region['bbox'].split()[1]) + float(region['bbox'].split()[3]) for region in new_regions)

    continent_bbox = f"{xmin} {ymin} {xmax - xmin} {ymax - ymin}"
    final_data.append({'title': continent, 'regions': new_regions, 'bbox': continent_bbox})

# Save the updated JSON data
with open('grouped_countries_with_bbox.json', 'w') as file:
    json.dump(final_data, file, indent=4)