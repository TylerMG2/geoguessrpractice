import json

# Load the continents_regions.json file
with open('continents_regions.json') as continents_file:
    continents_data = json.load(continents_file)

# Load the countries.json file
with open('countries.json') as countries_file:
    countries_data = json.load(countries_file)

# Create a dictionary to store the mapping of alpha 2 values to regions and continents
alpha2_mapping = {}

# Iterate over the continents_data and populate the alpha2_mapping dictionary
for item in continents_data:
    alpha2_mapping[item['alpha-2']] = {
        'region': item['sub-region'],
        'continent': item['region']
    }

# Iterate over the countries_data and assign the appropriate region and continent
for country in countries_data:
    alpha2 = country['id']
    if alpha2 in alpha2_mapping:
        country['region'] = alpha2_mapping[alpha2]['region']
        country['continent'] = alpha2_mapping[alpha2]['continent']
    else:
        country['region'] = ''
        country['continent'] = None

# Save the updated countries_data to a new file
with open('countries_with_regions.json', 'w') as updated_file:
    json.dump(countries_data, updated_file, indent=4)