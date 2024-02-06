import json

# Step 1: Read the contents of drivers_left.txt
with open('drivers_left.txt', 'r') as file:
    drivers_left = [line.strip() for line in file]

# Step 2: Read and parse the contents of countries.json
with open('countries.json', 'r') as file:
    countries = json.load(file)

# Step 3: Iterate over each country in the dictionary
for country in countries:
    # Step 4: Check if the title of the country exists in drivers_left
    if country['title'] in drivers_left:
        # Step 5: Set drives_left to True
        country['drives_left'] = True
    else:
        # Step 5: Set drives_left to False
        country['drives_left'] = False

# Step 6: Write the updated dictionary back to countries.json
with open('countries.json', 'w') as file:
    json.dump(countries, file, indent=4)