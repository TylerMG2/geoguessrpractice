import json

# Read country names from in_geo.txt
with open('in_geo.txt', 'r') as file:
    country_names = [line.strip() for line in file]

# Load countries.json
with open('countries.json', 'r') as file:
    countries = json.load(file)

# Update countries with coverage value
for country in countries:
    if country['title'] in country_names:
        country['coverage'] = True
    else:
        country['coverage'] = False

# Save the updated data back to countries.json
with open('countries.json', 'w') as file:
    json.dump(countries, file, indent=4)