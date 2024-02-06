import json

# Read the countries with good coverage from the file
with open('good_coverage.txt', 'r') as file:
    good_coverage_countries = file.read().splitlines()

# Load the countries data from the JSON file
with open('countries.json', 'r') as file:
    countries_data = json.load(file)

# Update the coverage value for each country
for country in countries_data:
    if country['title'] in good_coverage_countries:
        country['coverage'] = 2
    elif country['coverage'] == True:
        country['coverage'] = 1
    else:
        country['coverage'] = 0

# Save the updated data back to the JSON file
with open('countries.json', 'w') as file:
    json.dump(countries_data, file, indent=4)